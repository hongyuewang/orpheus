import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { Container, Row } from "react-bootstrap";
//import AlbumCard from "../components/Cards/AlbumCard";

export default function Discover(props) {
  const [newReleases, setNewReleases] = useState([]);

  useEffect(() => {
    const getNewReleases = async () => {
      const { data } = await axios.get(
        "https://api.spotify.com/v1/browse/new-releases",
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        }
      );
      console.log(data.albums.items);
      setNewReleases(data.albums.items);
    };

    getNewReleases();
  });

  let display;

  if (newReleases) {
    display = newReleases.map((x) => {
      let { id, name, artists, images, type, albumType, href, total_tracks } =
        x;
      return (
        <Card
          style={{ width: "10rem", height: "15rem" }}
          className="bg-dark-3 pt-2 ps-2 pe-2 mt-4 mb-4 ms-4 me-4"
        >
          <Link
            to={`albums/${id}`}
            style={{ textDecoration: "none", color: "white" }}
          >
            <Card.Img
              variant="top"
              src={images[0].url}
              style={{ objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Text>
                <p
                  style={{
                    fontSize: "1em",
                    fontWeight: "bold",
                    fontFamily: "Montserrat",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {name}
                </p>

                <Link
                  to={`artists/${artists[0].id}`}
                  style={{ textDecoration: "none", color: "#B3B3B3" }}
                >
                  <p
                    style={{
                      fontSize: "0.75em",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {artists[0].name}
                  </p>
                </Link>
              </Card.Text>
            </Card.Body>
          </Link>
        </Card>
      );
    });
  } else {
    display = "No new releases!";
  }

  return (
    <Container>
      <Row>
        <h1 className="text-center mt-3 fw-bold">Discover</h1>
      </Row>
      <Row className="align-items-center justify-content-center">{display}</Row>
    </Container>
  );
}
