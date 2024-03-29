import React, { useState } from "react";
import "../CSS/Home.css";
import { Container, Carousel } from "react-bootstrap";

const Home = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
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
            src="/images/hero1.PNG"
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
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/hero2.PNG"
            alt="Second slide"
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
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/hero3.PNG"
            alt="Third slide"
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
            <img src="/images/signup.png" />
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
            <img src="/images/meowy.PNG" />
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
            <img src="/images/media_activity.png" />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Home;
