import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import Database from "./DB/Database.js";
import transactionRoutes from "./Routers/Transactions.js";
import userRouter from "./Routers/userRouter.js";

const app = express();
const PORT = 4000;

Database();

// cors -> cross origin resource sharing -- This allows our server to respond with frontend requests
app.use(cors());

app.use(express.json());
app.use(bodyParser.urlencoded({ extends: false }));

app.use("/api/v1", transactionRoutes);
//app.use("/api/v1/", transactionRoutes);
app.use("/api/auth/", userRouter);

app.get("/", (req, res) => {
  res.send("FinManager Server is Working");
});
app.listen(PORT, () => {
  console.log(`Server Running at http://localhost:${PORT}`);
});

// mongodb://localhost:27017 127.0.0.1
