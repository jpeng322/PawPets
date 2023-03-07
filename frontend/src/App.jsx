
import './App.css'
import axios from "axios";
import { useState, useEffect } from "react"

function App() {
  const [ pets, setPets ] = useState();

// when click show pets
  // const loadPets = async () => {
  //   const petData = await axios.get("http://localhost:8080/pet");

  //   console.log(petData);

  //   if(petData.status == 200 && petData.data.success == true){
  //     setPets(petData.data.pets);
  //   }
  // };


  // when the page loads show pets 
useEffect(() =>{
  const loadPets = async () => {
    const petData = await axios.get("http://localhost:8080/pet");

    console.log(petData);

    if (petData.status == 200 && petData.data.success == true){
      setPets(petData.data.pets);
    }
  };

  loadPets();

}, [])

  return (
    <div className="App">
      {/* <button onClick={() => loadPets()} >Click here to load pets </button> */}
      {pets && 
        pets.lenght >= 1 && 
        pets.map((pets) => <div>{pets.name}</div>)}
    </div>
  )
}

export default App
