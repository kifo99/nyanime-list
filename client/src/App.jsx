import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { CirclePlus, Users, MessageCircleMore } from "lucide-react";

import Navbar from "./components/Navigation/Navbar";
import Footer from "./components/Footer/Footer";
// import AddFriendButton from "./components/Friends/AddFriendButton";
import AddFriend from "./components/Friends/AddFriend";
import FriendRequests from "./components/Friends/FriendRequests";
import PopUpButton from "./components/Button/PopUpButton";
import ChatPopup from "./components/Message/ChatPopup";

import useAuthStore from "./features/auth/useAuthStore";
import useFriendshipStore from "./features/friends/useFriendshipStore";
import useMessageStore from "./features/message/useMessageStore";

export default function App({ children }) {
  const navigate = useNavigate();

  const { isOpened, setIsOpened, requestListIsOpened, setRequestListIsOpened } =
    useFriendshipStore();

  const { chatIsOpen, setChatIsOpen } = useMessageStore();

  const rehydrate = useAuthStore((state) => state.rehydrate);
  const { userId, isAuth } = useAuthStore();

  useEffect(() => {
    rehydrate();
  }, [rehydrate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <ChatPopup />
      <AddFriend />
      <FriendRequests />
      {isAuth && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="mb-1">
            <PopUpButton
              onClick={() => {
                // setChatIsOpen(!chatIsOpen);
                navigate(`/inbox`);
              }}
              className="rounded-full bg-purple-600 hover:bg-purple-800 flex items-center justify-center w-12 h-12"
            >
              <MessageCircleMore
                size={37}
                className="stroke-white  w-fit h-fit m-0 p-0"
              />{" "}
            </PopUpButton>
          </div>
          <div className="mb-1">
            <PopUpButton
              onClick={() => {
                setIsOpened(!isOpened);
              }}
              className="rounded-full bg-blue-700 hover:bg-blue-600 flex items-center justify-center w-12 h-12"
            >
              <CirclePlus
                size={30}
                className="stroke-white  w-full h-full m-0 p-0"
              />{" "}
            </PopUpButton>
          </div>
          <div className="mb-1">
            <PopUpButton
              onClick={() => {
                setRequestListIsOpened(!requestListIsOpened);
              }}
              className="rounded-full bg-green-600 hover:bg-green-400 flex items-center justify-center w-12 h-12"
            >
              <Users size={30} className="stroke-white  w-fit h-fit m-0 p-0" />{" "}
            </PopUpButton>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

App.propTypes = {
  children: PropTypes.node,
};
