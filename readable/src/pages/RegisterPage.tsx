import { Navigate } from "react-router-dom";

export const RegisterPage = () => {
  // We no longer need registration for a static frontend. Redirect to login.
  return <Navigate to="/login" replace />;
};
