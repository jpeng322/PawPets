import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { Col, Row, Container, Image, Button } from "react-bootstrap";

//css
import { PetCard } from "../components/styled/Card.jsx";

const Pets = () => {
  const pets = useLoaderData();

  return (
    <Container fluid className="pets-container pe-0 ps-0">
      <Col className="w-100 pets-row-container d-flex justify-content-center">
        <Row className="w-100 d-flex justify-content-center ">
          {pets.map((pet) => (
            <Col
              className="pet-post pt-5 pb-5  gap-md-3 d-flex flex-column justify-content-center align-items-center"
              xs={10}
              sm={8}
              md={5}
              lg={5}
              xl={4}
              xxl={3}
            >
              <div className="pet-name"> {pet.name}</div>
              <div className="img-container">
                <Image className=" " src={`../images/${pet.link}`} alt="" />
              </div>
              <div className="mt-3">Species: {pet.species}</div>
              <div>User: {pet.petUsername}</div>
            </Col>
          ))}
        </Row>
      </Col>
    </Container>
  );
};

export default Pets;
