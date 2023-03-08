import { useState } from 'react'
import axios from 'axios'
const PetForm = (props) => {

    const [petName, setPetName] = useState("")
    const [species, setSpecies] = useState("")


    async function addPet() {
        // console.log(hasToken)
        try {
            const response = await axios({
                method: 'post',
                url: `http://localhost:8080/pet`,
                headers: {
                    // 'Content-type': "application/json; charset=utf-8",
                    'Authorization': `Bearer ${props.token}`,
                },
                data: {
                    name: petName,
                    species: species,
                    userId: props.userId
                }
            })

            if (response) {
                props.setUserPets(response.data.petsList)
            }

        } catch (e) {
            console.log(e)
        };
    }

    return (
        <div>
            <div className="mb-3">
                <label htmlFor="inputUsername" className="form-label">Pet Name</label>
                <input type="text" className="form-control" id="inputUsername" aria-describedby="username" onChange={(e) => setPetName(e.target.value)} value={petName} />
            </div>
            <div className="mb-3">
                <label htmlFor="inputPassword1" className="form-label">Species</label>
                <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setSpecies(e.target.value)} value={species} />
            </div>
            <button onClick={addPet} className="btn btn-primary">Create</button>
            <button onClick={() => props.setShowForm(!(props.showForm))}>Close</button>
        </div>
    )
}

export default PetForm