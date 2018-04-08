import React from 'react';
import { SignupButton,LoginButton,Welcome,Ball,Tagline } from './styles';
class Greetings extends React.Component {
  render() {
    return (
      <Welcome>
        <center>
          <Ball src='https://upload.wikimedia.org/wikipedia/en/3/39/Pokeball.PNG'></Ball>
        </center>

        <SignupButton href='/signup'>Signup</SignupButton>
        <LoginButton href='/login'>Login</LoginButton><br />
        <Tagline>Welcome to Pokemon Center!</Tagline>
      </Welcome>

    );
  }
}

export default Greetings;
