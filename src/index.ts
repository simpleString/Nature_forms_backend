import "dotenv/config";
import express from "express";
import cors from "cors";

import { testRouter, postRouter } from "./controllers";
import { PrismaClient } from "@prisma/client";

const app = express();

app.use(cors());

const port = 5000;

app.use("/tests", testRouter.default);
app.use("/posts", postRouter.default);

app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`);
});
