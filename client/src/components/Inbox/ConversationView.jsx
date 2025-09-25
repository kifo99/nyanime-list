import { useEffect, useRef } from "react";
import useMessageStore from "../../features/message/useMessageStore";
import useAuthStore from "../../features/auth/useAuthStore";

export default function ConversationView() {
  const { messages } = useMessageStore();
  const { userId } = useAuthStore();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full min-h-0 w-full p-2 box-border">
      <div className="flex-1 min-h-0 flex flex-col gap-2 overflow-y-auto p-4 border-2 border-purple-400 rounded-2xl bg-purple-50">
        {messages
          .sort((a, b) => new Date(a.sentAt) - new Date(b.sentAt))
          .map((message) =>
            message.senderId !== userId ? (
              <div
                key={message._id}
                className="self-start bg-purple-300 rounded-xl px-4 py-2 max-w-[75%] shadow"
              >
                <p>{message.message}</p>
              </div>
            ) : (
              <div
                key={message._id}
                className="self-end bg-purple-200 rounded-xl px-4 py-2 max-w-[75%] shadow"
              >
                <p>{message.message}</p>
              </div>
            )
          )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
