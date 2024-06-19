import express from "express";
import router from "./routes";
import { config } from "dotenv";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";

config();

const app = express();

app.use(express.json());

app.use(router);

app.use(globalErrorHandler);

app.listen(4000, () => {
  console.log("App is running on 4000");
});
