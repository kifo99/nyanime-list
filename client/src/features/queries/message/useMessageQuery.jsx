/* eslint-disable no-unused-vars */
import { useQuery, useQueries } from "react-query";
import axios from "axios";
import { protocol, host } from "../../../config/env";
const fetchChats = async ({ queryKey }) => {
  const [_, userId] = queryKey;

  const { data } = await axios.get(
    `${protocol}:${host}/chat/user/${userId}/chat-rooms`
  );

  return data.chatRooms;
};

const fetchChat = async ({ queryKey }) => {
  const [_, chatId] = queryKey;

  const { data } = await axios.get(
    `${protocol}:${host}/chat/chatRoom/${chatId}/chat-room`
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

export const useChat = (chatId) =>
  useQuery({
    queryKey: ["chatRoom", chatId],
    queryFn: fetchChat,
    cacheTime: 1000 * 60 * 10,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    enabled: !!chatId,
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
