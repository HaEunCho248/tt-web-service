import { Router } from "express";
import { joinedChallengeService } from "../services/joinedChallengeService";
import { loginRequired } from "../middlewares/loginRequired";
import { addImage } from "../middlewares/addImage";

const sharp = require("sharp");
const fs = require("fs");
const joinedChallengeRouter = Router();

const upload = addImage("uploads");

//1. 참가한 챌린지 사진 추가하기
joinedChallengeRouter.post(
  "/:id",
  loginRequired,
  upload.single("image"),
  async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      const image = req.file.path;
      sharp(image) // 압축할 이미지 경로
        .resize({ width: 600 }) // 비율을 유지하며 가로 크기 줄이기
        .withMetadata() // 이미지의 exif데이터 유지
        .toBuffer((err, buffer) => {
          if (err) throw err;
          // 압축된 파일 새로 저장(덮어씌우기)
          fs.writeFile(image, buffer, (err) => {
            if (err) throw err;
            console.log(image);
          });
        });

      if (image === undefined) {
        return res.status(400).send("이미지가 존재하지 않습니다.");
      }

      const { id } = req.params;
      const countUpload = await prisma.joinedChallenge.count({
        where: {
          chalngId: Number(id),
        },
      });
      const addedImage = `uploads/${image}`;
      const description = req.body.description;
      const addImage = await joinedChallengeService.addChallenge({
        id,
        userId,
        countUpload,
        addedImage,
        description,
        // challenges,
      });

      res.status(200).json({ addImage });
    } catch (error) {
      next(error);
    }
  }
);

// challenge 정보
joinedChallengeRouter.get("/info/:challengeId", async (req, res) => {
  try {
    const { challengeId } = req.params;

    // 인증한 사진 관련된 챌린지 정보
    const showChallenge = await prisma.challenge.findUnique({
      where: { challengeId: Number(challengeId) },
    });

    res.status(200).json({ showChallenge });
  } catch (error) {
    res.json({ message: error.message });
  }
});

// 인증 사진들 전체 보여주기
joinedChallengeRouter.get("/:challengeId", async (req, res) => {
  try {
    const { challengeId } = req.params;

    // 해당 챌린지의 인증 정보 전부가져오는 코드
    const showCompletedChallenge = await prisma.joinedChallenge.findMany({
      where: { chalngId: Number(challengeId) },
    });

    res.status(200).json({ showCompletedChallenge });
  } catch (error) {
    res.json({ message: error.message });
  }
});

//user별 참가한 챌린지별 포인트 조회(마이페이지)
joinedChallengeRouter.get(
  "/mypage/userToChallengePoint",
  loginRequired,
  async function (req, res, next) {
    try {
      const userId = req.currentUserId;
      const userJoinChallengeList =
        await joinedChallengeService.getUserChallengePoint({ userId });
      res.status(200).send(userJoinChallengeList);
    } catch (error) {
      next(error);
    }
  }
);

export { joinedChallengeRouter };
