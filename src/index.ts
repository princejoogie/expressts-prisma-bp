/* eslint-disable no-console */
import express from "express";
import cors from "cors";

const PORT = process.env.PORT || 3000;

const main = async () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get("/", (_, res) => {
    res.json({ success: true, message: "Hello World!" });
  });

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
};

main().catch(console.error);
