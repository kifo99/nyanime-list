import { motion, AnimatePresence } from "framer-motion";
import useMessageStore from "../../features/message/useMessageStore";

export default function ChatPopup() {
  const { chatIsOpen } = useMessageStore();

  return (
    <AnimatePresence>
      {chatIsOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70vw] bg-purple-300 p-6 rounded-2xl shadow-xl z-50"
        >
          <div className="grid grid-cols-2 gap-2">
            <div>
              {/*For now title is messages but down the line it can be Message Suggestions and the list of friends it can message*/}
              <div>
                <h1>Messages</h1>
              </div>
              <div>
                <ul>
                  <li>{/*List of messaged people/ chatRoom*/}</li>
                </ul>
              </div>
            </div>
            <div>
              <div>
                Test
                {/*Here will be message display of a certain chatRoom */}
              </div>
              <div>{/*Here will be input for messages and send button */}</div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
