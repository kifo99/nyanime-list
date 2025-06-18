import PropTypes from "prop-types";
import { useEffect } from "react";

import Navbar from "./components/Navigation/Navbar";
import Footer from "./components/Footer/Footer";
import AddFriendButton from "./components/Friends/AddFriendButton";
import AddFriend from "./components/Friends/AddFriend";

import useAuthStore from "./features/auth/useAuthStore";

export default function App({ children }) {
  const rehydrate = useAuthStore((state) => state.rehydrate);

  useEffect(() => {
    rehydrate();
  }, [rehydrate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <AddFriend />
      <div className="fixed bottom-4 right-4 z-50">
        <AddFriendButton />
      </div>
      <Footer />
    </div>
  );
}

App.propTypes = {
  children: PropTypes.node,
};
