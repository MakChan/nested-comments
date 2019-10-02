import { Router } from "express";
import { requiresLogin } from "../utils";

const router = Router();

router.get("/", async (req, res) => {
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
    ],
    order: [["createdAt", "DESC"]]
  });

  return res.send(posts);
});

router.post("/", requiresLogin, async (req, res) => {
  const post = await req.context.models.Post.create({
    text: req.body.text,
    title: req.body.title,
    userId: req.context.me.id
  });

  return res.send(post);
});

router.put("/:postId", requiresLogin, async (req, res) => {
  const post = await req.context.models.Post.findByPk(req.params.postId);

  if (!post)
    return res.status(404).send({ message: "No post with this identifier." });

  if (post.userId !== req.context.me.id)
    return res.status(401).send({ message: "Not authorized." });

  try {
    await post.update({ text: req.body.text });
    return res.send(post);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.get("/:postId", async (req, res) => {
  const postId = Number(req.params.postId);

  if (!postId)
    return res.status(400).send({ message: "Invalid post identifier." });

  const post = await req.context.models.Post.findOne({
    where: { id: postId },
    include: [{ model: req.context.models.User }]
  });

  if (!post)
    return res.status(404).send({ message: "No post with this identifier." });

  const query = `
    WITH RECURSIVE cte (path, pathString, id, "userId", "authorName", "createdAt", "updatedAt", depth, text, "postId", "parentId") AS (
      SELECT ARRAY[C1.id], 
        C1.id::text,
        C1.id,
        "userId",
        users.name,
        C1."createdAt",
        C1."updatedAt",
        depth,
        text,
        "postId",
        "parentId"
      FROM comments C1
		  INNER JOIN users ON ("userId" = users.id)
      WHERE "parentId" IS NULL AND "postId" = ${postId}

      UNION ALL

      SELECT cte.path || comments.id,
        cte.pathString || comments.id,
        comments.id,
        "comments"."userId",
        users.name,
        "comments"."createdAt",
        "comments"."updatedAt",
        comments.depth,
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
