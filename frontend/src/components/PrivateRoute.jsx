import { useState, useEffect } from "react";
import { useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const PrivateRoute = ({ element, allowedRoles }) => {
    const { auth } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const authCheck = async () => {
            if (auth.token) {
                try {
                    const res = await axios.get(`${VITE_API_URL}/api/auth/user-auth`);
                    if (res.data.success) {
                        setLoading(false); 
                    } else {
                        setLoading(false); 
                    }
                } catch (error) {
                    console.error('Error checking authentication', error);
                    setLoading(false); 
                }
            } else {
                setLoading(false); 
            }
        };

        authCheck();
    }, [auth.token]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (loading) {
                setLoading(true);
            }
        }, 2500);

        return () => clearInterval(interval); 
    }, [loading]);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (!auth.token) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(auth.user.role)) {
        return <Navigate to="/login" replace />;
    }

    return element;
};
PrivateRoute.propTypes = {
    element: PropTypes.element.isRequired,
    allowedRoles: PropTypes.arrayOf(PropTypes.string)
};

export default PrivateRoute;
