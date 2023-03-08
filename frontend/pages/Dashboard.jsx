import { useContext, useState } from 'react'
import { useLoaderData } from "react-router-dom"
import axios from 'axios'

//context
import { AuthContext } from "../contexts/authContext";

//components
import PetForm from '../components/PetForm';

//css
import "../CSS/Dashboard.css"
import { Col, Row, Container, Image, Button } from "react-bootstrap"

const Dashboard = () => {

    const { token, userId } = useContext(AuthContext)

    const userPetData = useLoaderData()

    const [userPets, setUserPets] = useState(userPetData)

    const [showForm, setShowForm] = useState(false)

    const [showEditForm, setShowEditForm] = useState(false)

    const [changeId, setChangeId] = useState()


    const [petEditName, setPetEditName] = useState()

    const [petEditSpecies, setPetEditSpecies] = useState()


    console.log(token)
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

        } catch (e) {
            console.log(e)
        };
    }


    async function editPet(petId) {
        try {
            const response = await axios({
                method: 'put',
                url: `http://localhost:3001/pet/${petId}`,
                headers: {
                    // 'Content-type': "application/json; charset=utf-8",
                    'Authorization': `Bearer ${token}`,
                },
                data: {
                    name: petEditName,
                    species: petEditSpecies
                }
            })

            if (response) {
                setUserPets(response.data.petsList)
                setChangeId("")
            }

        } catch (e) {
            console.log(e)
        };
    }


    userPets.map(userPet => {
        if (userPet.id === changeId) {
            return <p>This is the edit form</p>
        } else {
            return (
                < div >
                    <div> {userPet.name}</div>
                    <div>Species: {userPet.species}</div>
                    <div>User: {userPet.userId}</div>
                    <button onClick={() => deletePet(userPet.id)}>Delete</button>
                    <button onClick={() => setChangeId(userPet.id)}>Edit</button>
                </div >)
        }
    })



    return (
        <Container fluid className="dashboard-container">
            {/* <Col></Col> */}
            <Col xs={12}>
                <Row className="dashboard-header-container d-flex justify-content-center">
                    <Col className=" dashboard-header text-center mb-5" xs={10} sm={6} md={10} xxl={9}>
                        {/* <div className="border d-flex"> */}
                        <div>
                            Your pets missed you!
                        </div>
                        <Button onClick={() => setShowForm(!showForm)}>Add Pet</Button>
                        {/* </div> */}
                    </Col>
                </Row>
                <Row>
                    <Col className="pet-post-container" xs={12}>
                        <Row className="w-100 d-flex justify-content-center">
                            {userPets.map(userPet => {
                                if (userPet.id === changeId) {
                                    return (
                                        <Col className="pet-post" xs={10} sm={8} md={5} lg={5} xl={4} xxl={3}>
                                            <div className="img-container"></div>
                                            <div className="mb-3">
                                                <label htmlFor="inputUsername" className="form-label">Name:</label>
                                                <input type="text" className="form-control" id="inputUsername" aria-describedby="username"
                                                    onChange={(e) => setPetEditName(e.target.value)}
                                                    value={petEditName}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="inputPassword1" className="form-label">Species:</label>
                                                <input type="text" className="form-control" id="exampleInputPassword1"
                                                    onChange={(e) => setPetEditSpecies(e.target.value)}
                                                    value={petEditSpecies}
                                                />
                                            </div>
                                            <Button onClick={() => editPet(changeId)} className="btn btn-primary">Complete</Button>
                                            {/* <button onClick={() => setShowEditForm(!(showEditForm))}>Close</button> */}
                                        </Col>
                                    )
                                } else {
                                    return (
                                        <Col className="pet-post" xs={10} sm={8} md={5} lg={5} xl={4} xxl={3}>
                                            {/* <Image fluid src="" alt="pet-img" className="img-container" xs={12}></Image> */}
                                            <div className="img-container"></div>
                                            <div>Name: {userPet.name}</div>
                                            <div>Species: {userPet.species}</div>
                                            <div className='d-flex gap-2'>
                                                <Button variant="danger" onClick={() => deletePet(userPet.id)}>Delete</Button>
                                                <Button variant="secondary" onClick={() => {
                                                    setChangeId(userPet.id)
                                                    setPetEditName(userPet.name)
                                                    setPetEditSpecies(userPet.species)
                                                }}>Edit</Button>
                                            </div>
                                        </Col >)
                                }
                            })}
                        </Row>
                    </Col>
                </Row>
            </Col>
            <div> {showForm ? <PetForm userPets={userPets} setUserPets={setUserPets} userId={userId} token={token} showForm={showForm} setShowForm={setShowForm} /> : ""} </div>
        </Container>
    )

}

export default Dashboard