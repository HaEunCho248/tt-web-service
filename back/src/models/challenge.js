const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class challenge {
  // create/ post
  static async create({ newChallenge }) {
    console.log(newChallenge.explainImg);
    const createdChallenge = await prisma.challenge.create({
      data: newChallenge,
    });
    return createdChallenge;
  }

  // 전체 불러오기 (get)
  static async findMany() {
    const challenges = await prisma.challenge.findMany();
    return challenges;
  }

  // (params 값) 게시물 1개 선택
  static async findUnique(id) {
    const challenge = await prisma.challenge.findUnique({
      where: {
        challengeId: Number(id),
      },
    });
    return challenge;
  }
  static async findMany() {
    const challenges = await prisma.challenge.findMany();
    return challenges;
  }

  // 수정
  static async update({
    id,
    title,
    description,
    method,
    fromDate,
    toDate,
    titleImg,
    explainImgs,
  }) {
    const renewChallenge = await prisma.challenge.update({
      where: {
        challengeId: Number(id),
      },
      data: {
        title: title,
        description: description,
        method: method,
        fromDate: fromDate,
        toDate: toDate,
        mainImg: titleImg,
        explainImg: explainImgs,
      },
    });

    return renewChallenge;
  }

  // (params 값) 게시물 1개 선택
  static async findUniqueId(id) {
    const challenge = await prisma.challenge.findUnique({
      where: {
        challengeId: Number(id),
      },
    });
    return challenge;
  }
  // Delete
  static async delete(id) {
    const challenge = await prisma.challenge.delete({
      where: {
        challengeId: Number(id),
      },
    });
    return challenge;
  }
}
export { challenge };
