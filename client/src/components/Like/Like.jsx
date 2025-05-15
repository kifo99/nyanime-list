import { Heart } from "lucide-react";
import axios from "axios";
import PropTypes from "prop-types";

import { useIsLiked } from "../../features/queries/activity/like/useLike";

export default function Like({ userId, animeId }) {
  const {
    data: isLiked,
    isLikedLoading,
    refetch,
  } = useIsLiked(userId, animeId, {
    enabled: !!userId && !!animeId,
  });
  
  async function handleLike() {
    if (!isLiked) {
      console.log("entered");

      await axios.post(
        `http://localhost:8080/activity/like/${userId}/${animeId}`
      );
    } else {
      await axios.delete(
        `http://localhost:8080/activity/unlike/${userId}/${animeId}`
      );
    }

    refetch();
  }

  if (isLikedLoading) {
    console.log("Still loading is liked");
  }
  return (
    <Heart
      size={32}
      stroke={isLiked ? "#e91e63" : "red"}
      fill={isLiked ? "#e91e63" : "none"}
      className={
        isLiked ? "hover:fill-none hover:stroke-red-600" : "hover:fill-red-600"
      }
      onClick={handleLike}
    />
  );
}

Like.propTypes = {
  userId: PropTypes.string,
  animeId: PropTypes.string,
};
