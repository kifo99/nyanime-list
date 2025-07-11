import { motion, AnimatePresence } from "framer-motion";
import useMessageStore from "../../features/message/useMessageStore";

import useAuthStore from "../../features/auth/useAuthStore";

import {
  useChatRoomList,
  useChatRoom,
} from "../../features/queries/message/useMessageQuery";
import { useUser } from "../../features/queries/user/useUserQueries";

export default function ChatPopup() {
  const { chatIsOpen } = useMessageStore();
  const { userId } = useAuthStore();
  const { data: chatRoomList, chatRoomListIsLoading } = useChatRoomList(
    userId,
    {
      enabled: !!userId,
    }
  );

  const chatIds = chatRoomList?.map((chatRoom) => chatRoom._id);
  const chatQueries = useChatRoom(chatIds);

  let chatFriend = [];

  console.log(chatFriend);

  const { data: friend, friendIsLoading } = useUser(chatFriend.at(0), {
    enabled: !!chatFriend.at(0),
  });

  console.log(friend);

  if (chatRoomListIsLoading) {
    return <div>Loading</div>;
  }

  return (
    <AnimatePresence>
      {chatIsOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-2xl shadow-2xl z-50 w-[70vw] max-w-[1000px] h-[80vh]"
        >
          <div className="h-full grid grid-cols-[3fr_7fr] gap-0">
            <div className="h-full flex flex-col border-2 border-purple-400 rounded-2xl p-4 bg-gray-50 overflow-hidden px-6">
              <h1 className="text-xl font-semibold mb-4 text-center text-purple-700">
                Messages
              </h1>
              <ul className="overflow-y-auto flex-1 space-y-2">
                {chatRoomList.map((item, i) => {
                  const chat = chatQueries[i]?.data;

                  if (chat.isGroup === false) {
                    return (
                      <li
                        key={item._id}
                        className="bg-purple-200 hover:bg-purple-400  transition rounded-xl p-2 shadow-sm border border-purple-400 text-purple-700 cursor-pointer"
                      >
                        {chat.name}
                      </li>
                    );
                  }

                  chatFriend = chat.members.filter(
                    (member) => member !== userId
                  );

                  if (friendIsLoading || friend) {
                    return (
                      <li
                        key={item._id}
                        className="bg-purple-200 hover:bg-purple-400  transition rounded-xl p-2 shadow-sm border border-purple-400 text-purple-700 cursor-pointer"
                      >
                        Nothing in chat
                      </li>
                    );
                  }

                  return (
                    <li
                      key={item._id}
                      className="bg-purple-200 hover:bg-purple-400  transition rounded-xl p-2 shadow-sm border border-purple-400 text-purple-700 cursor-pointer"
                    >
                      {friend.name}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="h-full grid grid-rows-[80%_20%] px-6">
              <div className="border-2 border-purple-400 rounded-2xl p-4 flex flex-col gap-2 overflow-y-auto bg-purple-50">
                <div className="self-start bg-purple-300 rounded-xl px-4 py-2 max-w-[75%] shadow">
                  <p>This is the friend message</p>
                </div>
                <div className="self-end bg-purple-200 rounded-xl px-4 py-2 max-w-[75%] shadow">
                  <p>This is your message</p>
                </div>
              </div>
              <div className="w-full pt-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="w-full border-2 border-purple-400 rounded-2xl bg-purple-50 p-3 focus:outline-none focus:ring-2 focus:ring-purple-300 text-purple-400 font-bold"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
