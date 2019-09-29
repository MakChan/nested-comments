import { Router } from "express";
import { requiresLogin } from "./auth";

const router = Router();

router.get("/:postId/all", async (req, res) => {
  const post = await req.context.models.Comment.findAll({
    where: { postId: req.params.postId }
  });
  return res.send(post);
});

router.post("/:postId", requiresLogin, async (req, res) => {
  const parentComment = req.body.parentComment;

  const comment = await req.context.models.Comment.create({
    text: req.body.text,
    depth: parentComment ? parentComment.depth + 1 : 0,
    userId: req.context.me.id,
    postId: req.params.postId,
    parentId: parentComment ? parentComment.id : null
  });

  if (parentComment)
    comment.setDataValue("path", [...parentComment.path, comment.id]);
  else comment.setDataValue("path", [comment.id]);

  return res.send(comment);
});

router.put("/:commentId", requiresLogin, async (req, res) => {
  const comment = await req.context.models.Comment.findByPk(
    req.params.commentId
  );

  if (!comment)
    return res
      .status(404)
      .send({ message: "No comment with this identifier." });

  if (comment.userId !== req.context.me.id)
    return res.status(401).send({ message: "Not authorized." });

  console.log("comment ==>", comment); // TODO: remove this
    console.log('req.body.text ==>', req.body.text); // TODO: remove this
  try {
    await comment.update({ text: req.body.text });
    return res.send(comment);
  } catch (e) {
    return res.status(500).send(e);
  }
});

export default router;
