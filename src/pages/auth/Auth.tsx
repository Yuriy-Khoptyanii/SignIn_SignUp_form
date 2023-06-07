import './Auth.scss';

import { useState } from 'react';

import Logo from '../../components/logo/Logo';
import SignIn from '../../components/logIn/SignIn';
import SignUp from '../../components/logIn/SignUp';

function Auth() {
  const [isUser, setIsUser] = useState(true);

  const handleSwitchForm = () => {
    setIsUser(!isUser);
  };

  return (
    <div className="auth">
      <Logo />
      <div className="title">{isUser ? 'SIGN IN' : 'SIGN UP'}</div>
      {isUser ? <SignIn /> : <SignUp />}

      <div className="switchForm">
        <p>{isUser ? "Don't have account yet?" : 'I have an account.'}</p>
        <button onClick={handleSwitchForm} className="switchForm__btn">
          {isUser ? 'New Account' : 'Go to Sign in'}
        </button>
      </div>
    </div>
  );
}

export default Auth;
