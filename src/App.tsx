import './App.scss';

import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createHashRouter, Navigate, RouterProvider } from 'react-router-dom';
import PacmanLoader from 'react-spinners/PacmanLoader';

import Auth from './pages/auth/Auth';
import Home from './pages/home/Home';
import { RootState, useAppDispatch } from './store';
import { fetchGetUser } from './store/auth/thunks';

const ProtectedRoute: FC<{ children: JSX.Element }> = ({ children }) => {
  const user = useSelector((state: RootState) => state.user.user);
  const isUserLoading = useSelector((state: RootState) => state.user.isUserLoading);

  if (isUserLoading) {
    return <PacmanLoader color="#36d7b7" />;
  }

  if (user && user.username.length > 0) {
    return children;
  } else {
    return <Navigate to="/auth" replace />;
  }
};

const router = createHashRouter([
  {
    path: '*',
    element: <Navigate to="/auth" />,
  },
  {
    path: '/',
    element: <Navigate to="/auth" />,
  },
  {
    path: '/auth',
    element: <Auth />,
  },
  {
    path: '/home',
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGetUser());
  }, []);

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
