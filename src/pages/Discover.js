import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row } from "react-bootstrap";
import AlbumList from "../components/List/AlbumList";

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
      setNewReleases(data.albums.items);
    };

    getNewReleases();
  });

  return (
    <Container role="main">
      <Row>
        <h1 className="text-center mt-3 fw-bold">Discover</h1>
      </Row>
      <AlbumList albums={newReleases} />
    </Container>
  );
}
