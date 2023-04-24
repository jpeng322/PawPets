import React, { useState } from "react";
import "../CSS/Home.css";
import { Col, Row, Container, Image, Carousel } from "react-bootstrap";

// import HeroPic1 from "../images/pawpets_hero_photo1.png";
// import HeroPic2 from "../images/pawpets_hero_photo2.png";
// import HeroPic3 from "../images/pawpets_hero_photo3.png";

import signupPic from "../images/signup.png";
import mediaActivity from "../images/media_activity.png";
import Meowy from "../images/meowy.png";
const Home = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <Container fluid className="p-0 home-container">
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        autoPlay={true}
        interval={4000}
        controls={false}
        indicators={true}
      >
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/pawpets_hero_photo1.png"
            alt="First slide"
          />
          <Carousel.Caption>
            <h1 className="hero-header">PawPets</h1>
            <div className="hero-subheader">
              Show off the <span>PawPets</span> you love!
            </div>
            <div className="hero-subheader">
              {" "}
              Create, like, and favorite posts.
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        {/* <Carousel.Item>
          <img className="d-block w-100" src={HeroPic2} alt="Second slide" />

          <Carousel.Caption>
            <h1 className="hero-header">PawPets</h1>
            <div className="hero-subheader">
              Show off the <span>PawPets</span> you love!
            </div>
            <div className="hero-subheader">
              {" "}
              Create, like, and favorite posts.
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={HeroPic3} alt="Third slide" />

          <Carousel.Caption>
            <h1 className="hero-header">PawPets</h1>
            <div className="hero-subheader">
              Show off the <span>PawPets</span> you love!
            </div>
            <div className="hero-subheader">
              {" "}
              Create, like, and favorite posts.
            </div>
          </Carousel.Caption>
        </Carousel.Item> */}
      </Carousel>

      <div className="graphic-container ">
        <div className="info-containers">
          <div className="description-containers d-flex flex-column">
            <h1>
              <span>1. Register and Create an Account!</span>
            </h1>{" "}
            <div className="description-subhead">
              To post your pets on PawPets, users will need to create an
              account. After signing up, users can log in and post pictures of
              their adorable pets!{" "}
            </div>
          </div>
          <div className="image-container">
            <img src={signupPic} />
          </div>
        </div>
        <div className="info-containers">
          <div className="description-containers d-flex flex-column">
            <h1>
              <span>2. Log In and Post Your Pet!</span>
            </h1>{" "}
            <div className="description-subhead">
              Once logged in, users can create posts with their pet's picture,
              species, and name.{" "}
            </div>
          </div>
          <div className="image-container">
            <img src={Meowy} />
          </div>
        </div>
        <div className="info-containers">
          <div className="description-containers d-flex flex-column">
            <h1>
              {" "}
              <span>3. Show Some Love!</span>
            </h1>{" "}
            <div className="description-subhead">
              {" "}
              Once your post is created other users can show their love by
              liking and favorting it! You can also look at like other posts and
              add them to your favorites as well!{" "}
            </div>
          </div>
          <div className="image-container">
            <img src={mediaActivity} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Home;
