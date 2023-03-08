import { useEffect } from "react"
import { useLoaderData } from "react-router-dom"

import { getUsername } from "../loaders"



const Pets = () => {

    const pets = useLoaderData()

    // async function getPetUser(id) {
    //     const response = await (getUsername(id))

    //     const allPets =
    //         pets.map(pet => <div>
    //             <div>Name : {pet.name}</div>
    //             <div>Species: {pet.species}</div>
    //             <div>User: {getPetUser(pet.userId)}</div>
    //         </div>)
    // }


    const allPets =
        pets.map(pet => <div>
            <div>Name : {pet.name}</div>
            <div>Species: {pet.species}</div>
            <div>User: {pet.petUsername}</div>
        </div>)


    return (

        <div>{allPets}</div>
    )
}

export default Pets