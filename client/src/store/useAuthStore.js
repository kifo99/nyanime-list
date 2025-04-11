import { create } from "zustand";

const useAuthStore = create((set) => ({
  token: null,
  isAuth: false,
  userId: null,

  setToken: (token) => set(() => ({ token: token })),
  setIsAuth: (isAuth) => set(() => ({ isAuth: isAuth })),
  setUserId: (userId) => set(() => ({ userId: userId })),
}));

export default useAuthStore;
