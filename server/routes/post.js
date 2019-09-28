import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  console.log("req.context.models.Post ==>", req.context.models.Post); // TODO: remove this
  const posts = await req.context.models.Post.findAll({
    attributes: {
      include: [
        [
          req.context.sequelize.fn(
            "COUNT",
            req.context.sequelize.col("comments.id")
          ),
          "commentCount"
        ]
      ]
    },
    group: ["post.id", "user.id"],
    include: [
      { model: req.context.models.User },
      {
        model: req.context.models.Comment,
        attributes: []
      }
    ]
  });

  return res.send(posts);
});

router.get("/:postId", async (req, res) => {
  const post = await req.context.models.Post.findOne({
    where: { id: req.params.postId },
    include: [{ model: req.context.models.User }]
  });

  const query = `
    WITH RECURSIVE cte (path, pathString, id, userId, authorName, createdAt, text, postId, parentId) AS (
      SELECT ARRAY[C1.id], 
        C1.id::text,
        C1.id,
        "userId",
        users.name,
        C1."createdAt",
        text,
        "postId",
        "parentId"
      FROM comments C1
		  INNER JOIN users ON ("userId" = users.id)
      WHERE "parentId" IS NULL AND "postId" = ${req.params.postId}

      UNION ALL

      SELECT cte.path || comments.id,
        cte.pathString || comments.id,
        comments.id,
        "comments"."userId",
        users.name,
        "comments"."createdAt",
        comments.text,
        "comments"."postId",
        "comments"."parentId"
      FROM comments
		  INNER JOIN users ON ("comments"."userId" = users.id)
      JOIN cte ON "comments"."parentId" = cte.id
    )
    SELECT * FROM cte
    ORDER BY path;    
  `;

  let comments;
  try {
    [comments] = await req.context.sequelize.query(query);
  } catch (e) {
    return res.status(500).send(e);
  }

  post.setDataValue("comments", comments);
  return res.send(post);
});

export default router;
