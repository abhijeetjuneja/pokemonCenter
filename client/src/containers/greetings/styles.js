import styled, { keyframes }  from 'styled-components';
import { bounceIn,rotateIn,fadeIn } from 'react-animations';

const bounce = keyframes`${bounceIn}`;
const rotate = keyframes`${rotateIn}`;
const fade = keyframes`${fadeIn}`;

export const SignupButton = styled.a`
  background-color: red;
  border: 2px solid white;
  font-weight:bold;
  color: white;
  padding: 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1.9vmax;
  margin: 5vh 5vw;
  border-radius: 50%;
  &:hover{
    -webkit-box-shadow:0 2px 6px 6px white;
    -moz-box-shadow: 0 2px 6px 6px white;
    box-shadow: 0 2px 6px 6px white;
    color:white;
    cursor:pointer;
    text-decoration:none;
  };
  animation: 2s ${bounce};
`;


export const LoginButton = styled.a`
  background-color: white;
  border: 2px solid red;
  font-weight:bold;
  color: red;
  padding: 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1.9vmax;
  margin: 5vh 5vw;
  border-radius: 50%;

  &:hover{
    -webkit-box-shadow:0 2px 6px 6px white;
    -moz-box-shadow: 0 2px 6px 6px white;
    box-shadow: 0 2px 6px 6px white;
    cursor:pointer;
    color:red;
    text-decoration:none;
  };
  animation: 2s ${bounce};
`;


export const Ball = styled.img`
  animation: 2s ${rotate};
  filter: drop-shadow(8px 8px 8px white);
`;

export const Tagline = styled.h1`
  animation: 2s ${fade};
  filter: drop-shadow(30px 10px 8px white);
`;


export const Welcome = styled.div`
  color:white;
  font-weight:bold;
  padding:10vh 0px;
  min-height:100vh;
  text-align:center;

`;
