import * as axios from "axios";
import * as express from "express";
import * as bodyParser from "body-parser";

import { signatures, projects, workspaces } from "./secret";

const router = express.Router();

router.use(bodyParser.json());

const authenticate = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const requestSignature = req.headers["clockify-signature"];

  const requestEvent = req.headers["clockify-webhook-event-type"] as EventType;

  console.log(requestSignature, requestEvent);

  if (signatures[requestEvent] !== requestSignature) {
    res.sendStatus(401);

    return;
  }

  next();
};

router.use(authenticate);
router.post("/", (req, res, next) => {
  const data = req.body as Event;

  const event = req.headers["clockify-webhook-event-type"] as EventType;

  switch (event) {
    case EventType.NEW_TASK: {
      if (data.projectId !== "5f88a1dcdf6d623f4298bbe4") {
        // test
        break;
      }
    }
  }

  res.sendStatus(200);
});

export default router;

/**
 * Idea
 *
 *
 */
