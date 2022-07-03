import React from "react";
import { Container, Row, Col} from "react-bootstrap";
import SongList from "../components/List/SongList";

export default function UserProfile(props) {
  console.log(props.currentUserData);
  let { id, display_name, images, followers, type, href } =
    props.currentUserData;
  return (
    <Container>
      <Row className="mt-3">
        <Col xs="3">
          <img
            src={images[0]?.url || "no-photo.jpg"}
            className="img-fluid float-start rounded-circle img-thumbnail"
            alt=""
          />
        </Col>
        <Col xs="4">
          <h1 className="fw-bold" style={{ fontFamily: "Montserrat" }}>
            {display_name}
          </h1>
          <p className="lead ffs-6">{followers.total.toLocaleString()} followers on Spotify</p>
        </Col>
      </Row>
      <Row className="mt-5">
        <h3 className="fw-bold">Favorites</h3>
        <SongList
          songs={[
            {
              id: 1,
              name: "Song Name",
              artists: [{ name: "Artist Name" }],
              album: {
                name: "Album Name",
                images: [],
                track_number: 1,
                duration_ms: 10000,
                type: "song",
                preview_url: "",
                popularity: 100,
                href: "",
              },
            },
          ]}
        ></SongList>
      </Row>
    </Container>
  );
}
