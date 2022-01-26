import { Request, Response, Router } from "express";

import { PostService } from "../services";

const router = Router();
const postService = new PostService();

router.get("/:id", async (req: Request, res: Response) => {
    let id = Number.parseInt(req.params.id);
    if (!isNaN(id)) {
        const post = await postService.getPostById(id);
        res.json({ data: post });
    } else {
        res.send("hello world");
    }
});

router.get("", async (req: Request, res: Response) => {
    const posts = await postService.getAllPosts();
    res.json({ data: posts });
});

export default router;
