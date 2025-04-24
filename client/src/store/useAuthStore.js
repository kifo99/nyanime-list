import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      isAuth: false,
      userId: null,
      logoutTimer: null,

      setToken: (token) => set(() => ({ token: token })),
      setIsAuth: (isAuth) => set(() => ({ isAuth: isAuth })),
      setUserId: (userId) => set(() => ({ userId: userId })),

      setAuth: (token, userId, expiresInMs) => {
        const oldTimer = get().logoutTimer;
        if (oldTimer) clearTimeout(oldTimer);

        const expiryDate = new Date(new Date().getTime() + expiresInMs);
        localStorage.setItem("expiryDate", expiryDate.toISOString());

        const timer = setTimeout(() => {
          get().logout();
        }, expiresInMs);

        set({
          token,
          userId,
          isAuth: true,
          logoutTimer: timer,
        });
      },

      logout: () => {
        const oldTimer = get().logoutTimer;
        if (oldTimer) clearTimeout(oldTimer);
        set({
          token: null,
          userId: null,
          isAuth: false,
          logoutTimer: null,
        });

        localStorage.removeItem("expiryDate");
        localStorage.removeItem("auth-session");
      },

      rehydrate: () => {
        const expiryDate = localStorage.getItem("expiryDate");
        if (!expiryDate) return;

        const expiresIn = new Date(expiryDate).getTime() - new Date().getTime();

        if (expiresIn <= 0) {
          get().logout();
          return;
        }

        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (token && userId) {
          get().setAuth(token, userId, expiresIn);
        }
      },
    }),
    {
      name: "auth-session",
    }
  )
);

export default useAuthStore;
