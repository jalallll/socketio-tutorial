import { Router, Request, Response } from "express";
import path from "path";

const router = Router();

// Serve the main HTML file
router.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../src/public/index.html"));
});

module.exports = router;
