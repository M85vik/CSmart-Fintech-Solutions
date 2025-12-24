import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const { user } = useSelector((state) => state.auth);
  // This is a simple check. For production, you'd want to validate the token.
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;