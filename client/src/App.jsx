import PropTypes from "prop-types";

import Navbar from "./components/Navigation/Navbar";
import Footer from "./components/Footer/Footer";
import useAuthStore from "./store/useAuthStore";

export default function App({ children }) {
  const { setToken, setIsAuth } = useAuthStore();

  const logoutHandler = () => {
    setIsAuth(false);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onLogout={logoutHandler} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

App.propTypes = {
  children: PropTypes.node,
};
