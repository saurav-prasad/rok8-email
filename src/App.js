import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import ErrorPage from './components/ErrorPage';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToRead } from './app/functions/read';
import { addToFavourite } from './app/functions/favourite';

function App() {
  const dispatch = useDispatch()
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "*",
      element: <ErrorPage />
    }
  ])
  useEffect(() => {
    if (localStorage.getItem('read')) {
      const readData = JSON.parse(localStorage.getItem('read'))
      readData.forEach(element => {
        dispatch(addToRead(element))
      });
    }
    if (localStorage.getItem('favourites')) {
      const favouriteData = JSON.parse(localStorage.getItem('favourites'))
      favouriteData.forEach(element => {
        dispatch(addToFavourite(element))
      });
    }
  })
  return (
    <RouterProvider router={router} />
  );
}

export default App;
