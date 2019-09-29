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

export default router;
