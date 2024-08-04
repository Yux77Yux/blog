import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PersonProfileNav from './components/personProfileNav/personProfileNav.component';
import VideoBackground from './components/videoBackground/videoBackground.component';

import { fetchArticlesStart } from './store/articles/articles.action';

import './App.scss';


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticlesStart(""));
  }, [dispatch]);

  return (
    <div className='contentBody'>
      <span className="globalHint">
        <span className="text"></span>
      </span>
      <VideoBackground video="bg.mp4" />
      <PersonProfileNav />
      <Outlet />
    </div>
  );
}

export default App;
