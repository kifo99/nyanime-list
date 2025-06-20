import { CirclePlus } from "lucide-react";

import useFriendshipStore from "../../features/friends/useFriendshipStore";

export default function AddFriendButton() {
  const { isOpened, setIsOpened } = useFriendshipStore();
  return (
    <div className="w-20 h-20 bg-blue-800 hover:bg-blue-600  rounded-full">
      <CirclePlus
        onClick={() => {
          setIsOpened(!isOpened);
        }}
        size={45}
        className="stroke-white  w-full h-full m-0 p-0"
      />
    </div>
  );
}
