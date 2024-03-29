import { useContext, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { GameContext } from '../../context/GameContext';
import { useAuthContext } from '../../context/AuthContext';
import * as gameService from '../../services/gameService';
import * as commentService from '../../services/commentService';

const GameDetails = () => {
    const navigate = useNavigate();
    const { addComment, fetchGameDetails, selectGame, gameRemove } = useContext(GameContext);
    const { user } = useAuthContext();
    const { gameId } = useParams();

    const currentGame = selectGame(gameId);
    const isOwner = currentGame._ownerId === user._id;

    useEffect(() => {
      (async () => {
        const gameDetails = await gameService.getOne(gameId);
        const gameComments = await commentService.getByGameId(gameId);
      
        fetchGameDetails(gameId, {...gameDetails, comments: gameComments.map(x =>`${x.user.email}: ${x.text}`) });
      })();
    }, []);

    const addCommentHandler = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const comment = formData.get('comment');
        
        commentService.create(gameId, comment)
          .then(result => {
              addComment(gameId, comment);
          })    
    }

    const gameDeleteHandler = () => {
      const confirmation = window.confirm('Are you sure tou want to delete this game?');
      
      if (confirmation) {
        gameService.remove(gameId)
          .then(() => {
            gameRemove(gameId);
            navigate('/catalog');
          })
      }
    }

    return (
        <section id="game-details">
          <h1>{currentGame?.title}</h1>
          <div className="info-section">
            <div className="game-header">
              <img className="game-img" src={currentGame?.imageUrl} />
              <h1>Bright</h1>
              <span className="levels">MaxLevel: {currentGame?.maxLevel}</span>
              <p className="type">{currentGame?.category}</p>
            </div>
            <p className="text">
              {currentGame?.summary}
            </p>

            <div className="details-comments">
              <h2>Comments:</h2>
              <ul>
                {currentGame?.comments?.map(x => 
                  <li className="comment">
                      <p>{x}</p>
                  </li>
                )}
              </ul>
              {!currentGame?.comments &&
                  <p className="no-comment">No comments.</p>
              }  
            </div>

            {isOwner &&
              <div className="buttons">
                <Link to={`/games/${gameId}/edit`} className="button">
                  Edit
                </Link>
                <button onClick={gameDeleteHandler} className="button">
                  Delete
                </button>
              </div>
            }
            
          </div>
        <article className="create-comment">
          <label>Add new comment:</label>
          <form className="form" onSubmit={addCommentHandler}>
            {/* <input
              type="text" 
              name="username" 
              placeholder="John Doe"
              onChange={onChange}
              onBlur={validateUsername}
              value={comment.username} 
             />

            {error.username && 
                <div style={{color: 'red'}}>{error.username} </div>
            } */}
            
            <textarea
              name="comment"
              placeholder="Comment......"
            />
            <input
              className="btn submit"
              type="submit"
              value="Add Comment"
            />
          </form>
        </article>
      </section>
    );   
};

export default GameDetails;