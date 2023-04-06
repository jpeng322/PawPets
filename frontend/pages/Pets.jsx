import { useState, useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { Col, Row, Container, Image } from "react-bootstrap";

import axios from "axios";

//contexts
import { AuthContext } from "../contexts/authContext.jsx";

//components
import CommentModal from "../components/Modal.jsx";

const Pets = () => {
  const { token, userId } = useContext(AuthContext);

  const pets = useLoaderData();
  const [petList, setPetList] = useState(pets);
  const [show, setShow] = useState(false);
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
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

  // console.log(pets.find(pet => pet.id === 1))

  async function updateLikes(id) {
    const updatePet = pets.find((pet) => pet.id === id);
    // console.log(updatePet)
    try {
      const response = await axios({
        method: "put",
        url: `http://localhost:3001/pet/likes/${id}`,
        headers: {
          // 'Content-type': "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
        data: {
          likes: liked ? updatePet.likes - 1 : updatePet.likes - 1,
        },
      });

      if (response) {
        setLiked(!liked);

        setPetList(
          petList.map((pet) => {
            if (pet.id === id) {
              return { ...pet, likes: liked ? pet.likes + 1 : pet.likes - 1 };
            } else {
              return pet;
            }
          })
        );
      }
    } catch (e) {
      console.log(e);
    }
  }

  console.log(liked);
  return (
    <Container fluid className="pets-container pe-0 ps-0">
      <Col className="w-100 pets-row-container d-flex justify-content-center">
        <Row className="w-100 d-flex justify-content-center ">
          {petList.map((pet) => (
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
              <div className="d-flex mt-2 gap-2">
                <div className="">Species: {pet.species} </div>
                <div className="d-flex">
                  <div>{pet.likes}</div>
                  <div onClick={() => updateLikes(pet.id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                    </svg>
                  </div>
                </div>
              </div>
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
