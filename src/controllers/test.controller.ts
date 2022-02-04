import { Request, Response, Router } from "express";
import { TestService } from "../services";

const router = Router();
const testService = new TestService();

router.get("/:id", async (req: Request, res: Response) => {
    let id = Number.parseInt(req.params.id);
    if (!isNaN(id)) {
        const tests = await testService.getTestForPost(id);
        res.json({data: tests});
    } else {
        res.send("Nothing");
    }
});

export default router;
