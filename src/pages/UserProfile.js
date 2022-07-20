import React from "react";
import { Container, Row, Col} from "react-bootstrap";
import SongList from "../components/List/SongList";
import { storageStringToArray } from "../Helper";
import { useState, useEffect } from "react";

export default function UserProfile(props) {

  let { id, display_name, images, followers, type, href } =
    props.currentUserData;

    console.log(props);

  const [favorites, setFavorites] = useState(storageStringToArray(localStorage.getItem(id)));

  useEffect(() => {
    (() => {
      setFavorites(storageStringToArray(localStorage.getItem(id)));
    })();
  }, [id]);

  return (
    <Container>
      <Row className="mt-3">
        <Col xs="3">
          <img
            src={images?.[0]?.url || "no-photo.jpg"}
            className="img-fluid float-start rounded-circle img-thumbnail"
            alt=""
          />
        </Col>
        <Col xs="4">
          <h1 className="fw-bold" style={{ fontFamily: "Montserrat" }}>
            {display_name}
          </h1>
          <p className="lead ffs-6">{followers?.total.toLocaleString()} followers on Spotify</p>
        </Col>
      </Row>
      <Row className="mt-5">
        <h3 className="fw-bold">Favorites</h3>
        { favorites?.length > 0 ?         <SongList
          songs={favorites} currentUserData={props.currentUserData}
        /> : <p>No favorites yet</p>}
      </Row>
    </Container>
  );
}
