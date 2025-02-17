// import AddIcon from "../../assets/icons/add/add.svg";
import PropTypes from "prop-types";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Signup({ showSignup, onShowSignup }) {
  const [error, setError] = useState(null);

  const validationSchema = Yup.object({
    name: Yup.string().required(),
    email: Yup.string().required().email(),
    password: Yup.string().required(),
  });

  async function handleSubmit(values) {
    try {
      await axios.post(`http://localhost:8080/admin/signup`, values);
      onShowSignup(false);
    } catch (error) {
      console.log(error);
      setError("Failed to signup please try again later");
    }
  }

  const signupRef = useRef();

  useEffect(
    function () {
      if (showSignup && signupRef.current) {
        signupRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    },
    [showSignup]
  );

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div
        ref={signupRef}
        className={`scroll-smooth bg-gray-100 rounded-lg shadow-lg min-w-4xl shadow-amber-50 ${
          showSignup ? "" : "hidden"
        }`}
      >
        <h1 className="text-amber-300 font-bold mb-4 text-center text-3xl p-7 ">
          Sign Up
        </h1>
        {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="flex flex-col justify-center items-center space-y-4 ">
            <Field
              type="text"
              name="name"
              // ref={nameRef}
              placeholder=" Name"
              className=" m-9  w-3/4 h-11 rounded-lg bg-amber-200 text-amber-800 border-none focus:border-amber-800  focus:ring-amber-800 focus:ring-2 outline-none focus:bg-amber-300 "
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-600"
            />
            <Field
              type="email"
              name="email"
              // ref={emailRef}
              placeholder=" Email"
              className=" m-3  w-3/4 h-11 rounded-lg bg-amber-200 text-amber-800 border-none focus:border-amber-800  focus:ring-amber-800 focus:ring-2 outline-none focus:bg-amber-300 "
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-600"
            />

            <Field
              type="password"
              name="password"
              // ref={passwordRef}
              placeholder=" Password"
              className=" m-9  w-3/4 h-11 rounded-lg bg-amber-200 text-amber-800 border-none focus:border-amber-800  focus:ring-amber-800 focus:ring-2 outline-none focus:bg-amber-300 "
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
              Sign in
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

Signup.propTypes = {
  showSignup: PropTypes.bool,
  onShowSignup: PropTypes.func,
};
