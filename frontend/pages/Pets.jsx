import { useLoaderData } from "react-router-dom"

const Pets = () => {
    const pets = useLoaderData()
    console.log(pets)

    const allPets =
        pets.map(pet => <div>
            <div>Name : {pet.name}</div>
            <div>Species: {pet.species}</div>
            <div>User: {pet.userId}</div>
        </div>)
    return (

        <div>{allPets}</div>
    )
}

export default Pets