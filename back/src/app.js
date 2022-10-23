import cors from "cors";
import express from "express";
import { userRouter } from "./routers/userRouter";
import { pointRouter } from "./routers/pointRouter";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { challengeRouter } from "./routers/challengeRouter";
import { joinedChallengeRouter } from "./routers/joinedChallengeRouter";
import { userToChallengeRouter } from "./routers/userToChallengeRouter";
import { likedRouter } from "./routers/likedRouter";

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  console.log(req.body);
  res.send("data project root api");
});
app.use(userRouter);

app.use("/challenges", challengeRouter);
app.use("/joinedChallenge", joinedChallengeRouter);
app.use(userToChallengeRouter);
app.use(pointRouter);
app.use(likedRouter);
app.use(errorMiddleware);

export { app };
