import React from "react";
import Card from "react-bootstrap/Card";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AlbumList(props) {
  let display = props.albums.map((x) => {
    let { id, name, artists, images, type, album_type, href, total_tracks } = x;
    return (
      <Card
        style={{ width: "10rem", height: "15rem" }}
        className="bg-dark-3 pt-2 ps-2 pe-2 mt-4 mb-4 ms-4 me-4"
        role="listitem"
      >
        <Link
          to={`/albums/${id}`}
          style={{ textDecoration: "none", color: "white" }}
          onClick={() => window.location.href.reload()}
        >
          <Card.Img
            variant="top"
            src={images[0]?.url || "no-photo.jpg"}
            style={{ objectFit: "cover" }}
            alt={`Album cover for ${name}`}
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

              <Link
                to={`/artists/${artists?.[0]?.id}`}
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
                  {artists?.[0]?.name}
                </p>
              </Link>
            </Card.Text>
          </Card.Body>
        </Link>
      </Card>
    );
  });

  return (
    <Container role="list" aria-label="Album list">
      <Row className="align-items-center justify-content-center">{display}</Row>
    </Container>
  );
}
