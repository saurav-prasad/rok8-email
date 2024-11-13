import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import ErrorPage from './components/ErrorPage';

function App() {
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
  return (
    <RouterProvider router={router} />
  );
}

export default App;
