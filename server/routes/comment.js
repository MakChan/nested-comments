import { Router } from "express";

const router = Router();

router.get("/:postId", async (req, res) => {
  console.log("==>", req.params.postId); // TODO: remove this
  const post = await req.context.models.Comment.findAll({
    where: { postId: req.params.postId }
  });
  return res.send(post);
});

router.get("/:postId/recursive", async (req, res) => {
  console.log("recursive ==>", req.params.postId); // TODO: remove this

  const query = `
    WITH RECURSIVE cte (path, id, text, postId,  parentId, depth)  AS (
      SELECT  ARRAY[id], id,
          text,
          "postId",
          "parentId",
          
          1 AS depth
      FROM    comments
      WHERE   "parentId" IS NULL AND "postId" = ${req.params.postId}

      UNION ALL

      SELECT  cte.path || comments.id, comments.id,
          comments.text,
          "comments"."postId",
          "comments"."parentId",
          
          cte.depth + 1 AS depth
      FROM    comments
      JOIN cte ON "comments"."parentId" = cte.id
    )
    SELECT * FROM cte
    ORDER BY path;
  `;

  req.context.sequelize.query(query).then(([results, metadata]) => {
    console.log("results ==>", results); // TODO: remove this
    // let formattedComments = [];
    // results.forEach((comment, index) => {
    //   if (comment.depth === 1) formattedComments.push(comment);
    //   else  formattedComments[index] = recursive(comment);
    // });

    // function recursive(comment) {}

    return res.send(results);
  });
});

export default router;
