import { challenge } from "../models/challenge";

class challengeService {
  // create/ post
  static async addChallenge({
    holdUserId,
    title,
    description,
    fromDate,
    toDate,
    mainImg,
    explainImg,
    method,
  }) {
    const newChallenge = {
      holdUserId,
      title,
      description,
      fromDate,
      toDate,
      mainImg,
      explainImg,
      method,
    };
    const createdChallenge = await challenge.create({
      newChallenge,
    });
    return createdChallenge;
  }

  // 전체 불러오기 (get)
  static async getChallenges() {
    const challenges = await challenge.findMany();
    return challenges;
  }

  // id 값을 게시물 1개 선택하기(params 값을 이용)
  static async findUniqueUser(id) {
    const findId = await challenge.findUniqueId(id);
    if (!findId) {
      const error = new Error("invalid id");
      throw error;
    }
    return findId;
  }
  // id 값을 게시물 1개 선택하기(params 값을 이용)
  static async findUniqueId(id) {
    const findId = await challenge.findUnique(id);
    if (!findId) {
      const error = new Error("invalid id");
      throw error;
    }
    return findId;
  }

  // Delete
  static async deleteOne(id) {
    const deleteChallenge = await challenge.delete(id);

    return deleteChallenge;
  }

  // 수정
  static async updateChallenge({
    id,
    title,
    description,
    method,
    fromDate,
    toDate,
    titleImg,
    explainImgs,
  }) {
    const updated = await challenge.update({
      id,
      title,
      description,
      method,
      fromDate,
      toDate,
      titleImg,
      explainImgs,
    });
    return updated;
  }

  static async addImage(id, addedImage) {
    const createdChallenge = await challenge.create({
      id,
      addedImage,
    });
    return createdChallenge;
  }
}

export { challengeService };
