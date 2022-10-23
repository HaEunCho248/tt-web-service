import { Liked } from "../models/Liked";
import { v4 as uuidv4 } from "uuid";

class likedService {
  static async createLiked({ userId, challengeId }) {
    const likedId = uuidv4();

    const filter = await Liked.filterLiked({ userId, challengeId });

    if (filter[0] !== undefined) {
      const likedId = filter[0].likedId;
      const deleteLiked = await Liked.removeLiked({ likedId });
      return deleteLiked;
    }

    const addLiked = await Liked.createLiked({ likedId, userId, challengeId });
    return addLiked;
  }

  static async deleteLiked({ likedId }) {
    await Liked.removeLiked({ likedId });
  }

  static async getLiked({ userId }) {
    const getLiked = await Liked.getLikedList({ userId });
    return getLiked;
  }

  static async getLikedCount({ challengeId }) {
    const getLiked = await Liked.getLikedCount({ challengeId });
    return getLiked;
  }
}

export { likedService };
