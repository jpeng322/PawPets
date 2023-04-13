import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Col, Row, Container, Image, Button } from "react-bootstrap";

const Favorites = (props) => {
  const userPetData = useLoaderData();

  const [favList, setFavList] = useState([]);
  console.log(userPetData);
  // async function getFavorites() {
  //   console.log("got favorites");
  //   try {
  //     const response = await axios({
  //       method: "get",
  //       url: `http://localhost:3001/favorites/1`,
  //       // url: `http://localhost:3001/favorites/${userId}`,
  //       headers: {
  //         // 'Content-type': "application/json; charset=utf-8",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     // console.log(response)

  //     async function getFavPet(id) {
  //       try {
  //         const favoritesResponse = await axios({
  //           method: "get",
  //           url: `http://localhost:3001/pet/${id}`,
  //           headers: {
  //             // 'Content-type': "application/json; charset=utf-8",
  //             Authorization: `Bearer ${token}`,
  //           },
  //         });
  //         if (favoritesResponse) {
  //           console.log(favoritesResponse.data.pet);
  //           // console.log(favList);
  //           // setFavList([...favList, favoritesResponse]);
  //           return favoritesResponse.data.pet;
  //         }
  //       } catch (e) {
  //         console.log(e);
  //       }
  //     }
  //     if (response) {
  //       const data = response.data.favorite;
  //       try {
  //         const promises = data.map(async (pet) => {
  //           const favoritesResponse = await axios({
  //             method: "get",
  //             url: `http://localhost:3001/pet/${pet.petId}`,
  //             headers: {
  //               // 'Content-type': "application/json; charset=utf-8",
  //               Authorization: `Bearer ${token}`,
  //             },
  //           });

  //           const petData = favoritesResponse.data.pet;
  //           return petData;
  //         });

  //         const results = await Promise.all(promises);
  //         setFavList(results)
  //       } catch (e) {
  //         console.log(e);
  //       }
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  return (
    // <div> Favorites</div>
    <Container fluid className="pets-container pe-0 ps-0">
      <Col className="w-100 pets-row-container d-flex justify-content-center">
        <Row className="w-100 d-flex justify-content-center ">
          {userPetData.map((pet) => (
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
                {/* <FavoritesComp
                  pet={pet}
                  likedList={likedList}
                  updateLikes={updateLikes}
                />

                <LikeComp
                  pet={pet}
                  likedList={likedList}
                  updateLikes={updateLikes}
                /> */}
              </div>
              <div className="d-flex mt-2 gap-2">
                <div className="">Species: {pet.species} </div>
                <div>User: {pet.petUsername}</div>
              </div>
            
              {/* <Button variant="primary" onClick={handleShow}>
              Launch demo modal
            </Button> */}
            </Col>
          ))}
        </Row>
      </Col>
    </Container>
  );
};

export default Favorites;
