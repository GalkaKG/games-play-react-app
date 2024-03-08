import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import * as authService from '../../services/authService';

const Logout = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        authService.logout(user.accessToken)
            .then(() => {
                navigate('/');
            })
            .catch(() => {
                navigate('/');
            });
    });

    return null;
}

export default Logout;