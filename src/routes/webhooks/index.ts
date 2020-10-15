import * as express from "express";

import clockify from "./clockify";

const router = express.Router();

router.use("/clockify/v1", clockify);

export default router;
