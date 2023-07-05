import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  return allowedRoles === "Admin" ? (
    <Outlet />
  ) : allowedRoles ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

// const mapStateToProps = createStructuredSelector({
//   roles: selectRole,
// });

export default RequireAuth;
