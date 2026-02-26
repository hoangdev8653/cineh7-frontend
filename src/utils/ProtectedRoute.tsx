import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import NotFound from "../pages/NotFound";
import { PATH } from "./path";

const ProtectedRoute = ({ allowedRoles, children }: { allowedRoles: string[], children: React.ReactNode }) => {
    const { user } = useAuthStore();
    console.log(
        user
    );


    if (!user || Object.keys(user).length === 0) {
        return <Navigate to={PATH.LOGIN} replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        return <NotFound />;
    }

    return children;
};

export default ProtectedRoute;
