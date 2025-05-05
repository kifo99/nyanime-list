import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

import useAuthStore from "../../features/auth/useAuthStore.js";

export default function ProtectedRoutes({ children }) {
  const { isAuth } = useAuthStore();

  return isAuth ? children : <Navigate to="/" replace />;
}

ProtectedRoutes.propTypes = {
  children: PropTypes.node,
};
