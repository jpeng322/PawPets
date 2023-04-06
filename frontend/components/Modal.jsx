import { useState, useContext } from "react";
import { AuthContext } from "../contexts/authContext.jsx";
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

const CommentModal = (props) => {
  const { loggedUsername } = useContext(AuthContext);

  // const [show, setShow] = useState(false);
  const [commentValue, setCommentValue] = useState("");

  const handleClose = () => props.setShow(false);

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
      <Modal.Body>
        {/* {console.log(props.modalPetInfo)} */}
        <div>
          <Image fluid className=" " src={props.modalPetInfo.link} alt="" />
        </div>
        {props.comments.map((comment) => (
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
