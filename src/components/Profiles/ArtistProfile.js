import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";

export default function ArtistProfile(props) {
  let { id } = useParams();
  let [artistData, setArtistData] = useState([]);
  let { name, genres, images, popularity, followers, type, href } = artistData;

  useEffect(() => {
    const getArtist = async () => {
      const { data } = await axios.get(
        `https://api.spotify.com/v1/artists/${id}`,
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        }
      );
      console.log(data);
      setArtistData(data);
    };

    getArtist();
  });

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
          <h5 className="fs-6">ARTIST</h5>
          <h1 className="fw-bold" style={{ fontFamily: "Montserrat" }}>
            {name}
          </h1>
          <p className="lead ffs-6">
            {followers?.total.toLocaleString()} followers on Spotify
          </p>
        </Col>
      </Row>
      <Container className="mt-5">
        <Row>
          <Col>
            <p className="fw-bold">Genres</p>
            {genres?.map((txt, index) => (
              <span>
                {txt}
                {index === genres.length - 1 ? "" : ", "}
              </span>
            ))}
          </Col>
          <Col>
            <p className="fw-bold">Popularity</p>
            <p>{popularity}%</p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
