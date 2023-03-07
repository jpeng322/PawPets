
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

//components
import Main from '../layouts/Main';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Main />
      ),
      children: [{
        path: "/",
        element: <Home />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "signup",
        element: <Signup />
      },
      ]
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
