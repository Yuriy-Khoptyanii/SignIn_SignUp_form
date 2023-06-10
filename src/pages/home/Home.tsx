import './Home.scss';

import { useNavigate } from 'react-router-dom';

import Logo from '../../components/logo/Logo';
import decor from '../../icons/Decor.svg';
import imgHome from '../../icons/imageHome.png';
import { useAppDispatch } from '../../store';
import { clearUser } from '../../store/auth/slice';
import { fetchLogOut } from '../../store/auth/thunks';

function Home() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogOut = async () => {
    dispatch(fetchLogOut())
      .then(() => {
        return dispatch(clearUser());
      })
      .then(() => {
        navigate('/login');
      });
  };

  return (
    <div className="home">
      <Logo />
      <div className="article">
        <div className="wrapper">
          <h1 className="article__title">CONGRATULATIONS</h1>
          <img className="article__img" src={decor} alt="decor" />
        </div>
        <p className="article__text">
          Now you are on the main page. Soon we will provide you with detailed feedback on
          the result of your work
        </p>
        <button onClick={handleLogOut} type="button" className="btn--logOut">
          Log Out
        </button>
        <img className="imgHome" src={imgHome} alt="imgHome" />
      </div>
    </div>
  );
}

export default Home;
