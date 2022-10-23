import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import dotenv, { config } from "dotenv";
dotenv.config();

class userService {
  static async addUser({ email, password, confirmPassword, name }) {
    const user = await User.findByEmail({ email });

    if (user.length) {
      if (user) {
        if (user[0].withdrawal == 0) {
          const errorMessage = "이미 사용중인 email입니다.";
          return errorMessage;
        }
      }
    }
    if (password !== confirmPassword) {
      const errorMessage = "비밀번호가 일치하지 않습니다";
      return errorMessage;
    }

    const hashpassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();

    const newUser = { userId, email, password: hashpassword, name };
    const createNewUser = await User.createUser({ userId, newUser });
    createNewUser.errorMessage = null;

    await User.createToken({ userId });
    await User.createPoint({ userId });
    return createNewUser;
  }

  static async userLogin({ email, password }) {
    const data = await User.findByEmail({ email });
    const user = data[0];

    if (data.length) {
      if (data) {
        if (user.withdrawal == 1) {
          const errorMessage = "존재하지 않는 계정입니다.";
          return errorMessage;
        }
      }
    }

    const haspassword = user.password;
    const isCorrect = await bcrypt.compare(password, haspassword);
    if (!isCorrect) {
      const errorMessage = "비밀번호가 일치하지 않습니다.";
      return errorMessage;
    }

    const secretKey = process.env.JWT_SECRET_KEY;
    const accessToken = jwt.sign({ userId: user.userId }, secretKey, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign({ userId: user.userId }, secretKey, {
      expiresIn: "14d",
    });
    const userId = user.userId;
    await User.tokenUpdate({ userId, refreshToken });

    const name = user.name;
    const loginUser = {
      userId,
      email,
      name,
      accessToken,
      refreshToken,
      errorMessage: null,
    };
    return loginUser;
  }

  static async findCurrentUser({ userId }) {
    const userData = await User.findByUserId({ userId });

    return userData;
  }

  static async updatePW({ userId, password }) {
    const user = await User.findByUserId({ userId });
    if (!user) {
      const errorMessage =
        "비밀번호 변경 권한이 없습니다. 로그인 후 이용해주세요";
      return errorMessage;
    }
    if (password) {
      password = await bcrypt.hash(password, 10);
      const updatePW = await User.updatePW({ userId, password });
      return updatePW;
    }
  }

  static async updateUser(userId, name, email) {
    const user = await User.findByUserId({ userId });

    if (!user) {
      const errorMessage =
        "user정보 수정 권한이 없습니다. 로그인 후 이용해주세요";
      return errorMessage;
    }
    const updateUser = await User.updateUser(userId, name, email);
    return updateUser;
  }

  static async getCurrentImg({ userId }) {
    const newImg = await User.getUserImg({ userId });

    if (!newImg) {
      const errorMessage = "no iamge";
      return errorMessage;
    }
    ("");
    return newImg;
  }

  static async updateUserImg({ img, userId }) {
    const user = await User.findByUserId({ userId });

    if (!user) {
      const errorMessage =
        "프로필사진 수정 권한이 없습니다. 로그인 후 이용해주세요";
      return { errorMessage };
    }
    console.log("서비스");
    const updateimg = await User.EditImg({ userId, img });
    return updateimg;
  }

  static async removeUserImg({ userId }) {
    const user = await User.findByUserId({ userId });

    if (!user) {
      const errorMessage =
        "프로필사진 수정 권한이 없습니다. 로그인 후 이용해주세요";
      return { errorMessage };
    }
    const updateimg = await User.deleteUserImg({ userId });
    return updateimg;
  }

  static async userWithdrawal({ userId, id, withdrawal }) {
    if (userId !== id) {
      const errorMessage = "UserId가 틀립니다.";
      return errorMessage;
    }

    if (withdrawal == 1) {
      let user = await User.findByUserId({ userId });
      const newValue = withdrawal;
      user = await User.updateWithdrawal({ userId, newValue });
    }
  }
}
export { userService };
