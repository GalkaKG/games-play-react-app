import { useContext } from "react";
import LatestGame from "./LatestGame/LatestGame";
import { GameContext } from "../../context/GameContext";

const Home = () => {
    const { games } = useContext(GameContext);

    return (
        <section id="welcome-world">
        <div className="welcome-message">
          <h2>ALL new games are</h2>
          <h3>Only in GamesPlay</h3>
        </div>
        <img src="./images/four_slider_img01.png" alt="hero" />
        <div id="home-page">
            
          <h1>Latest Games</h1>
          {games.length > 0
            ? games.map(x => <LatestGame key={x._id} game={x} />)
            : <p className="no-articles">No games yet</p>
          }
          {/* Display div: with information about every game (if any) */}
  
          {/* <div className="game">
            <div className="image-wrap">
              <img src="./images/ZombieLang.png" />
            </div>
            <h3>Zombie Lang</h3>
            <div className="rating">
              <span>☆</span>
              <span>☆</span>
              <span>☆</span>
              <span>☆</span>
              <span>☆</span>
            </div>
            <div className="data-buttons">
              <a href="#" className="btn details-btn">
                Details
              </a>
            </div>
          </div>
          <div className="game">
            <div className="image-wrap">
              <img src="./images/MineCraft.png" />
            </div>
            <h3>MineCraft</h3>
            <div className="rating">
              <span>☆</span>
              <span>☆</span>
              <span>☆</span>
              <span>☆</span>
              <span>☆</span>
            </div>
            <div className="data-buttons">
              <a href="#" className="btn details-btn">
                Details
              </a>
            </div>
          </div> */}
          {/* Display paragraph: If there is no games  */}
         
        </div>
      </section>
    );
}

export default Home;