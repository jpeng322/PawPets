import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  useNavigate,
  redirect
} from "react-router-dom";
import './App.css'
import axios from "axios";
import { useState, useEffect, useContext } from "react"


//contexts
// import AuthContextProvider from '../contexts/authContext';
import { AuthContext } from "../contexts/authContext";

//components
import Main from '../layouts/Main';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Pets from '../pages/Pets'

//loaders
import { getPets, getUserPets } from '../loaders/index.js'





function App() {


  const { hasToken } = useContext(AuthContext)


  console.log(hasToken)
  // const [pets, setPets] = useState();
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Main />
      ),
      children: [
        {
          path: "/home",
          element: <Home />,
          // loader: hasToken ? (({ params }) => {
          //   const userParam = 3
          //   return getUserPets(userParam)
          // }) : (() => {
          //   return getPets()
          // })
        },
        {
          path: "pets",
          element: <Pets />,
          loader: (() => {
            return getPets()
          })
        },
        {
          path: "login",
          element: <Login />
        },
        {
          path: "signup",
          element: <Signup />
        },
        {
          path:  `dashboard/:userId`,
          element: <Dashboard />,
          loader: (({ params }) => {
            const userParam = params.userId
            return getUserPets(userParam)
          })
        }
      ]
    },
  ]);



  // when click show pets
  // const loadPets = async () => {
  //   const petData = await axios.get("http://localhost:8080/pet");

  //   console.log(petData);

  //   if(petData.status == 200 && petData.data.success == true){
  //     setPets(petData.data.pets);
  //   }
  // };


  // when the page loads show pets 
  // useEffect(() => {
  //   const loadPets = async () => {
  //     const petData = await axios.get("http://localhost:8080/pet");

  //     console.log(petData);

  //     if (petData.status == 200 && petData.data.success == true) {
  //       setPets(petData.data.pets);
  //     }
  //   };

  //   loadPets();

  // }, [])
  return (

    <>
      {/* <AuthContextProvider> */}
      <RouterProvider router={router} />
      {/* <div className="App"> */}
      {/* <button onClick={() => loadPets()} >Click here to load pets </button> */}
      {/* {
            pets &&
            pets.length >= 1 &&
            pets.map((pets) => <div>{pets.name}
            </div>)} */}

      {/* </div> */}
      {/* </AuthContextProvider> */}
    </>
  )
}

export default App
