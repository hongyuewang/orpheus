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

  const searchAll = async (e) => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
      params: {
        q: searchKey,
        type: "artist,album,track",
      },
    });
    console.log(data);
    setArtists(data.artists.items);
    setAlbums(data.albums.items);
    setSongs(data.tracks.items);
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
      </Row>
      {songs.length > 0 && (
        <Row>
          <h3 className="fw-bold">Songs</h3>
        </Row>
      )}
      <Row>
        <SongList songs={songs} />
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
