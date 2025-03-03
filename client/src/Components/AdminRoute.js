import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const user = useSelector((state) => state.user); 
  console.log("AdminRoute - User:", user); 

  if (!user) {
    console.log("Redirecting to login because user is not logged in.");
    return <Navigate to="/login" />;
  }

  if (!user.isAdmin) {
    console.log("Redirecting to login because user is NOT an admin.");
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default AdminRoute;

