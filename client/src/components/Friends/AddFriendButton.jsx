import { CirclePlus } from "lucide-react";

import useFriendshipStore from "../../features/friends/useFriendshipStore";

export default function AddFriendButton() {
  const { setIsOpened } = useFriendshipStore();
  return (
    <CirclePlus onClick={() => {setIsOpened(true)}} size={45} className="stroke-blue-700 hover:stroke-blue-500" />
  );
}
