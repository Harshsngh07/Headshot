import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadGames } from "../actions/gamesAction";
import styled from "styled-components";
import Game from "../components/Game";
import GameDetail from "../components/GameDetail";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { fadeIn } from "../animations";
const Home = () => {
  //get location
  const location = useLocation();
  const pathID = location.pathname.split("/")[2];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadGames());
  }, [dispatch]);
  const { popular, newGames, upcoming, searched } = useSelector(
    (state) => state.games
  );
  return (
    <GameList variants={fadeIn} initial="hidden" animate="show">
      <AnimateSharedLayout>
        <AnimatePresence>
          {pathID && <GameDetail pathID={pathID} />}
        </AnimatePresence>
      </AnimateSharedLayout>
      {searched.length ? (
        <div className="searched">
          <h2>Searched Games</h2>
          <Games>
            {searched.map((game) => {
              return (
                <Game
                  name={game.name}
                  image={game.background_image}
                  released={game.released}
                  id={game.id}
                  key={game.id}
                />
              );
            })}
          </Games>
        </div>
      ) : (
        ""
      )}
      <h2>Next Release</h2>
      <Games>
        {upcoming.map((game) => {
          return (
            <Game
              name={game.name}
              image={game.background_image}
              released={game.released}
              id={game.id}
              key={game.id}
            />
          );
        })}
      </Games>
      <h2>Popular Games</h2>
      <Games>
        {popular.map((game) => {
          return (
            <Game
              name={game.name}
              image={game.background_image}
              released={game.released}
              id={game.id}
              key={game.id}
            />
          );
        })}
      </Games>
      <h2>New Games</h2>
      <Games>
        {newGames.map((game) => {
          return (
            <Game
              name={game.name}
              image={game.background_image}
              released={game.released}
              id={game.id}
              key={game.id}
            />
          );
        })}
      </Games>
    </GameList>
  );
};

const GameList = styled(motion.div)`
  padding: 0rem 5rem;
  h2 {
    padding: 5rem 0rem;
  }
`;
const Games = styled(motion.div)`
  min-height: 80vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-column-gap: 3rem;
  grid-row-gap: 2rem;
`;

export default Home;
