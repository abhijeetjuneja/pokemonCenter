import styled, { keyframes }  from 'styled-components';
import { bounceIn,rotateIn,fadeIn } from 'react-animations';

const bounce = keyframes`${bounceIn}`;
const rotate = keyframes`${rotateIn}`;
const fade = keyframes`${fadeIn}`;

export const PokemonContainer = styled.div`
  background-color : ${props => props.bgColor};
  color:white;
  font-weight:bold;
  text-align:center;
  margin : 4vh 0px;
  border:5px solid white;
  min-height : 20vh;
  -webkit-box-shadow:0 2px 6px 6px white;
  -moz-box-shadow: 0 2px 6px 6px white;
  box-shadow: 0 2px 6px 6px white;
  animation: 10s ${bounce};
`;
