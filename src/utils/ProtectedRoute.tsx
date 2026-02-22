import { Navigate } from "react-router-dom";
import { getLocalStorage } from "../utils/localStorage";
import NotFound from "../pages/NotFound";

const ProtectedRoute = ({ allowedRoles, children }: { allowedRoles: string[], children: React.ReactNode }) => {
    const user = getLocalStorage("user");
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        return <NotFound />;
    }

    return children;
};

export default ProtectedRoute;
