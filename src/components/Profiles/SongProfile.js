import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { msToMinutes } from "../../Helper";
import SongList from "../List/SongList";
import { Link } from "react-router-dom";

export default function SongProfile(props) {
  let { id } = useParams();
  let [songData, setSongData] = useState([]);
  let [recommendations, setRecommendations] = useState([]);

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
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSongData(data);
    };

    getSong();
  }, []);

  useEffect(() => {
    const getRecommendations = async () => {
      const { data } = await axios.get(
        `https://api.spotify.com/v1/recommendations`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: {
            seed_tracks: id,
          },
        }
      );
      let arr = data.tracks;
      arr = arr.filter(
        (value, index, self) =>
          index === self.findIndex((x) => x.id === value.id)
      );
      arr.splice(
        arr.findIndex((x) => x?.id == id),
        1
      );
      setRecommendations(arr);
    };
    getRecommendations();
  }, [id]);

  return (
    <Container>
      <Row className="mt-3">
        <Col xs="3">
          <img
            src={album?.images[0]?.url || "no-photo.jpg"}
            className="img-fluid float-start"
            alt="Album cover"
          />
        </Col>
        <Col xs="4">
          <h5 className="fs-6">SONG</h5>
          <h1 className="fw-bold" style={{ fontFamily: "Montserrat" }}>
            {name}
          </h1>

          <Link
          to={`/artists/${artists?.[0].id}`}
          style={{ textDecoration: "none", color: "white" }}
        ><p className="lead ffs-6">{artists?.[0]?.name}</p></Link>
        </Col>
      </Row>
      <Container className="mt-5">
        <Row className="mb-5">
          <Col>
            <p className="fw-bold">Album</p>
            
        <Link
          to={`/albums/${album?.id}`}
          style={{ textDecoration: "none", color: "white" }}
        ><p>{album?.name}</p></Link>
          </Col>
          <Col>
            <p className="fw-bold">Track Number</p>
            <p>{track_number}</p>
          </Col>
          <Col>
            <p className="fw-bold">Length</p>
            <p>{msToMinutes(duration_ms)}</p>
          </Col>
          <Col>
            <p className="fw-bold">Release Date</p>
            <p>{album?.release_date}</p>
          </Col>
          <Col>
            <p className="fw-bold">Popularity</p>
            <p>{popularity}%</p>
          </Col>
        </Row>
      </Container>

      {recommendations?.length > 0 && (
        <Row>
          <h3 className="fw-bold">You May Also Like</h3>
        </Row>
      )}
      <Row>
        <SongList
          songs={recommendations}
          currentUserData={localStorage.getItem("currentUserData")}
        />
      </Row>
    </Container>
  );
}
