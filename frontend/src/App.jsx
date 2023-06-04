import "./App.css";
import { ThemeProvider } from "styled-components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";


import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//contexts
// import AuthContextProvider from '../contexts/authContext';


//components
import Main from "./layouts/Main";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Pets from "./pages/Pets";
import Favorites from "./pages/Favorites";

//loaders
import {
  getPets,
  getUserPets,
  getFavorites,
} from "./loaders/index.js";

function App() {
 

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      errorElement: <p>404 NOT FOUND!</p>,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "pets",
          element: <Pets />,
          loader: () => {
            return getPets();
          },
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: `dashboard/:userId`,
          element: <Dashboard />,
          loader: ({ params }) => {
            const userParam = params.userId;
            return getUserPets(userParam);
          },
        },
        {
          path: `favorites/:userId`,
          element: <Favorites />,
          loader: ({ params }) => {
            const userParam = params.userId;
            return getFavorites(userParam);
          },
        },
      ],
    },
  ]);

  const theme = {
    //background yellow
    primary: "#FFFBEB",
    //background blue
    secondary: "var(--secondary-color)",
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
