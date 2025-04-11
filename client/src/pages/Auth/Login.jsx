import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import axios from "axios";

import useAuthStore from "../../store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [error, setError] = useState(null);

  const { setToken, setIsAuth, setUserId } = useAuthStore();

  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().required().email(),
    password: Yup.string().required(),
  });

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
      console.log(data.token, data.userId);

      setIsAuth(true);
      setToken(data.token);
      setUserId(data.userId);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
      localStorage.setItem("expiryDate", expiryDate.toISOString());
      navigate("/");
      setAutoLogout(remainingMilliseconds);
    } catch (error) {
      console.error(error.message);
      setError("Failed to login please try again later");
    } finally {
      resetForm();
    }
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div
        className={`scroll-smooth bg-gray-100 rounded-lg shadow-lg min-w-4xl shadow-amber-50 `}
      >
        <div className="flex justify-end items-end mr-3.5">
          <Link
            className="flex items-center  text-white font-bold justify-center  m-2 h-9 w-28 bg-red-600 p-2 rounded-full hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-amber-bg-amber-300 transition-all  "
            to="/"
          >
            Close
          </Link>
        </div>
        <h1 className="text-amber-300 font-bold mb-4 text-center text-3xl p-7 ">
          Login
        </h1>
        {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form className="flex flex-col justify-center items-center space-y-4 ">
            <Field
              type="email"
              name="email"
              placeholder=" Email"
              className="m-7 w-3/4 h-11 rounded-lg bg-amber-200 text-amber-800 border-none focus:border-amber-800  focus:ring-amber-800 focus:ring-2 outline-none focus:bg-amber-300 "
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-600"
            />

            <Field
              type="password"
              name="password"
              placeholder=" Password"
              className="m-7 w-3/4 h-11 rounded-lg bg-amber-200 text-amber-800 border-none focus:border-amber-800  focus:ring-amber-800 focus:ring-2 outline-none focus:bg-amber-300 "
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-600"
            />

            <button
              type="submit"
              className="flex items-center  text-amber-950 font-bold justify-center mb-11 h-9 w-36 bg-amber-200 p-2 rounded-full hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-bg-amber-300 transition-all  "
            >
              Login
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
