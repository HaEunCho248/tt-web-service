import { JoinedChallenge } from "../models/joinedChallenge";

class joinedChallengeService {
  static async count({ id }) {
    const countJoinedChallenge = await JoinedChallenge.count({
      id,
    });
    return countJoinedChallenge;
  }
  static async addChallenge({ id, userId, countUploads, image, description }) {
    const createdChallenge = await JoinedChallenge.createC({
      id,
      userId,
      countUploads,
      image,
      description,
      //   challenges,
    });
    return createdChallenge;
  }
  // 인증한 챌린지의 정보 불러오기
  static async findChallenge(challengeId) {
    const challengeInfo = await JoinedChallenge.findUniqueC(challengeId);
    return challengeInfo;
  }

  static async findJoinedChallenges(challengeId) {
    const challengeInfo = await JoinedChallenge.findManyC(challengeId);
    return challengeInfo;
  }
  //user별 참가한 챌린지 포인트조회(마이페이지)
  static async getUserChallengePoint(userId){
    const getChallengePointInfoList=await JoinedChallenge.getChallengePointInfoList({userId});
     return getChallengePointInfoList;
 }
}

export { joinedChallengeService };
