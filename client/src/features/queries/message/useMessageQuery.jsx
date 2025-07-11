/* eslint-disable no-unused-vars */
import { useQuery, useQueries } from "react-query";
import axios from "axios";

const fetchChats = async ({ queryKey }) => {
  const [_, userId] = queryKey;

  const { data } = await axios.get(
    `http://localhost:8080/chat/user/${userId}/chat-rooms`
  );

  
  return data.chatRooms;
};

const fetchChat = async ({ queryKey }) => {
  const [_, chatId] = queryKey;

  const { data } = await axios.get(
    `http://localhost:8080/chat/chatRoom/${chatId}/chat-room`
  );

  return data.chatRoom;
};

export const useChatRoomList = (userId) =>
  useQuery({
    queryKey: ["chatRoomList", userId],
    queryFn: fetchChats,
    cacheTime: 1000 * 60 * 10,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    enabled: !!userId,
  });

export const useChatRoom = (chatIds = []) =>
  useQueries(
    chatIds.map((chatId) => ({
      queryKey: ["chatRoom", chatId],
      queryFn: fetchChat,
      cacheTime: 1000 * 60 * 10,
      staleTime: 1000 * 60 * 5,
      retry: 1,
      enabled: !!chatId,
    }))
  );
