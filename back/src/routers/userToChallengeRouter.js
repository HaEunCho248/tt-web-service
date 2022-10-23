import {loginRequired} from "../middlewares/loginRequired";
import { Router } from "express";
const userToChallengeRouter = Router();
import { userToChallengeService } from "../services/userToChallengeService";

//유저가 챌린지 참여
userToChallengeRouter.post(
    "/userToChallenge",
    loginRequired,
    async (req, res, next) => {
        try {
          const userId = req.currentUserId;
          const challengeId = req.body.challengeId;
          const userJoinChallenge = await userToChallengeService.createJoinedUser({ userId, challengeId });
          res.status(201).send(userJoinChallenge);
        } catch (error) {
          next(error);
        }
      }
      );

//참가인원수
userToChallengeRouter.get(
    "/countJoinUser",
    async (req, res, next) => {
        try {
          const challengeId = req.body.challengeId;
          const countJoinUser = await userToChallengeService.countJoinUser({challengeId});
          res.status(201).send(countJoinUser.toString());
        } catch (error) {
          next(error);
        }
      }
      );

//user별 참가한 챌린지 조회(마이페이지)
userToChallengeRouter.get(
    "/userToChallenge",
    loginRequired,
    async function (req, res, next){
        try{
            const userId=req.currentUserId;
            const userJoinChallengeList=await userToChallengeService.getUserChallengeInfo({userId});
            res.status(200).send(userJoinChallengeList);
        }catch(error){
            next(error);
        }
    }
    );

  //참가취소
  userToChallengeRouter.put(
    "/JoinDelete",
    loginRequired,
    async function (req, res, next){
        try{
            const userId=req.currentUserId;
            const challengeId = req.body.challengeId;
            const UserToChallenge=await userToChallengeService.JoinDelete({userId,challengeId});
            res.status(200).send(UserToChallenge);
        }catch(error){
            next(error);
        }
    }
    );


export { userToChallengeRouter };