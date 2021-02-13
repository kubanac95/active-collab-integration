import * as express from "express";

import clockify from "./clockify";

const router = express.Router();

router.post("/test/:id", (req, res) => {
  console.log(req.body, req.params);

  res.sendStatus(200);
});

router.use("/clockify/v1", clockify);

export default router;
