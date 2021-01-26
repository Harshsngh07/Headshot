import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { loadDetails } from "../actions/detailsAction";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { smallImage } from "../util";
export default function Game({ name, image, released, id }) {
  const stringPathID = id.toString();
  const dispatch = useDispatch();
  const loadDetailHandler = () => {
    document.body.style.overflow = "hidden";
    dispatch(loadDetails(id));
  };
  return (
    <StyledGames layoutId={stringPathID} onClick={loadDetailHandler}>
      <Link to={`/game/${id}`}>
        <motion.h3 layoutId={`title ${stringPathID}`}>{name}</motion.h3>
        <p>{released}</p>
        <motion.img
          layoutId={`title ${stringPathID}`}
          src={smallImage(image, 640)}
          alt={name}
        />
      </Link>
    </StyledGames>
  );
}

const StyledGames = styled(motion.div)`
  min-height: 30vh;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  border-radius: 1rem;
  cursor: pointer;
  overflow: hidden;
  img {
    width: 100%;
    height: 40vh;
    object-fit: cover;
  }
`;
