import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col} from "react-bootstrap";
import axios from "axios";
import { msToMinutes, msToHourMinutes } from "../../Helper";

export default function AlbumProfile(props) {
  let { id } = useParams();
  let [albumData, setAlbumData] = useState([]);
  let { name, artists, images, type, album_type, href, tracks, total_tracks, release_date } = albumData;

  function getAlbumLength() {
    let lengthInMs = 0;
    for (let i = 0; i < total_tracks; i++) {
      lengthInMs += tracks.items[i].duration_ms;
    }
    //console.log(lengthInMs)
    return lengthInMs >= 3600000 ?  msToHourMinutes(lengthInMs): msToMinutes(lengthInMs);
  }

  useEffect(() => {
    const getAlbum = async () => {
      const { data } = await axios.get(
        `https://api.spotify.com/v1/albums/${id}`,
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        }
      );
      console.log(data);
      setAlbumData(data);
    };

    getAlbum();
  });

  return (
    <Container>
      <Row className="mt-3">
        <Col xs="3">
          <img
            src={images?.[0]?.url || "no-photo.jpg"}
            className="img-fluid float-start"
            alt=""
          />
        </Col>
        <Col xs="4">
            <h5 className="fs-6">{album_type?.toUpperCase()}</h5>
          <h1 className="fw-bold" style={{ fontFamily: "Montserrat" }}>
            {name}
          </h1>
          <p className="lead ffs-6">{artists?.[0]?.name}</p>
        </Col>
      </Row>
      <Container className="mt-5">
        <Row>
            <Col><p className="fw-bold">Release Date</p><p>{release_date}</p></Col>
            <Col><p className="fw-bold">Total Tracks</p><p>{total_tracks}</p></Col>
            <Col><p className="fw-bold">Length</p><p>{getAlbumLength()}</p></Col>
        </Row>
      </Container>
    </Container>
  );
}
