import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const Giving = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <h2>Giving Page</h2>
      {/* Donation form here */}
    </div>
  );
};

export default Giving;
