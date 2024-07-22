import { Outlet } from 'react-router-dom';

import PersonProfileNav from './components/personProfileNav/personProfileNav.component';
import VideoBackground from './components/videoBackground/videoBackground.component';

import './App.scss';

const App = () => {
  return (
    <>
      <VideoBackground video="bg.mp4" />
      <PersonProfileNav />
      <Outlet />
    </>
  );
}

export default App;
