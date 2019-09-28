import { Router } from "express";

const router = Router();

router.get("/:postId/all", async (req, res) => {
  const post = await req.context.models.Comment.findAll({
    where: { postId: req.params.postId }
  });
  return res.send(post);
});

export default router;
