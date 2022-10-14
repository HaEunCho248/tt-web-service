import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { likedService } from "../services/likedService";
const likedRouter = Router();

//유저가 챌린지의 좋아요 버튼 누름
likedRouter.post("/liked", loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const challengeId = 4;
    const liked = await likedService.createLiked({ userId, challengeId });
    res.status(201).send(liked);
  } catch (error) {
    next(error);
  }
});

// 유저가 챌린지 좋아요 해제함
likedRouter.delete("/liked/:likedId", loginRequired, async (req, res, next) => {
  try {
    const likedId = req.params.likedId;
    const delLiked = await likedService.deleteLiked({ likedId });
    res.status(204).send("✨");
  } catch (error) {
    next(error);
  }
});

//마이페이지에서 좋아요 한 챌린지 쭈르륵 보기
likedRouter.get("/liked", loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const likedList = await likedService.getLiked({ userId });
    res.status(200).send(likedList);
  } catch (error) {
    next(error);
  }
});

export { likedRouter };