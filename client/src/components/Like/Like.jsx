import { Heart } from "lucide-react";
import axios from "axios";
async function handleLike() {
  await axios.post(
    `http://localhost:8080/activity/like/${userId}/${anime.animeId}`
  );
}
export default function Like() {
  return (
    <Heart
      size={32}
      stroke="red"
      className="hover:fill-red-600"
      onClick={handleLike}
    />
  );
}
