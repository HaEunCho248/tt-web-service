import { Point } from "../models/point.js";
import { User } from "../models/User.js";
class pointService {

  //포인트 정보 업데이트하기
  static async setPoint({ userId, updatepoint }) {
    // 해당 id 의 포인트가 db에 존재하는지 여부 확인
    let userpoint = await Point.findByUserId({ userId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!userpoint) {
      const errorMessage = "포인트 정보가 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 업데이트 대상이 null 이 아니라면 업데이트 진행
    if (updatepoint) {
      userpoint = await Point.update({userId,updatepoint});
    }
    return userpoint;
  }

  //포인트 정보 가져오기
  static async getPointInfo({ userId }) {
    const points = await Point.findByUserId({userId });
    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!points) {
      const errorMessage =
        "해당 사용자는 포인트가 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    return points;
  }

  //포인트 탑쓰리 조회
  static async getPoitList(){
    const pointLIst=await Point.getPoitList();
    const topPointUser=pointLIst[0];
    const userId=topPointUser.userId;
    const top=await User.findByUserId({userId});
    const topInfo={
      "name":top.name,
      "point":topPointUser.point
    }
    return topInfo;
  }

}

export { pointService };
