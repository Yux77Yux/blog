import { Outlet } from 'react-router-dom';

import VideoBackground from './components/videoBackground/videoBackground.component';

import './App.scss';

const App = () => {
  return (
    <>
    <VideoBackground />
      <Outlet />
    </>
  );
}

export default App;
