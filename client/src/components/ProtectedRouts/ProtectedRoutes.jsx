import { Navigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import PropTypes from "prop-types";

export default function ProtectedRoutes({ children }) {
  const { isAuth } = useAuthStore();

  return isAuth ? children : <Navigate to="/" replace />;
}

ProtectedRoutes.propTypes = {
  children: PropTypes.node,
};
