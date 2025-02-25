import PropTypes from "prop-types";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useRef } from "react";

export default function Login({
  showLoginForm,
  onShowLoginForm,
  onLogin,
  error,
  navRef,
}) {
  const validationSchema = Yup.object({
    email: Yup.string().required().email(),
    password: Yup.string().required(),
  });

  const loginRef = useRef();

  function handleToggleLoginForm(e) {
    e.preventDefault();
    onShowLoginForm(false);
    if (navRef.current) {
      navRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }

  useEffect(
    function () {
      if (showLoginForm && loginRef.current) {
        loginRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      } else {
        if (navRef.current) {
          navRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }
    },
    [showLoginForm, navRef]
  );

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div
        ref={loginRef}
        className={`scroll-smooth bg-gray-100 rounded-lg shadow-lg min-w-4xl shadow-amber-50 ${
          showLoginForm ? "" : "hidden"
        }`}
      >
        <div className="flex justify-end items-end mr-3.5">
          <button
            className="flex items-center  text-white font-bold justify-center  m-2 h-9 w-28 bg-red-600 p-2 rounded-full hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-amber-bg-amber-300 transition-all  "
            onClick={(e) => handleToggleLoginForm(e)}
          >
            Close
          </button>
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
          onSubmit={onLogin}
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

Login.propTypes = {
  showLoginForm: PropTypes.bool,
  onShowLoginForm: PropTypes.func,
  onLogin: PropTypes.func,
  error: PropTypes.string,
  navRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};
