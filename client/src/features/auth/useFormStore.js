import { create } from "zustand";

const useFormStore = create((set) => ({
  // Signup state:
  isSignedUp: false,
  setIsSignedUp: (newStatus) => set(() => ({ isSignedUp: newStatus })),

  //Login state:
  isLoggedIn: false,
  setIsLoggedIn: (newStatus) => set(() => ({ isLoggedIn: newStatus })),
}));

export const useSignupState = () => {
  const { isSignedUp, setIsSignedUp } = useFormStore();

  return { isSignedUp, setIsSignedUp };
};

export const useLoginState = () => {
  const { isLoggedIn, setIsLoggedIn } = useFormStore();

  return { isLoggedIn, setIsLoggedIn };
};

export default useFormStore;
