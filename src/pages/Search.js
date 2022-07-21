import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import AlbumList from "../components/List/AlbumList";
import SongList from "../components/List/SongList";
import ArtistList from "../components/List/ArtistList";

export default function Search(props) {
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  let [queryType, setQueryType] = useState("artist,album,track");

  const searchAll = async (e) => {
    setArtists([]);
    setAlbums([]);
    setSongs([]);
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
      params: {
        q: searchKey,
        type: queryType,
      },
    });

    if (queryType.includes("artist")) {
      setArtists(data?.artists?.items);
    }

    if (queryType.includes("album")) {
      setAlbums(data?.albums?.items);
    }
    if (queryType.includes("track")) {
      setSongs(data?.tracks?.items);
    }
  };

  return (
    <Container>
      <Row>
        <h1 className="text-center mt-3 fw-bold">Search</h1>
        <form
          className="d-flex align-items-center justify-content-center mt-3 mb-5"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            className="form-control"
            placeholder="Artists, albums, or songs"
            onChange={(e) => {
              setSearchKey(e.target.value);
              if (searchKey.length > 0) {
                searchAll(e);
              }
            }}
            type="text"
          />
        </form>
        <div className="d-flex flex-row row mb-5" style={{ width: "60%" }}>
          <button
            type="button"
            className={`btn col ms-5 me-5 col ${
              queryType == "artist,album,track" ? "btn-white" : "btn-dark-3"
            }`}
            onClick={(e) => {
              setQueryType("artist,album,track");
              queryType = "artist,album,track";
              searchAll(e);
            }}
          >
            All
          </button>
          <button
            type="button"
            className={`btn col ms-5 me-5 col ${
              queryType == "artist" ? "btn-white" : "btn-dark-3"
            }`}
            onClick={(e) => {
              setQueryType("artist");
              queryType = "artist";
              searchAll(e);
            }}
          >
            Artists
          </button>
          <button
            type="button"
            className={`btn col ms-5 me-5 col ${
              queryType == "album" ? "btn-white" : "btn-dark-3"
            }`}
            onClick={(e) => {
              setQueryType("album");
              queryType = "album";
              searchAll(e);
            }}
          >
            Albums
          </button>
          <button
            type="button"
            className={`btn col ms-5 me-5 col ${
              queryType == "track" ? "btn-white" : "btn-dark-3"
            }`}
            onClick={(e) => {
              setQueryType("track");
              queryType = "track";
              searchAll(e);
            }}
          >
            Songs
          </button>
        </div>
      </Row>
      {songs.length > 0 && (
        <Row>
          <h3 className="fw-bold">Songs</h3>
        </Row>
      )}
      <Row>
        <SongList songs={songs} currentUserData={props.currentUserData} />
      </Row>
      {albums.length > 0 && (
        <Row>
          <h3 className="fw-bold">Albums</h3>
        </Row>
      )}
      <Row>
        <AlbumList albums={albums} />
      </Row>

      {artists.length > 0 && (
        <Row>
          <h3 className="fw-bold">Artists</h3>
        </Row>
      )}
      <Row>
        <ArtistList artists={artists}></ArtistList>
      </Row>
    </Container>
  );
}
