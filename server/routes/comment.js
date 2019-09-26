import { Router } from "express";

const router = Router();

router.get("/:postId", async (req, res) => {
  const post = await req.context.models.Comment.findAll({
    where: { postId: req.params.postId }
  });
  return res.send(post);
});

router.get("/:postId/recursive", async (req, res) => {
  const query = `
    WITH RECURSIVE cte (path, id, userId, authorName, createdAt, text, postId, parentId) AS (
      SELECT ARRAY[C1.id], 
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

  req.context.sequelize
    .query(query)
    .then(([results, metadata]) => res.send(results))
    .catch(err => res.status(500).send(err));
});

export default router;
