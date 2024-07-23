import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';

import { store } from './store/store';

import Spinner from './components/spinner/spinner.component';

import './index.scss';

const App = lazy(() => import('./App'));
const Navigation = lazy(() => import('./routes/navigation/navigation.component'));
const Authentication = lazy(() => import('./routes/authentication/authentication.component'));
const Push = lazy(() => import('./routes/push/push.component'));
const PersonInfo = lazy(() => import('./routes/personInfo/personInfo.component'));
const DateArrange = lazy(() => import('./routes/dateArrange/dateArrange.component'));
const Favorites = lazy(() => import('./routes/favorites/favorites.component'));
const ArticleDetail = lazy(() => import('./components/articleDetail/articleDetail.component'));

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
            path: "push",
            element: <Push />,
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
      },
      {
        path: "articles/:uuid",
        element: <ArticleDetail />,
      },
    ]
  },
])

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
  <Suspense fallback={< Spinner />}>
<Provider store={ store } >
<RouterProvider router={ router } />
</Provider>
</Suspense>
</React.StrictMode>
);

reportWebVitals();
