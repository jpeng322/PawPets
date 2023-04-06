import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/authContext.jsx";
import { useLoaderData } from "react-router-dom";
import {
  Col,
  Row,
  Container,
  Image,
  Button,
  Form,
  Modal,
} from "react-bootstrap";

import axios from "axios";
//css
import { PetCard } from "../components/styled/Card.jsx";

const Pets = () => {
  const pets = useLoaderData();

  const { loggedUsername } = useContext(AuthContext);

  const [show, setShow] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentValue, setCommentValue] = useState("");
  const [modalPetInfo, setModalPetInfo] = useState("");

  // const newDate = new Date();
  // const date = newDate.getDate();
  // console.log(newDate);
  const handleClose = () => setShow(false);

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

  // const handleShow = () => setShow(true);

  async function submitComment(id) {
    console.log(id, "petpostid");
    try {
      const response = await axios({
        method: "post",
        url: `http://localhost:3001/comment/`,
        data: {
          comment: commentValue,
          commentUsername: loggedUsername,
          petPostId: id,
        },
      });

      if (response) {
        console.log(response);
        setCommentValue("")
        // const comments = response.data.getAllComments;
        setComments([...comments, response.data.newComment]);
      } else {
        console.log("NO RESPONSE");
      }
    } catch (e) {
      console.log(e);
    }
  }

  function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
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

      <Modal
        className="d-flex justify-content-center align-items-center"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalPetInfo.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {console.log(modalPetInfo)}
          <div>
            <Image fluid className=" " src={modalPetInfo.link} alt="" />
          </div>
          {comments.map((comment) => (
            <div className="comment-container d-flex flex-column mt-3">
              <div className="  d-flex justify-content-between align-items-center">
                {" "}
                <div className="comment-username fw-bolder">
                  {" "}
                  {comment.commentUsername}
                </div>{" "}
                <div className="comment-timestamp">
                  {timeSince(new Date(comment.createdAt))} ago
                </div>
              </div>
              <div>Comment: {comment.comment}</div>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer className="d-flex flex-row">
          <div className="comment-line d-flex w-100 justify-content-between align-items-center gap-3">
            <Form.Group className="" controlId="formBasicEmail">
              <Form.Control
                className="comment-input"
                type="email"
                placeholder=""
                onChange={(e) => setCommentValue(e.target.value)}
                value={commentValue}
              />
            </Form.Group>
            <Button
              variant="primary"
              onClick={() => submitComment(modalPetInfo.id)}
            >
              Comment
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Pets;
