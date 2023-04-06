import { useState, useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { Col, Row, Container, Image } from "react-bootstrap";

import axios from "axios";

//components
import CommentModal from "../components/Modal.jsx";

const Pets = () => {
  const pets = useLoaderData();

  const [show, setShow] = useState(false);
  const [comments, setComments] = useState([]);
  const [modalPetInfo, setModalPetInfo] = useState("");

  async function displayComments(id) {
    console.log(id);
    setShow(true);
    // setModalPetId(id)
    // console.log(modalPetId)
    try {
      const response = await axios({
        method: "get",
        url: `http://localhost:3001/comment/${id}`,
      });

      if (response) {
        console.log(response);
        const petInfo = pets.filter((pet) => pet.id === id)[0];
        const comments = response.data.getAllComments;
        setComments(comments);
        setModalPetInfo(petInfo);
        console.log(modalPetInfo);
      } else {
        console.log("NO RESPONSE");
      }
    } catch (e) {
      console.log(e);
    }
  }

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
                <Image className=" " src={pet.link} alt="" />
              </div>
              <div className="mt-3">Species: {pet.species}</div>
              <div>User: {pet.petUsername}</div>
              <div
                onClick={() => displayComments(pet.id)}
                className="comment-btn"
              >
                Comment{" "}
                <span className="ms-1">
                  <svg
                    className="comment-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M160 368c26.5 0 48 21.5 48 48v16l72.5-54.4c8.3-6.2 18.4-9.6 28.8-9.6H448c8.8 0 16-7.2 16-16V64c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16V352c0 8.8 7.2 16 16 16h96zm48 124l-.2 .2-5.1 3.8-17.1 12.8c-4.8 3.6-11.3 4.2-16.8 1.5s-8.8-8.2-8.8-14.3V474.7v-6.4V468v-4V416H112 64c-35.3 0-64-28.7-64-64V64C0 28.7 28.7 0 64 0H448c35.3 0 64 28.7 64 64V352c0 35.3-28.7 64-64 64H309.3L208 492z" />
                  </svg>
                </span>
              </div>
              {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
              </Button> */}
            </Col>
          ))}
        </Row>
      </Col>

      <CommentModal
        comments={comments}
        setComments={setComments}
        setShow={setShow}
        show={show}
        modalPetInfo={modalPetInfo}
      />
    </Container>
  );
};

export default Pets;
