const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Point {
  static async findByUserId({ userId }) {
    const points = await prisma.point.findUnique({
      where: {
        userId: userId,
      },
    });
    return points;
  }

  static async update({ userId, updatepoint }) {
    const updatePoint = await prisma.point.update({
      where: {
        userId: userId,
      },
      data: {
        point: updatepoint,
      },
    });
    return updatePoint;
  }
  static async getPoitList(){
    const pointList=await prisma.point.findMany({
      orderBy: {
        point: "desc",
      },
    });
    return pointList;
  }
}

export { Point };
