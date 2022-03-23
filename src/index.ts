/* eslint-disable no-console */
import cors from "cors";
import express from "express";
import morgan from "morgan";

import routes from "./routes";
import errorHandler from "./middlewares/errorHandler";

const PORT = process.env.PORT || 3000;

const main = async () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.static("public"));
  app.use(morgan("combined"));

  app.use(routes);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.clear();
    console.log(`Server listening on http://localhost:${PORT}`);
  });
};

main().catch(console.error);
