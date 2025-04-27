
import { Navigate, useLocation } from "react-router-dom";
import { useGetAdminProfileQuery, useGetStaffProfileQuery } from "../redux/features/auth/authApi";
import { skipToken } from "@reduxjs/toolkit/query";

const PrivateRoute = ({ children }:{children:React.ReactNode}) => {
  const location = useLocation();
  const {data:admin , isLoading:adminLoading ,  isError:adminError} = useGetAdminProfileQuery(undefined) 
  const {data:staffProfile , isLoading:staffLoading , isError:staffError} = useGetStaffProfileQuery(  admin && skipToken ) 



  if (adminLoading || staffLoading) {
    return <div>Loading...</div>;
  }

  if ((!admin && !staffProfile) || (adminError && staffError)) {
    return <Navigate to="/auth/login" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;