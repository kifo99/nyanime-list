import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import Navbar from "./components/Navigation/Navbar";
import Footer from "./components/Footer/Footer";
import Signup from "./components/Form/Signup";
import Login from "./components/Form/Login";
export default function App({ children }) {
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const navRef = useRef(null);

  const [error, setError] = useState(null);

  useEffect(function () {
    const token = localStorage.getItem("token");
    const expiryDate = localStorage.getItem("expiryDate");
    if (!token || !expiryDate) return;
    if (new Date(expiryDate) <= new Date()) {
      logoutHandler();
      return;
    }
    const userId = localStorage.getItem("userId");
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    setIsAuth(true);
    setToken(token);
    setUserId(userId);
    setAutoLogout(remainingMilliseconds);
  }, []);

  const setAutoLogout = (milliseconds) => {
    setTimeout(logoutHandler, milliseconds);
  };

  const logoutHandler = () => {
    setIsAuth(false);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
  };

  async function handleLogin(values, { resetForm }) {
    try {
      const { data } = await axios.post(
        `http://localhost:8080/admin/login`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setIsAuth(true);
      setToken(data.token);
      setUserId(data.userId);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
      localStorage.setItem("expiryDate", expiryDate.toISOString());
      setShowLoginForm(false);
      setAutoLogout(remainingMilliseconds);
    } catch (error) {
      console.error(error);
    } finally {
      resetForm();
    }
  }

  async function handleSignup(values, { resetForm }) {
    try {
      await axios.post(`http://localhost:8080/admin/signup`, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setShowSignupForm(false);
      setIsAuth(false);
    } catch (error) {
      console.log(error);
      setError("Failed to signup please try again later");
    } finally {
      resetForm();
    }
  }

  return (
    <div>
      <Navbar
        isAuth={isAuth}
        onShowSignupForm={setShowSignupForm}
        onShowLoginForm={setShowLoginForm}
        onLogout={logoutHandler}
        userId={userId}
        ref={navRef}
      />
      <div className={showSignupForm || showLoginForm ? "blur-xs" : ""}>
        {children}
      </div>
      <Footer />
      <div
        className={
          showSignupForm ? "flex justify-center items-center mt-5" : "hidden"
        }
      >
        <Signup
          showSignupForm={showSignupForm}
          onShowSignupForm={setShowSignupForm}
          onSignup={handleSignup}
          error={error}
          navRef={navRef}
        />
      </div>
      <div
        className={
          showLoginForm ? "flex justify-center items-center mt-5" : "hidden"
        }
      >
        <Login
          showLoginForm={showLoginForm}
          onShowLoginForm={setShowLoginForm}
          error={error}
          onLogin={handleLogin}
          navRef={navRef}
        />
      </div>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.node,
};
