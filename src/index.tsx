import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';

import { store } from './store/store';

import {
  loader as personPageLoader
} from './routes/personPage/personPage.component';
import Spinner from './components/spinner/spinner.component';

import './index.scss';

const App = lazy(() => import('./App'));
const Navigation = lazy(() => import('./routes/navigation/navigation.component'));
const Authentication = lazy(() => import('./routes/authentication/authentication.component'));
const Search = lazy(() => import('./routes/searchPage/search.component'));
const Creations = lazy(() => import('./routes/creations/creations.component'));
const PersonPage = lazy(() => import('./routes/personPage/personPage.component'));
const Favorites = lazy(() => import('./routes/favorites/favorites.component'));
const ArticleDetail = lazy(() => import('./components/articleDetail/articleDetail.component'));
const ModifyProfile = lazy(() => import('./components/modifyProfile/modifyProfile.component'));
const ModifyBio = lazy(() => import('./components/modifyBio/modifyBio.component'));
const ModifyName = lazy(() => import('./components/modifyName/modifyName.component'));
const ErrorPage = lazy(() => import('./components/ErrorPage/errorPage.component'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Navigation />,
        children: [
          {
            path: "search",
            element: <Search />,
          },
          {
            path: "authentication/:sign",
            element: <Authentication />,
          },
          {
            path: "favorites",
            element: <Favorites />,
          },
          {
            path: "creations",
            element: <Creations />,
          },
        ]
      },
      {
        path: "personPage/:uid",
        element: <PersonPage />,
        loader: personPageLoader,
        children: [
          {
            path: "modifyProfile",
            element: <ModifyProfile />,
          },
          {
            path: "modifyBio",
            element: <ModifyBio />,
          },
          {
            path: "modifyName",
            element: <ModifyName />,
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
      <Provider store={store} >
        <RouterProvider router={router} />
      </Provider>
    </Suspense>
  </React.StrictMode>
);

reportWebVitals();
