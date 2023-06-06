import './Home.scss';

import { useState } from 'react';

function Home() {
  const [isUser, setIsUser] = useState(true);

  const handleSwitchForm = () => {
    setIsUser(!isUser);
  };

  return (
    <div className="home">
      <div>домашня сторінка</div>
    </div>
  );
}

export default Home;
