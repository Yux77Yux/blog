import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.scss';
import reportWebVitals from './reportWebVitals';

const App = lazy(() => import('./App'));
const Navigation = lazy(() => import('./routes/navigation/navigation.component'));
const Authentication = lazy(() => import('./routes/authentication/authentication.component'));
const Home = lazy(() => import('./routes/home/home.component'));
const PersonInfo = lazy(() => import('./routes/personInfo/personInfo.component'));
const DateArrange = lazy(() => import('./routes/dateArrange/dateArrange.component'));
const Favorites = lazy(() => import('./routes/favorites/favorites.component'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Navigation />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "home",
            element: <Home />,
          },
          {
            path: "authentication",
            element: <Authentication />,
          },
          {
            path: "favorites",
            element: <Favorites />,
          },
          {
            path: "personInfo",
            element: <PersonInfo />,
          },
          {
            path: "dateArrange",
            element: <DateArrange />,
          },
        ]
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Suspense fallback="">
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>
);

reportWebVitals();
