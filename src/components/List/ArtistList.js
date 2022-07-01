import React from "react";
import Card from "react-bootstrap/Card";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ArtistList(props) {
  let display = props.artists.map((x) => {
    let { id, name, genre, images, popularity, type, href } = x;

    return (
      <Card
        style={{ width: "10rem", height: "15rem" }}
        className="bg-dark-3 pt-2 ps-2 pe-2 mt-4 mb-4 ms-4 me-4"
      >
        <Link
          to={`artists/${id}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          <Card.Img
            variant="top"
            src={images[0]?.url || "no-photo.jpg"}
            className="rounded-circle"
            style={{ objectFit: "cover" }}
          />
          <Card.Body>
            <Card.Text>
              <p
                style={{
                  fontSize: "0.85em",
                  fontWeight: "bold",
                  fontFamily: "Montserrat",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {name}
              </p>
            </Card.Text>
          </Card.Body>
        </Link>
      </Card>
    );
  });
  return (
    <Container>
      <Row className="align-items-center justify-content-center">{display}</Row>
    </Container>
  );
}
