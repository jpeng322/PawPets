import React from 'react'
import { useLoaderData } from "react-router-dom"

const Dashboard = () => {

    const userPetData = useLoaderData()
    const userPets = userPetData.map(userPet => {

        return (<div>
            <div>Name: {userPet.name}</div>
            <div>Species: {userPet.species}</div>
            <div>User: {userPet.userId}</div>
            <button onClick={deletePet()}>Delete</button>
        </div>)

    })


    return (
        <div>
            <div>This is the dashboard. This shows the user's pets.</div>
            <div>{userPets}</div>
        </div>
    )
}

export default Dashboard