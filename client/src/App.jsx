
import PropTypes from "prop-types";

import Navbar from "./components/Navigation/Navbar";
import Footer from "./components/Footer/Footer";

import { useSignupState, useLoginState } from "./store/useFormStore";
import useAuthStore from "./store/useAuthStore";

export default function App({ children }) {
  const { setToken, setIsAuth } = useAuthStore();

  const { isSignedUp } = useSignupState();
  const { isLoggedIn } = useLoginState();

  const logoutHandler = () => {
    setIsAuth(false);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
  };

  return (
    <div>
      <Navbar onLogout={logoutHandler}/>
      <div className={isSignedUp || isLoggedIn ? "blur-xs" : ""}>
        {children}
      </div>
      <Footer />
    </div>
  );
}

App.propTypes = {
  children: PropTypes.node,
};
