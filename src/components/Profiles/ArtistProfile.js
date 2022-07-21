import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import ArtistList from "../List/ArtistList";
import SongList from "../List/SongList";
import AlbumList from "../List/AlbumList";

export default function ArtistProfile(props) {
  let { id } = useParams();
  let [artistData, setArtistData] = useState([]);
  let [topTracks, setTopTracks] = useState([]);
  let [albums, setAlbums] = useState([]);
  let [recommendations, setRecommendations] = useState([]);
  let { name, genres, images, popularity, followers, type, href } = artistData;

  useEffect(() => {
    const getArtist = async () => {
      const { data } = await axios.get(
        `https://api.spotify.com/v1/artists/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setArtistData(data);
    };

    const getTopTracks = async () => {
      const { data } = await axios.get(
        `https://api.spotify.com/v1/artists/${id}/top-tracks`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: {
            market: "US",
          }
        }
      );
      setTopTracks(data.tracks);
    };
    getTopTracks();

    const getAlbums = async () => {
      const { data } = await axios.get(
        `https://api.spotify.com/v1/artists/${id}/albums`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        }
      );
      setAlbums(data.items);
    };
    getAlbums();

    const getRecommendations = async () => {
      const { data } = await axios.get(
        `https://api.spotify.com/v1/artists/${id}/related-artists`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setRecommendations(data.artists);
    };

    getArtist();
    getRecommendations();
  });

  return (
    <Container>
      <Row className="mt-3">
        <Col xs="3">
          <img
            src={images?.[0]?.url || "no-photo.jpg"}
            className="img-fluid float-start rounded-circle img-thumbnail"
            alt="A photo of the artist"
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
        <Row className="mb-5">
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
      
      {topTracks.length > 0 && (
        <Row>
          <h3 className="fw-bold">Top Tracks</h3>
        </Row>
      )}
        <Row> 
          <SongList songs={topTracks} currentUserData={JSON.parse(localStorage.getItem("currentUserData"))}></SongList>
      </Row>

      {albums.length > 0 && (
        <Row>
          <h3 className="fw-bold">Albums</h3>
        </Row>
      )}
      <Row>
        <AlbumList albums={albums} />
      </Row>

        {recommendations.length > 0 && (
        <Row>
          <h3 className="fw-bold">You May Also Like</h3>
        </Row>
      )}
        <Row> 
        <ArtistList artists={recommendations}></ArtistList>
      </Row>
    </Container>
  );
}
