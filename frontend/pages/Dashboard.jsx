import { useContext, useState } from 'react'
import { useLoaderData } from "react-router-dom"
import axios from 'axios'

//context
import { AuthContext } from "../contexts/authContext";

const Dashboard = () => {
    const userPetData = useLoaderData()
    const [userPets, setUserPets] = useState(userPetData)
    const { token } = useContext(AuthContext)
    async function deletePet(petId) {
        // console.log(hasToken)
        try {
            const response = await axios({
                method: 'delete',
                url: `http://localhost:3001/pet/${petId}`,
                headers: {
                    // 'Content-type': "application/json; charset=utf-8",
                    'Authorization': `Bearer ${token}`,
                }
            })
            
            if (response) {
                setUserPets(response.data.petsList)
            }

            // if (response) {
            //     const data = await response.data
            //     localStorage.setItem(`${username}`, `${data.token}`)

            // } else {
            //     throw Error("No response")
            // }
        } catch (e) {
            console.log(e)
        };
    }
    // const userPetData = useLoaderData()
    console.log(userPetData)
    // const userPets = userPetData.map(userPet => {

    //     return (<div>
    //         <div>Name: {userPet.name}</div>
    //         <div>Species: {userPet.species}</div>
    //         <div>User: {userPet.userId}</div>
    //         <button onClick={() => deletePet(userPet.id)}>Delete</button>
    //     </div>)

    // })



    return (
        <div>
            <div>This is the dashboard. This shows the user's pets.</div>
            <div>{userPets.map(userPet => {

                return (<div>
                    <div>Name: {userPet.name}</div>
                    <div>Species: {userPet.species}</div>
                    <div>User: {userPet.userId}</div>
                    <button onClick={() => deletePet(userPet.id)}>Delete</button>
                </div>)

            })}</div>
        </div>
    )
}

export default Dashboard