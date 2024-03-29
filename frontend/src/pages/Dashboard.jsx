import { useContext, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";

//context
import { AuthContext } from "../contexts/authContext";

//components
import PetForm from "../components/PetForm";

//css
import "../CSS/Dashboard.css";
import { Col, Row, Container, Image, Button } from "react-bootstrap";
import Favorites from "./Favorites";

const Dashboard = () => {

  const BASE_URL = import.meta.env.VITE_URL
  const { token, userId, uploadFile } = useContext(AuthContext);

  const userPetData = useLoaderData();

  const [userPets, setUserPets] = useState(userPetData);

  const [showForm, setShowForm] = useState(false);

  const [showEditForm, setShowEditForm] = useState(false);

  const [changeId, setChangeId] = useState();

  const [petEditName, setPetEditName] = useState();

  const [petEditSpecies, setPetEditSpecies] = useState();

  // const [favList, setFavList] = useState([]);
  async function deletePet(petId) {
    // console.log(hasToken)
    try {
      const deleteComments = await axios({
        method: "delete",
        url: `${BASE_URL}/comment/${petId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const deleteLikes = await axios({
        method: "delete",
        url: `${BASE_URL}/pet/likes/delete/${petId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const deleteFavorites = await axios({
        method: "delete",
        url: `${BASE_URL}/favorites/${petId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (deleteComments) {
        const response = await axios({
          method: "delete",
          url: `${BASE_URL}/pet/${petId}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response) {
          setUserPets(response.data.petsList);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function editPet(petId) {
    try {
      const response = await axios({
        method: "put",
        url: `${BASE_URL}/pet/${petId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          name: petEditName,
          species: petEditSpecies,
        },
      });

      if (response) {
        setUserPets(response.data.petsList);
        setChangeId("");
      }
    } catch (e) {
      console.log(e);
    }
  }

  userPets.map((userPet) => {
    if (userPet.id === changeId) {
      return <p>This is the edit form</p>;
    } else {
      return (
        <div>
          <div> {userPet.name}</div>
          <div>Species: {userPet.species}</div>
          <div>User: {userPet.userId}</div>
          <button onClick={() => deletePet(userPet.id)}>Delete</button>
          <button onClick={() => setChangeId(userPet.id)}>Edit</button>
        </div>
      );
    }
  });

  const navigate = useNavigate();

  function redirectFavorite() {
    return  navigate(`/favorites/${userId}`);
  }

  return (
    <Container fluid className="dashboard-container">
      <Col xs={12}>
        <Row className="dashboard-header-container d-flex justify-content-center">
          <Col
            className=" dashboard-header text-center mb-5"
            xs={10}
            sm={6}
            md={10}
            xxl={9}
          >
            {userPetData.length === 0 ? <div>Add a pet!</div> :
              <div>Your pets missed you!</div> 
              }
            <Button className="add-btn" onClick={() => setShowForm(!showForm)}>
              Add Pet
            </Button>
          </Col>
        </Row>
        <Row>
          <Col className="pet-post-container" xs={12}>
            <Row className="w-100 d-flex justify-content-center">
              {userPets.map((userPet) => {
                if (userPet.id === changeId) {
                  return (
                    <Col key={userPet.id}
                      className="pet-post gap-3"
                      xs={10}
                      sm={8}
                      md={5}
                      lg={5}
                      xl={4}
                      xxl={3}
                    >
                      <div className="img-container">
                        <Image className="" src={userPet.link} alt="" />
                      </div>
                      <div className="">
                        <label htmlFor="inputUsername" className="form-label">
                          Name:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputUsername"
                          aria-describedby="username"
                          onChange={(e) => setPetEditName(e.target.value)}
                          value={petEditName}
                        />
                      </div>
                      <div className="">
                        <label htmlFor="inputPassword1" className="form-label">
                          Species:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleInputPassword1"
                          onChange={(e) => setPetEditSpecies(e.target.value)}
                          value={petEditSpecies}
                        />
                      </div>
                      <Button
                        onClick={() => editPet(changeId)}
                        className="btn btn-primary"
                      >
                        Complete
                      </Button>
  
                    </Col>
                  );
                } else {
                  return (
                    <Col key={userPet.id}
                      className="pet-post gap-3"
                      xs={10}
                      sm={8}
                      md={5}
                      lg={5}
                      xl={4}
                      xxl={3}
                    >
                      {/* <Image fluid src="" alt="pet-img" className="img-container" xs={12}></Image> */}
                      <div className="pet-name">{userPet.name}</div>
                      <div className="img-container">
                        <Image className="" src={`${userPet.link}`} alt="" />
                      </div>

                      <div>Species: {userPet.species}</div>
                      <div className="d-flex gap-2">
                        <Button
                          variant="danger"
                          onClick={() => deletePet(userPet.id)}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => {
                            setChangeId(userPet.id);
                            setPetEditName(userPet.name);
                            setPetEditSpecies(userPet.species);
                          }}
                        >
                          Edit
                        </Button>
                      </div>
                    </Col>
                  );
                }
              })}
            </Row>
          </Col>
        </Row>
      </Col>

      <div>
        {" "}
        {showForm ? (
          <PetForm
            userPets={userPets}
            setUserPets={setUserPets}
            userId={userId}
            token={token}
            showForm={showForm}
            setShowForm={setShowForm}
          />
        ) : (
          ""
        )}{" "}
      </div>
    </Container>
  );
};

export default Dashboard;
