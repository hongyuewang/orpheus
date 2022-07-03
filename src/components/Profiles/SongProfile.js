import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col} from "react-bootstrap";
import axios from "axios";
import { msToMinutes } from "../../Helper";

export default function SongProfile(props) {
  let { id } = useParams();
  let [songData, setSongData] = useState([]);
  let {
    name,
    artists,
    album,
    track_number,
    duration_ms,
    type,
    preview_url,
    popularity,
    href,
  } = songData;

  useEffect(() => {
    const getSong = async () => {
      const { data } = await axios.get(
        `https://api.spotify.com/v1/tracks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        }
      );
      console.log(data);
      setSongData(data);
    };

    getSong();
  });

  return (
    <Container>
      <Row className="mt-3">
        <Col xs="3">
          <img
            src={album?.images[0]?.url || "no-photo.jpg"}
            className="img-fluid float-start"
            alt=""
          />
        </Col>
        <Col xs="4">
            <h5 className="fs-6">SONG</h5>
          <h1 className="fw-bold" style={{ fontFamily: "Montserrat" }}>
            {name}
          </h1>
          <p className="lead ffs-6">{artists?.[0]?.name}</p>
        </Col>
      </Row>
      <Container className="mt-5">
        <Row>
            <Col><p className="fw-bold">Album</p><p>{album?.name}</p></Col>
            <Col><p className="fw-bold">Track Number</p><p>{track_number}</p></Col>
            <Col><p className="fw-bold">Length</p><p>{msToMinutes(duration_ms)}</p></Col>
            <Col><p className="fw-bold">Release Date</p><p>{album?.release_date}</p></Col>
            <Col><p className="fw-bold">Popularity</p><p>{popularity}%</p></Col>
        </Row>
      </Container>
    </Container>
  );
}
