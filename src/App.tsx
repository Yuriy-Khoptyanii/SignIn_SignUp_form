import './App.scss';

import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import Auth from './pages/auth/Auth';
import Home from './pages/home/Home';

const user = true;

const ProtectedRoute = ({ children }) => {
  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <HashRouter>
      <div className="app">
        <Routes>
          <Route index element={<Auth />} />
          <Route path="/login" element={<Auth />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
