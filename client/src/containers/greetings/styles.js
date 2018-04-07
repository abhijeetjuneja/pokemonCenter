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
    box-shadow: 0 8px 26px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
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
    box-shadow: 0 8px 26px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
    cursor:pointer;
    color:red;
    text-decoration:none;
  };
  animation: 2s ${bounce};
`;


export const Ball = styled.img`
  animation: 2s ${rotate};
`;

export const Tagline = styled.h1`
  animation: 2s ${fade};
`;


export const Welcome = styled.div`
  background-color:#7accfd;
  color:white;
  font-weight:bold;
  padding:10vh 0px;
  min-height:100vh;
  text-align:center;

`;
