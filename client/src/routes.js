import React from 'react';
import { Route ,Router} from 'react-router';

import App from './containers/App';
import Greetings from './containers/greetings/Greetings';
import SignupPage from './containers/signup/SignupPage';
import LoginPage from './containers/login/LoginPage';
import PokemonsPage from './containers/pokemons/PokemonsPage';
import ProfilePage from './containers/profile/ProfilePage';
import GoogleLoginPage from './containers/google/GoogleLoginPage';
import GoogleErrorPage from './containers/google/GoogleErrorPage';
import GoogleCallbackPage from './containers/google/GoogleCallbackPage';
import Auth from './utils/Auth';

export default (
  <Router>
    <Route exact path="/" component={Auth(Greetings)} auth={false}/>
    <Route path="/" component={App}>
      <Route path="signup" component={Auth(SignupPage)} auth={false} />
      <Route path="login" component={Auth(LoginPage)} auth={false}/>
      <Route path="pokemons" component={Auth(PokemonsPage)} auth={true}/>
      <Route path="me" component={Auth(ProfilePage)} auth={true}/>
      <Route path="google/:token" component={GoogleLoginPage} />
      <Route path="auth/google/callback" component={GoogleCallbackPage} />
      <Route path="googleerror" component={GoogleErrorPage} />
    </Route>

  </Router>

)
