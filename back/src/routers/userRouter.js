import { Router } from "express";
const userRouter = Router();
import { userService } from "../services/userService";
import { loginRequired } from "../middlewares/loginRequired";
import is from "@sindresorhus/is";
import multer from "multer";
import assert from "assert";
import { config } from "dotenv";
import { addImage } from "../middlewares/addImage";

const upload = addImage("uploads");

userRouter.post("/register", async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "header의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const name = req.body.name;
    const newUser = await userService.addUser({
      email,
      password,
      confirmPassword,
      name,
    });

    if (newUser.errorMessage) {
      throw new Error(newUser, errorMessage);
    }

    res.status(201).send(newUser);
  } catch (error) {
    next(error);
  }
});

userRouter.post("/login", async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await userService.userLogin({ email, password });
    if (user.errorMessage) {
      throw new Error(user.errorMessage);
    }

    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

userRouter.get("/currentUser", loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;

    const currentUser = await userService.findCurrentUser({ userId });

    if (currentUser.errorMessage) {
      throw new Error(currentUser.errorMessage);
    }
    res.status(200).json(currentUser);
  } catch (error) {
    next(error);
  }
});

userRouter.put("/passwordUpdate", loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const password = req.body.password;

    const updatePW = await userService.updatePW({ userId, password });
    res.status(201).json(updatePW);
  } catch (error) {
    next(error);
  }
});

userRouter.put("/userUpdate", loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const { name, description } = req.body;
    const updatedUser = await userService.updateUser(userId, name, description);
    res.status(200).json({ updatedUser });
  } catch (error) {
    res.json({ message: error.message });
  }
});

userRouter.put(
  "/withdrawal/:id",
  loginRequired,
  async function (req, res, next) {
    try {
      const withdrawal = req.body.withdrawal ?? null;
      const userId = req.currentUserId;
      const id = req.params.id;

      const idStatus = await userService.userWithdrawal({
        userId,
        id,
        withdrawal,
      });
      res.status(200).json(idStatus);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.get("/userImg", loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const getImg = await userService.getCurrentImg({ userId });
    res.status(200).send(getImg);
  } catch (error) {
    next(error);
  }
});

userRouter.put(
  "/userImg",
  loginRequired,
  upload.single("img"),
  async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      const img = req.file.path;

      if (img === undefined) {
        return res.status(400).send("이미지가 존재하지 않습니다.");
      }

      const EditImg = await userService.updateUserImg({
        userId,
        img,
      });
      res.status(200).json({ EditImg });
    } catch (error) {
      next(error);
    }
  }
);

userRouter.put("/userImg/delete", loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const deleteImg = await userService.removeUserImg({
      userId,
    });
    if (deleteImg.errorMessage) {
      throw new Error(deleteImg.errorMessage);
    }
    res.status(204).send("Image delete successfully!");
  } catch (error) {
    next(error);
  }
});

export { userRouter };
