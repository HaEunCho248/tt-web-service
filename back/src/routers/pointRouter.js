import { loginRequired } from "../middlewares/loginRequired";
import { Router } from "express";
const pointRouter = Router();
import { pointService } from "../services/pointService";

// 등록된 point 수정하기(더하기)
pointRouter.put("/addpoint", loginRequired, async function (req, res, next) {
  try {
    const userId = req.currentUserId;
    //const userId=req.params.userId;
    const currentPoint = await pointService.getPointInfo({ userId });
    const point = currentPoint.point;

    //일단 성공시 +10포인트로 디폴트
    const updatepoint = point + 10;

    //해당 사용자 아이디로 Point 정보를 db에서 찾아 업데이트함.
    const updatedPoint = await pointService.setPoint({
      userId,
      updatepoint,
    });

    if (updatedPoint.errorMessage) {
      throw new Error(updatedPoint.errorMessage);
    }
    const addedPoint = updatedPoint.point;
    res.status(200).json(addedPoint.toString());
  } catch (error) {
    next(error);
  }
});
// 등록된 point 수정하기(빼기)
pointRouter.put("/minuspoint", loginRequired, async function (req, res, next) {
  try {
    const userId = req.currentUserId;
    //const userId=req.params.userId;
    const currentPoint = await pointService.getPointInfo({ userId });
    const point = currentPoint.point;

    //일단 참여시 -50포인트로 디폴트
    const updatepoint = point - 50;
    //해당 사용자 아이디로 Point 정보를 db에서 찾아 업데이트함.
    const updatedPoint = await pointService.setPoint({
      userId,
      updatepoint,
    });

    if (updatedPoint.errorMessage) {
      throw new Error(updatedPoint.errorMessage);
    }
    const addedPoint = updatedPoint.point;
    res.status(200).json(addedPoint.toString());
  } catch (error) {
    next(error);
  }
});

//point 조회하기
pointRouter.get("/point", loginRequired, async function (req, res, next) {
  try {
    const userId = req.currentUserId;
    //const userId = req.params.userid;
    const currentPoint = await pointService.getPointInfo({ userId });
    const point = currentPoint.point;
    res.status(200).send(point.toString());
  } catch (error) {
    next(error);
  }
});

//전체 포인트 리스트 조회
pointRouter.get("/bestPoint", async function (req, res, next) {
  try{
    const pointList=await pointService.getPoitList();
    res.status(200).send(pointList);
  }catch(error){
    next(error);
  }

})

export { pointRouter };
