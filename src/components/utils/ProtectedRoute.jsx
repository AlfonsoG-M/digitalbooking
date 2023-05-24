import { useEffect } from "react";
import { useNavigate} from "react-router-dom";
import ErrorComponent from "../../routes/ErrorComponent";

export const ProtectedRoute = ({children, rols}) => {
    
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.rolId;

    const isAllowed = () => {
      return rols.includes(userId) ? true : false
    }

    useEffect(() => {
      if (!token) {
        navigate("/");
      }
        
    }, [navigate, token]);
    
    return isAllowed() ? children : <ErrorComponent/>;
    
}