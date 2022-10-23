import { UserToChallenge } from "../models/UserToChallengeModel.js";
import { v4 as uuidv4 } from "uuid";

class userToChallengeService{
    //유저가 챌린지 참여
    static async createJoinedUser({userId,challengeId}){
        const userJoinList=await UserToChallenge.getJoinChallengeList({userId});
        if(userJoinList){
            for(var i=0;i<userJoinList.length;i++){
                if(userJoinList[i].challenge.challengeId==challengeId){
                    const errorMessage = "이미 참가중인 챌린지입니다.";
                    return errorMessage;
                }
            }
        }
        const addJoin = await UserToChallenge.addJoinUser({userId, challengeId });
        return addJoin;
    }

    //참가인원수
    static async countJoinUser({challengeId}){

        const JoinUserList=await UserToChallenge.getJoinUserLIst({challengeId});
        const countJoinUser=JoinUserList.length;
        return countJoinUser;
    }

    //user별 참가한 챌린지 조회(마이페이지)
    static async getUserChallengeInfo({userId}){
        const getJoinCallenge=await UserToChallenge.getJoinChallengeList({userId});
        return getJoinCallenge;
    }
    
    //참가취소
    static async JoinDelete({userId,challengeId}){
        const userJoinList=await UserToChallenge.getJoinChallengeList({userId});
        if(userJoinList){
            for(var i=0;i<userJoinList.length;i++){
                if(userJoinList[i].challenge.challengeId==challengeId){
                    const id=userJoinList[i].userToChallengeId
                    const JoinDelte = await UserToChallenge.deleteJoinUser({id});
                    return JoinDelte;
                }
            }
            const errorMessage = "이미 참가중인 챌린지입니다.";
            return errorMessage;
        }
        
    }
}
export {userToChallengeService}