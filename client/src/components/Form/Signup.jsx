// import AddIcon from "../../assets/icons/add/add.svg";
import PropTypes from "prop-types";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useRef} from "react";

export default function Signup({
  showSignupForm,
  onShowSignupForm,
  onSignup,
  error,
  navRef,
}) {
  const validationSchema = Yup.object({
    name: Yup.string().required(),
    email: Yup.string().required().email(),
    password: Yup.string().required(),
    confirmPassword: Yup.string()
      .required()
      .oneOf([Yup.ref("password"), null], "Password must be matched"),
  });

  function handleToggleSignupForm(e) {
    e.preventDefault();
    onShowSignupForm(false);
    if (navRef.current) {
      navRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }

  const signupRef = useRef();

  useEffect(
    function () {
      if (showSignupForm && signupRef.current) {
        signupRef.current.scrollIntoView({
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
    [showSignupForm, navRef]
  );

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div
        ref={signupRef}
        className={`scroll-smooth bg-gray-100 rounded-lg shadow-lg min-w-4xl shadow-amber-50 ${
          showSignupForm ? "" : "hidden"
        }`}
      >
        <div className="flex justify-end items-end mr-3.5">
          <button
            className="flex items-center  text-white font-bold justify-center  m-2 h-9 w-28 bg-red-600 p-2 rounded-full hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-amber-bg-amber-300 transition-all  "
            onClick={(e) => handleToggleSignupForm(e)}
          >
            Close
          </button>
        </div>
        <h1 className="text-amber-300 font-bold mb-4 text-center text-3xl p-7 ">
          Sign Up
        </h1>
        {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={onSignup}
        >
          <Form className="flex flex-col justify-center items-center space-y-4 ">
            <Field
              type="text"
              name="name"
              placeholder=" Name"
              className=" m-7 w-3/4 h-11 rounded-lg bg-amber-200 text-amber-800 border-none focus:border-amber-800  focus:ring-amber-800 focus:ring-2 outline-none focus:bg-amber-300 "
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-600"
            />
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

            <Field
              type="password"
              name="confirmPassword"
              placeholder=" Confirm Password"
              className=" m-7 w-3/4 h-11 rounded-lg bg-amber-200 text-amber-800 border-none focus:border-amber-800  focus:ring-amber-800 focus:ring-2 outline-none focus:bg-amber-300 "
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="text-red-600"
            />

            <button
              type="submit"
              className="flex items-center  text-amber-950 font-bold justify-center mb-11 h-9 w-36 bg-amber-200 p-2 rounded-full hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-bg-amber-300 transition-all  "
            >
              Sign up
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

Signup.propTypes = {
  showSignupForm: PropTypes.bool,
  onShowSignupForm: PropTypes.func,
  onSignup: PropTypes.func,
  error: PropTypes.string,
  navRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};
