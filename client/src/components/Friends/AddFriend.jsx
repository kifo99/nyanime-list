import { useState } from "react";
import { useDebounce } from "use-debounce";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { CirclePlus } from "lucide-react";

import useFriendshipStore from "../../features/friends/useFriendshipStore";
import useAuthStore from "../../features/auth/useAuthStore.js";
import { useUserByName } from "../../features/queries/friendship/useFriendshipQuery.jsx";

import InitialAvatar from "../Avatar/InitialAvatar";

export default function AddFriend() {
  const { isOpened } = useFriendshipStore();
  const { userId } = useAuthStore();
  const [searchName, setSearchName] = useState("");
  const [debouncedSearchName] = useDebounce(searchName, 500);

  const { data: user, isUserLoading } = useUserByName(debouncedSearchName, {
    enabled: !!debouncedSearchName,
  });
  async function handleAddFriend() {
    try {
      console.log(user);
      console.log(userId);

      if (!userId || !user) throw new Error("Something is wrong!");
      await axios.post(
        `http://localhost:8080/friend/user/${userId}/${user._id}/send-request`
      );
    } catch (error) {
      console.log(error);
    }
  }

  if (isUserLoading) {
    return <div>Still loading</div>;
  }

  return (
    <AnimatePresence>
      {isOpened && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70vw] bg-purple-300 p-6 rounded-2xl shadow-xl z-50"
        >
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search friend's name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Search results */}
          {user && (
            <div className="grid grid-cols-2 items-center bg-white p-6 rounded-lg min-h-[100px] gap-4">
              {/* Left half: Avatar + Name */}
              <div className="flex items-center gap-4">
                <InitialAvatar userId={user._id} />
                <h1 className="text-xl font-semibold text-purple-900">
                  {user.name}
                </h1>
              </div>

              {/* Right half: Accept + Decline Buttons */}
              <div className="flex justify-end gap-4">
                <button
                  className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                  onClick={handleAddFriend}
                >
                  Add <CirclePlus size={20} />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
