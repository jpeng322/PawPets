import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Routes
} from "react-router-dom";
import './App.css'
import axios from "axios";
import { useState, useEffect } from "react"

//components
import Main from '../layouts/Main';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';




function App() {
  const [pets, setPets] = useState();
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



  // when click show pets
  // const loadPets = async () => {
  //   const petData = await axios.get("http://localhost:8080/pet");

  //   console.log(petData);

  //   if(petData.status == 200 && petData.data.success == true){
  //     setPets(petData.data.pets);
  //   }
  // };


  // when the page loads show pets 
  useEffect(() => {
    const loadPets = async () => {
      const petData = await axios.get("http://localhost:8080/pet");

      console.log(petData);

      if (petData.status == 200 && petData.data.success == true) {
        setPets(petData.data.pets);
      }
    };

    loadPets();

  }, [])
  return (

    <>
      <RouterProvider router={router} />
      <div className="App">
        {/* <button onClick={() => loadPets()} >Click here to load pets </button> */}
        {
          pets &&
          pets.length >= 1 &&
          pets.map((pets) => <div>{pets.name}
          </div>)}

      </div>
    </>
  )
}

export default App
