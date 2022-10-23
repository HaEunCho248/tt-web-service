const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class UserToChallenge{
    static async addJoinUser({userId, challengeId}){
        const UserToChallenge=await prisma.userToChallenge.create({
            data:{
                user:{
                    connect:{userId:userId},
                },
                challenge:{
                    connect:{challengeId: challengeId},
                }
            }
        })
        return UserToChallenge;
    }
    static async deleteJoinUser({id}){
        const UserToChallenge=await prisma.userToChallenge.delete({
            where:{
                userToChallengeId:id,
            },
            
        })
        return UserToChallenge;
    }
    static async getJoinUserLIst({challengeId}){

        const JoinUserList=await prisma.userToChallenge.findMany({
            where:{
                challengeId:challengeId,
            },
            select:{
                user:true,
            }
        })
        return JoinUserList;
    }

    static async getJoinChallengeList({userId}){
        const JoinChallengeList=await prisma.userToChallenge.findMany({
            where:{
                userId:userId,
            },
            select:{
                userToChallengeId:true,
                challenge:true,
            }
        })
        return JoinChallengeList;
    }
    
}
export {UserToChallenge};