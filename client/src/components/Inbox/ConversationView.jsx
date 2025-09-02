
import useMessageStore from "../../features/message/useMessageStore";
import useAuthStore from "../../features/auth/useAuthStore";


export default function ConversationView() {
  const { messages } = useMessageStore();
  const { userId } = useAuthStore();

  return (
    <div className="h-full w-full m-2">
      {messages.length > 0 ? (
        <div className="border-2 border-purple-400 rounded-2xl p-4 flex flex-col gap-2 overflow-y-auto bg-purple-50">
          {messages
            .sort((a, b) => new Date(a.sentAt) - new Date(b.sentAt))
            .map((message) => {
              if (message.senderId !== userId)
                return (
                  <div
                    key={message._id}
                    className="self-start bg-purple-300 rounded-xl px-4 py-2 max-w-[75%] shadow"
                  >
                    <p>{message.message}</p>
                  </div>
                );
              else
                return (
                  <div
                    key={message._id}
                    className="self-end bg-purple-200 rounded-xl px-4 py-2 max-w-[75%] shadow"
                  >
                    <p>{message.message}</p>
                  </div>
                );
            })}
        </div>
      ) : (
        <div className="border-2 border-purple-400 rounded-2xl p-4 flex flex-col gap-2 overflow-y-auto bg-purple-50">
          <h1 className="m-auto font-bold text-2xl text-purple-400">
            No messages
          </h1>
        </div>
      )}
    </div>
  );
}
