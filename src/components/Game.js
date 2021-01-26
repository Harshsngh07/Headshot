import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { loadDetails } from "../actions/detailsAction";
import { useDispatch } from "react-redux";
export default function Game({ name, image, released, id }) {
  const dispatch = useDispatch();
  const loadDetailHandler = () => {
    dispatch(loadDetails(id));
  };
  return (
    <StyledGames onClick={loadDetailHandler}>
      <h3>{name}</h3>
      <p>{released}</p>
      <img src={image} alt={name} />
    </StyledGames>
  );
}

const StyledGames = styled(motion.div)`
  min-height: 30vh;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  border-radius: 1rem;
  img {
    width: 100%;
    height: 40vh;
    object-fit: cover;
  }
`;
