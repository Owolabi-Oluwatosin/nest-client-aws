import { Navigate, Outlet, useLocation } from "react-router";

const useAuth = () => {
  const token = window.localStorage.getItem("token");
  return token && token !== undefined ? true : false;
};

export const PrivateRoute = (props) => {
  const isAuth = useAuth();
  //console.log(isAuth)
  const location = useLocation();
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate replace to='/signin' state={{ from: location }} />
  );
};
