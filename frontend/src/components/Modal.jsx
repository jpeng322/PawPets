import { useState, useContext } from "react";
import { AuthContext } from "../contexts/authContext.jsx";
import { Image, Button, Form, Modal } from "react-bootstrap";

import axios from "axios";

//components
import PaginationBasic from "./PaginationBasic.jsx";

const CommentModal = (props) => {
  const BASE_URL = import.meta.env.VITE_URL;
  const numberOfImages = 3;
  const numberOfPages = Math.ceil(props.comments.length / numberOfImages);

  const [pageNumber, setPageNumber] = useState(1);
  const currentComments =
    pageNumber === 1
      ? props.comments.slice(0, pageNumber * numberOfImages)
      : props.comments.slice(
          (pageNumber - 1) * numberOfImages,
          pageNumber * numberOfImages
        );

  const { loggedUsername, token } = useContext(AuthContext);
  // const [show, setShow] = useState(false);
  const [commentValue, setCommentValue] = useState("");

  const handleClose = () => props.setShow(false);

  // const handleShow = () => setShow(true);

  async function submitComment(id) {
    try {
      const response = await axios({
        method: "post",
        url: `${BASE_URL}/comment/`,
        data: {
          comment: commentValue,
          commentUsername: loggedUsername,
          petPostId: id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response) {
        console.log(response);
        setCommentValue("");
        // const comments = response.data.getAllComments;
        props.setComments([...props.comments, response.data.newComment]);
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
    <Modal
      className="d-flex justify-content-center align-items-center"
      show={props.show}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.modalPetInfo.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column align-items-center">
        {/* {console.log(props.modalPetInfo)} */}
        <div>
          <Image fluid className=" " src={props.modalPetInfo.link} alt="" />
        </div>
        <div className="w-100">
          {currentComments.map((comment) => (
            <div
              key={comment.id}
              className="comment-container d-flex flex-column mt-3 p-3 gap-1"
            >
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
        </div>
        <div>
          {props.comments.length > 3 && (
            <PaginationBasic
              pageNumber={pageNumber}
              numberOfPages={numberOfPages}
              setPageNumber={setPageNumber}
            />
          )}
        </div>
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
            onClick={() => submitComment(props.modalPetInfo.id)}
          >
            Comment
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default CommentModal;
