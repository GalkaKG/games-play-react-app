import { Outlet, Navigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { GameContext } from "../../context/GameContext";
import { useContext } from "react";

const GameOwner = ({ children }) => {
    const { selectGame } = useContext(GameContext);
    const { user, isAuthenticated } = useAuthContext();
    const { gameId } = useParams();

    const currentGame = selectGame(gameId);

    if (isAuthenticated && user._id !== currentGame._ownerId) {
        return <Navigate to='/catalog' replace />;
    }

    return children ? children : <Outlet />;
}

export default GameOwner;