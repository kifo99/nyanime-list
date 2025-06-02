import { create } from "zustand";
import { persist } from "zustand/middleware";

const customStorage = {
  getItem: (name) => {
    const value = localStorage.getItem(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: (name, value) => localStorage.setItem(name, JSON.stringify(value)),
  removeItem: (name) => localStorage.removeItem(name),
  clear: () => {
    localStorage.removeItem("auth-session");
    localStorage.removeItem("expiryDate");
  },
};

const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      isAuth: false,
      userId: null,
      logoutTimer: null,

      setToken: (token) => set(() => ({ token })),
      setIsAuth: (isAuth) => set(() => ({ isAuth })),
      setUserId: (userId) => set(() => ({ userId })),

      setAuth: (token, userId, expiresInMs) => {
        const oldTimer = get().logoutTimer;
        if (oldTimer) clearTimeout(oldTimer);

        const expiryDate = new Date(new Date().getTime() + expiresInMs);
        customStorage.setItem("expiryDate", expiryDate.toISOString());

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

        useAuthStore.persist.clearStorage();

        customStorage.clear();

        // Reinitialize the store by rehydrating it from storage (optional)
        useAuthStore.persist.rehydrate();
      },

      rehydrate: () => {
        const expiryDate = customStorage.getItem("expiryDate");
        if (!expiryDate) return;

        const expiresIn = new Date(expiryDate).getTime() - new Date().getTime();

        if (expiresIn <= 0) {
          get().logout();
          return;
        }

        const authSession = customStorage.getItem("auth-session");

        if (!authSession) return;
        const { token, userId } = authSession.state || {};

        if (token && userId) {
          get().setAuth(token, userId, expiresIn);
        }
      },
    }),
    {
      name: "auth-session",
      storage: customStorage,
      partialize: (state) => ({
        token: state.token,
        isAuth: state.isAuth,
        userId: state.userId,
      }),
      getStorage: () => localStorage,
    }
  )
);

export default useAuthStore;
