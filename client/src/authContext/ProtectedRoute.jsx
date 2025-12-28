import { AuthStore } from "./AuthStore"
import { useNavigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {

    const navigate = useNavigate()

    const user = AuthStore((s) => s.user)
    const loading = AuthStore((s) => s.loading)

    if (loading) return <div>Loading...</div>;
    if (!user) navigate("signup");
    return children;
    
}

export default ProtectedRoute