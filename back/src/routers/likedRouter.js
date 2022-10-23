import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { likedService } from "../services/likedService";
const likedRouter = Router();

//유저가 챌린지의 좋아요 버튼 누름
likedRouter.post("/liked", loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const challengeId = req.body.challengeId;
    console.log(challengeId);
    const liked = await likedService.createLiked({ userId, challengeId });
    res.status(201).send(liked);
  } catch (error) {
    next(error);
  }
});

// 유저가 챌린지 좋아요 해제함
likedRouter.delete("/liked", loginRequired, async (req, res, next) => {
  try {
    const likedId = req.params.likedId;
    const delLiked = await likedService.deleteLiked({ likedId });
    res.status(204).send("success delete");
  } catch (error) {
    next(error);
  }
});

//마이페이지에서 좋아요 한 챌린지 쭈르륵 보기
likedRouter.get("/liked", loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const likedList = await likedService.getLiked({ userId });
    console.log(likedList);
    res.status(200).send(likedList);
  } catch (error) {
    next(error);
  }
});
likedRouter.get(
  "/likedCount/:challengeId",
  loginRequired,
  async (req, res, next) => {
    try {
      const challengeId = req.params.challengeId;

      const liked = await likedService.getLikedCount({ challengeId });
      const count = liked;
      console.log(count.toString());

      res.status(200).send(count.toString());
    } catch (error) {
      next(error);
    }
  }
);

export { likedRouter };
