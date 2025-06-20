import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useFriendshipStore from "../../features/friends/useFriendshipStore";
import { useUserByName } from "../../features/queries/friendship/useFriendshipQuery.jsx";

export default function AddFriend() {
  const { isOpened } = useFriendshipStore();
  const [searchName, setSearchName] = useState("");

  const { data: user, isUserLoading } = useUserByName(searchName, {
    enabled: !!searchName,
  });

  if (isUserLoading) {
    return <div>User is still loading</div>;
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
          <div className="mb-4 text-center">
            <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition">
              Add Friend
            </button>
          </div>

          {/* Search results */}
          <div className="bg-white p-4 rounded-lg min-h-[100px]">
            {/* Example result slot */}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
