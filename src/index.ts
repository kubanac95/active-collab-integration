import * as dotenv from "dotenv";

dotenv.config();

import cors from "cors";
import express from "express";

import bodyParser from "body-parser";

import webhooks from "./routes/webhooks";
import Client from "./lib/activecollab";

const app = express();

app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 9000;

app.use("/webhooks", webhooks);
app.get("/test", async (req, res, next) => {
  const client = new Client();

  try {
    await client.login(
      process.env.AC_USER_EMAIL as string,
      process.env.AC_USER_PASSWORD as string
    );

    const account = client.accounts[0];

    await account.issueToken().catch((e) => console.log(e));

    const user = await account.user();

    const user_projects = await user.projects();

    return res.send(user_projects);
  } catch (error) {
    next(error);

    return;
  }
});

app.listen(port, () => {
  console.log(`🚀 Server ready at http://localhost:${port}`);
});
