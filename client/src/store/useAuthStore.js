import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      isAuth: false,
      userId: null,

      setToken: (token) => set(() => ({ token: token })),
      setIsAuth: (isAuth) => set(() => ({ isAuth: isAuth })),
      setUserId: (userId) => set(() => ({ userId: userId })),
      logout: () => set(() => ({ token: null, isAuth: false, userId: null })),
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
