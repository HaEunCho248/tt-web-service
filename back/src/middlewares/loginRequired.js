import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function loginRequired(req, res, next) {
  const accessToken = req.headers["authorization"]?.split(" ")[1] ?? "null";
  if (accessToken) {
    try {
      const secretKey = process.env.JWT_SECRET_KEY;
      const jwtDecoded = jwt.verify(accessToken, secretKey);
      const userId = jwtDecoded.userId;
      req.currentUserId = userId;
      next();
    } catch (error) {
      const refreshToken = req.body.refreshToken;

      if (refreshToken) {
        try {
          const secretKey = process.env.JWT_SECRET_KEY;
          const jwtDecoded = jwt.verify(refreshToken, secretKey);
          const userId = jwtDecoded.userId;

          const token = async () => {
            const token = await prisma.refreshToken.findUnique({
              where: {
                userId: userId,
              },
            });
            const refreshFromDb = token.refreshToken;

            if (refreshFromDb != refreshToken) {
              res
                .status(400)
                .send("refresh token의 전자서명이 일치하지 않습니다.");
            }
            const accessToken = jwt.sign({ userId }, secretKey, {
              expiresIn: "1h",
            });
            req.currentUserId = userId;

            res.status(201).send(accessToken);
          };
          const refreshFromDb = token();
        } catch (error) {
          res
            .status(400)
            .send("Refresh token does not exist, 로그인후 이용해주세요");
          return;
        }
      } else {
        console.log("access not ");
        res.status(400).send("access token이 유효하지 않습니다.");
      }
      return;
    }
  }
}

export { loginRequired };
