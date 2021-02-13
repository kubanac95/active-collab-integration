import * as axios from "axios";
import * as express from "express";
import * as bodyParser from "body-parser";

import { projects } from "./secret";

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

  next();
};

router.use(authenticate);

router.post("/", (req, res, next) => {
  const { headers, body } = req;

  const event = req.headers["clockify-webhook-event-type"] as EventType;

  console.log(body);

  switch (event) {
    case "NEW_TASK": {
      break;
    }

    case "NEW_TIME_ENTRY": {
      break;
    }

    case "TIME_ENTRY_UPDATED": {
      // data.id
      break;
    }

    case "TIME_ENTRY_DELETED": {
      // data.id
      break;
    }

    default: {
      break;
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
