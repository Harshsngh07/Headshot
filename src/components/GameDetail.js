import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { smallImage } from "../util";
import playstation from "../img/playstation.svg";
import gamepad from "../img/gamepad.svg";
import apple from "../img/apple.svg";
import nintendo from "../img/nintendo.svg";
import steam from "../img/steam.svg";
import xbox from "../img/xbox.svg";
import starFull from "../img/star-full.png";
import starEmpty from "../img/star-empty.png";

const GameDetail = ({ pathID }) => {
  const history = useHistory();
  const { game, screen, isLoading } = useSelector((state) => state.details);

  const exitDetailHandler = (e) => {
    const element = e.target;
    if (element.classList.contains("shadow")) {
      document.body.style.overflow = "auto";
      history.push("/");
    }
  };

  const getPlatform = (platform) => {
    switch (platform) {
      case "PlayStation 4":
        return playstation;
      case "PlayStation 5":
        return playstation;
      case "Xbox One":
        return xbox;
      case "Xbox Series S/X":
        return xbox;
      case "PC":
        return steam;
      case "iOS":
        return apple;
      case "Nintendo Switch":
        return nintendo;
      default:
        return gamepad;
    }
  };

  const getStars = () => {
    const stars = [];
    const rating = Math.floor(game.rating);
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<img src={starFull} key={i} alt="star" />);
      } else {
        stars.push(<img src={starEmpty} key={i} alt="star" />);
      }
    }

    return stars;
  };

  return (
    <>
      {!isLoading && (
        <CardShadow className="shadow" onClick={exitDetailHandler}>
          <Detail layoutId={pathID}>
            <Stats>
              <div className="ratings">
                <motion.h3 layoutId={`title ${pathID}`}>{game.name}</motion.h3>
                <p>Rating: {game.rating}</p>
                {getStars()}
              </div>
              <Info>
                <h3>Platforms</h3>
                <Platforms>
                  {game.platforms.map((data) => {
                    return (
                      <img
                        key={data.platform.id}
                        src={getPlatform(data.platform.name)}
                        alt={data.platform.name}
                      />
                    );
                  })}
                </Platforms>
              </Info>
            </Stats>
            <Media>
              <motion.img
                layoutId={`image ${pathID}`}
                src={smallImage(game.background_image, 1280)}
                alt={game.name}
              />
            </Media>
            <Description>
              <p>{game.description_raw}</p>
            </Description>
            <div className="gallery">
              {screen.results.map((screen) => {
                return (
                  <img
                    src={smallImage(screen.image, 1280)}
                    key={screen.id}
                    alt={game.name}
                  />
                );
              })}
            </div>
          </Detail>
        </CardShadow>
      )}
    </>
  );
};

const CardShadow = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  overflow-y: scroll;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ff7676;
  }

  &::-webkit-scrollbar-track {
    background: white;
  }
`;

const Detail = styled(motion.div)`
  width: 80%;
  border-radius: 1rem;
  padding: 2rem 5rem;
  background: white;
  position: absolute;
  left: 10%;
  color: black;
  z-index: 10;
  img {
    width: 100%;
  }
`;

const Stats = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    width: 2rem;
    height: 2rem;
    display: inline;
  }
`;

const Info = styled(motion.div)`
  text-align: center;
`;

const Platforms = styled(motion.div)`
  display: flex;
  justify-content: center;
  img {
    margin-left: 3rem;
  }
`;

const Media = styled(motion.div)`
  margin-top: 5rem;
  img {
    width: 100%;
  }
`;

const Description = styled(motion.div)`
  margin: 5rem 0rem;
`;

export default GameDetail;
