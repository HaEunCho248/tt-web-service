const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class chat {
  static async findChallenge({ room }) {
    console.log(room);
    console.log(typeof room);
    const challengeId = await prisma.challenge.findFirst({
      where: {
        title: room,
      },
      select: {
        challengeId: true,
      },
    });
    return challengeId;
  }
  static async storeChat({ chatData }) {
    const challengeId = chatData.challengeId;
    console.log("model!!!!!!", chatData);

    const data = await prisma.chat.create({
      data: {
        content: chatData.content,
        userId: chatData.userId,
        name: chatData.name,
        date: chatData.date,
        time: chatData.time,
        challenge: {
          connect: { challengeId: challengeId.challengeId },
          // connect: { challengeId: 92 },
        },
      },
    });
    console.log("model data", data);
  }

  static async getMessage({ challengeId }) {
    const getMessages = await prisma.chat.findMany({
      where: {
        challengeId: challengeId.challengeId,
      },
    });
    // console.log(
    //   "π¦π¦π¦model))-getMessage:μ±λμ μλ λͺ¨λ  λ©μΈμ§!!!!!1",
    //   getMessages
    // );
    console.log("λͺ¨λΈ μ¬κΈ°λ μλ² ν¬λλμ challengeId μλμ΄", challengeId);

    return getMessages;
  }

  static async getChallengeList({ userId }) {
    console.log("μ μ¬κΈ°λ‘ μ€μ§?", userId);
    const JoinChallengeList = await prisma.userToChallenge.findMany({
      where: {
        userId: userId,
      },
      select: {
        userToChallengeId: true,
        challenge: true,
      },
    });
    return JoinChallengeList;
  }

  // static async createRoom() {
  //   await prisma.chat.create();
  // }
}

export { chat };
