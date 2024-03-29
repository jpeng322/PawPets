import { useEffect, useState, useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { Col, Row, Container, Image } from "react-bootstrap";

import axios from "axios";

//contexts
import { AuthContext } from "../contexts/authContext.jsx";

//components
import CommentModal from "../components/Modal.jsx";
import LikeComp from "../components/LikeComp.jsx";
import FavoritesComp from "../components/FavComp.jsx";

const Pets = () => {
  const { token, userId } = useContext(AuthContext);
  const BASE_URL = import.meta.env.VITE_URL;
  const pets = useLoaderData();
  const [petList, setPetList] = useState(pets);
  const [show, setShow] = useState(false);
  const [comments, setComments] = useState([]);

  const [modalPetInfo, setModalPetInfo] = useState("");
  const [likedList, setLikedList] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);

  useEffect(() => {
    const fetchLikesList = async () => {
      try {
        const getLikesList = await axios({
          method: "get",
          url: `${BASE_URL}/pet/likes/list`,
          headers: {
            // 'Content-type': "application/json; charset=utf-8",
            Authorization: `Bearer ${token}`,
          },
        });

        const trueLikesList = getLikesList.data.likedList.filter(
          (likes) => likes.liked === true
        );
        if (trueLikesList) {
          setLikedList(trueLikesList);
        }
        // console.log(likesResponse);

        const favResponse = await axios({
          method: "get",
          url: `${BASE_URL}/favorites/${userId}`,
          headers: {
            // 'Content-type': "application/json; charset=utf-8",
            Authorization: `Bearer ${token}`,
          },
        });
        const getFavoriteList = favResponse.data.favorite;
        setFavoriteList(getFavoriteList);
      } catch (e) {
        console.log(e);
      }
    };
    fetchLikesList().catch(console.error);
  }, []);

  async function displayComments(id) {
    setShow(true);
    try {
      const response = await axios({
        method: "get",
        url: `${BASE_URL}/comment/${id}`,
        headers: {
          // 'Content-type': "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response) {
        console.log(response);
        const petInfo = pets.filter((pet) => pet.id === id)[0];
        const comments = response.data.getAllComments;
        setComments(comments);
        setModalPetInfo(petInfo);
      } else {
        console.log("NO RESPONSE");
      }
    } catch (e) {
      console.log(e);
    }
  }

  // console.log(pets.find(pet => pet.id === 1))

  async function updateLikes(id) {
    const updatePet = petList.find((pet) => pet.id === id);
    // console.log(updatePet)
    try {
      const likesResponse = await axios({
        method: "post",
        url: `${BASE_URL}/pet/likes/${id}`,
        headers: {
          // 'Content-type': "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
        data: {
          likes: updatePet.likes,
        },
      });

      if (likesResponse.data.liked === true) {
        console.log("LIKED");
        setPetList(
          petList.map((pet) => {
            if (pet.id === id) {
              return { ...pet, likes: pet.likes + 1 };
            } else {
              return pet;
            }
          })
        );
      } else {
        setPetList(
          petList.map((pet) => {
            if (pet.id === id) {
              return { ...pet, likes: pet.likes - 1 };
            } else {
              return pet;
            }
          })
        );
      }

      const getLikesList = await axios({
        method: "get",
        url: `${BASE_URL}/pet/likes/list`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const trueLikesList = getLikesList.data.likedList.filter(
        (likes) => likes.liked === true
      );

      if (trueLikesList) {
        setLikedList(trueLikesList);
      }

      console.log(likesResponse);
    } catch (e) {
      console.log(e);
    }
  }

  const addFavorite = async (petId) => {
    const inFavoriteList = favoriteList.some(
      (favorite) => favorite.petId === petId
    );
    console.log(inFavoriteList, favoriteList);
    if (inFavoriteList) {
      try {
        const deleteFavorite = await axios({
          method: "delete",
          url: `${BASE_URL}/favorites/${petId}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            userId: userId,
            petId: petId,
          },
        });

        if (deleteFavorite) {
          console.log("unfavorited");
          setFavoriteList(
            favoriteList.filter((favorite) => favorite.petId !== petId)
          );
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const addFavorite = await axios({
          method: "post",
          url: `${BASE_URL}/favorites/`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            userId: userId,
            petId: petId,
          },
        });

        if (addFavorite) {
          console.log(addFavorite);
          const favoritedDetails = addFavorite.data.favorite;
          setFavoriteList([...favoriteList, favoritedDetails]);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <Container fluid className="pets-container pe-0 ps-0">
      <Col className="w-100 pets-row-container d-flex justify-content-center">
        <Row className="w-100 d-flex justify-content-center ">
          {petList.map((pet) => (
            <Col
              key={pet.id}
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
                <FavoritesComp
                  pet={pet}
                  favoriteList={favoriteList}
                  addFavorite={addFavorite}
                />

                <LikeComp
                  pet={pet}
                  likedList={likedList}
                  updateLikes={updateLikes}
                />
              </div>
              <div className="d-flex mt-2 gap-2">
                <div className="">Species: {pet.species} </div>
                <div>User: {pet.petUsername}</div>
              </div>
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
