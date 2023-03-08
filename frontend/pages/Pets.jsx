import { useEffect } from "react"
import { useLoaderData } from "react-router-dom"
import { Col, Row, Container, Image, Button } from "react-bootstrap"



const Pets = () => {

    const pets = useLoaderData()


    return (

        <Container fluid className="border pets-container pe-0 ps-0">
            <Col className="w-100 pets-row-container d-flex justify-content-center">
                <Row className="w-100 d-flex justify-content-center ">
                    {pets.map(pet =>
                        <Col className="pet-post d-flex flex-column justify-content-center align-items-center p-3" xs={10} sm={8} md={5} lg={5} xl={4} xxl={3}>
                            <div className="img-container"></div>
                            <div> {pet.name}</div>
                            <div>Species: {pet.species}</div>
                            <div>User: {pet.petUsername}</div>
                        </Col>)}
                </Row>
            </Col>
        </Container>
    )
}

export default Pets