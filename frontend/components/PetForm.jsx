import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/authContext";

import { Col, Row, Container, Image, Form, Button } from "react-bootstrap";
import Draggable from "react-draggable";
const PetForm = (props) => {
  const { loggedUsername } = useContext(AuthContext);

  const [petName, setPetName] = useState("");
  const [species, setSpecies] = useState("");
  const [blobFile, setBlobFile] = useState("");
  function handleFileChange(e) {
    const file = e.target.files[0];
    blobFileFunc(file);
  }
  async function addPet(e) {
    e.preventDefault();
    try {
      const fileResponse = await axios.post(
        "http://localhost:3001/post/upload",

        {
          data: {
            imageUrl: blobFile,
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (fileResponse) {
        console.log(fileResponse);
        try {
          const response = await axios({
            method: "post",
            url: `http://localhost:3001/pet`,
            headers: {
              // 'Content-type': "application/json; charset=utf-8",
              Authorization: `Bearer ${props.token}`,
            },
            data: {
              // imageUrl: blobFile,
              name: petName,
              species: species,
              userId: props.userId,
              petUsername: loggedUsername,
              link: fileResponse.data.link,
            },
          });

          if (response) {
            // console.log(response)
            props.setUserPets(response.data.petsList);
          }
        } catch (e) {
          console.log(e);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  function blobFileFunc(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setBlobFile(reader.result);
    };
  }

  return (
    <Draggable>
      <Form onSubmit={addPet} className="add-form">
        <div>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload a Picture</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>
        </div>
        <div className="mb-3">
          <label htmlFor="inputUsername" className="form-label">
            Pet Name
          </label>
          <input
            type="text"
            className="form-control"
            id="inputUsername"
            aria-describedby="username"
            onChange={(e) => setPetName(e.target.value)}
            value={petName}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputPassword1" className="form-label">
            Species
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setSpecies(e.target.value)}
            value={species}
          />
        </div>
        <div className="d-flex justify-content-between">
          <Button
            type="submit"
            // onClick={addPet}
            variant="success"
          >
            Create
          </Button>
          <button
            className="close-btn"
            onClick={() => props.setShowForm(!props.showForm)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
            </svg>
          </button>
        </div>
        {/* </div> */}
      </Form>
    </Draggable>
  );
};

export default PetForm;
