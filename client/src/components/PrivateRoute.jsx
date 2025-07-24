import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { status, rehydrated } = useSelector((state) => state.auth);

  if (!rehydrated) return <div>Loading auth...</div>; 
  
  return status ? children : <Navigate to="/login" />;
};

export default PrivateRoute;


