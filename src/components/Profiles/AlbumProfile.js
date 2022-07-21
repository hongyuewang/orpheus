import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import SongList from "../List/SongList";
import AlbumList from "../List/AlbumList";
import { msToMinutes, msToHourMinutes } from "../../Helper";
import { Link } from "react-router-dom";

export default function AlbumProfile(props) {
  let { id } = useParams();
  let [albumData, setAlbumData] = useState([]);
  let [recommendations, setRecommendations] = useState([]);
  let {
    name,
    artists,
    images,
    type,
    album_type,
    href,
    tracks,
    total_tracks,
    release_date,
  } = albumData;

  function getAlbumLength() {
    let lengthInMs = 0;
    for (let i = 0; i < total_tracks; i++) {
      lengthInMs += tracks.items[i].duration_ms;
    }
    return lengthInMs >= 3600000
      ? msToHourMinutes(lengthInMs)
      : msToMinutes(lengthInMs);
  }

  useEffect(() => {
    const getAlbum = async () => {
      const { data } = await axios.get(
        `https://api.spotify.com/v1/albums/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setAlbumData(data);
    };

    getAlbum();
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
            seed_artists: artists?.[0]?.id,
          },
        }
      );
      let arr = data.tracks.map((track) => track.album);
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
  }, [artists]);

  return (
    <Container>
      <Row className="mt-3">
        <Col xs="3">
          <img
            src={images?.[0]?.url || "no-photo.jpg"}
            className="img-fluid float-start"
            alt="Album cover"
          />
        </Col>
        <Col xs="4">
          <h5 className="fs-6">{album_type?.toUpperCase()}</h5>
          <h1 className="fw-bold" style={{ fontFamily: "Montserrat" }}>
            {name}
          </h1>
          <Link
            to={`/artists/${artists?.[0].id}`}
            style={{ textDecoration: "none", color: "white" }}
          >
            <p className="lead ffs-6">{artists?.[0]?.name}</p>
          </Link>
        </Col>
      </Row>
      <Container className="mt-5">
        <Row>
          <Col>
            <p className="fw-bold">Release Date</p>
            <p>{release_date}</p>
          </Col>
          <Col>
            <p className="fw-bold">Total Tracks</p>
            <p>{total_tracks}</p>
          </Col>
          <Col>
            <p className="fw-bold">Length</p>
            <p>{getAlbumLength()}</p>
          </Col>
        </Row>
      </Container>
      <Row className="mt-5">
        <h3 className="fw-bold">Track List</h3>
        <SongList
          songs={tracks?.items}
          albumCover={images?.[0]?.url}
          albumName={name}
          currentUserData={JSON.parse(localStorage.getItem("currentUserData"))}
        />
      </Row>

      {recommendations.length > 0 && (
        <Row>
          <h3 className="fw-bold">You May Also Like</h3>
        </Row>
      )}
      <Row>
        <AlbumList albums={recommendations} />
      </Row>
    </Container>
  );
}
