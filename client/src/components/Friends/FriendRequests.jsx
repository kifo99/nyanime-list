import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { CirclePlus, CircleX } from "lucide-react";
import { protocol, host } from "../../config/env.js";
import useFriendshipStore from "../../features/friends/useFriendshipStore";
import useAuthStore from "../../features/auth/useAuthStore.js";

import { useRequests } from "../../features/queries/friendship/useFriendshipQuery.jsx";
import { useUsers } from "../../features/queries/user/useUserQueries.jsx";

import InitialAvatar from "../Avatar/InitialAvatar";
import LoadingSpinner from "../Loader/LoadingSpinner.jsx";

export default function FriendRequests() {
  const { requestListIsOpened } = useFriendshipStore();
  const { userId } = useAuthStore();

  const { data: requests, isLoadingRequests } = useRequests(userId, {
    enabled: !!userId,
  });

  async function handleFriendRequest(status, requesterId) {
    try {
      await axios.post(
        `${protocol}:${host}/friend/user/${userId}/${requesterId}/${status}/accept-decline-request`
      );
    } catch (error) {
      console.log(error);
    }
  }
  const userIds = requests?.map((req) => req.requester);
  const userQueries = useUsers(userIds);

  if (isLoadingRequests) {
    return <div>Loading requests</div>;
  }

  return (
    <AnimatePresence>
      {requestListIsOpened && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70vw] bg-purple-300 p-6 rounded-2xl shadow-xl z-50"
        >
          <div className="mb-4">
            <h1>Friend Requests</h1>
          </div>
          {!requests || requests.length === 0 ? (
            <LoadingSpinner message={"No friend requests!"} />
          ) : (
            requests.map((request, index) => {
              const user = userQueries[index]?.data;

              return (
                <div
                  key={request._id}
                  className="grid grid-cols-2 items-center bg-white p-6 rounded-lg min-h-[100px] gap-4"
                >
                  <div className="flex items-center gap-4">
                    <InitialAvatar userId={user._id} />
                    <h1 className="text-xl font-semibold text-purple-900">
                      {user.name}
                    </h1>
                  </div>

                  <div className="flex justify-end gap-4">
                    <button
                      className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                      onClick={() => handleFriendRequest(true, user._id)}
                    >
                      Accept <CirclePlus size={20} />
                    </button>

                    <button
                      className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                      onClick={() => handleFriendRequest(false, user._id)}
                    >
                      Decline <CircleX size={20} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
