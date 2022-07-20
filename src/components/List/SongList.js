import React from "react";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { arrayToStorageString, storageStringToArray } from "../../Helper";
import { useState, useEffect } from "react";

library.add(fas, far);

export default function SongList(props) {
  const Song = ({
    id,
    name,
    artists,
    album,
    track_number,
    duration_ms,
    type,
    preview_url,
    popularity,
    href,
  }) => {
    const song = {
      id: id,
      name: name,
      artists: artists,
      album: album,
      track_number: track_number,
      duration_ms: duration_ms,
      type: type,
      preview_url: preview_url,
      popularity: popularity,
      href: href,
    };

    let search = () => {
      return storageStringToArray(
        localStorage.getItem(props.currentUserData.id)
      ).length > 0
        ? storageStringToArray(
            localStorage.getItem(props.currentUserData.id)
          )?.find((x) => x?.id == id)
        : undefined;
    };

    const [songSearch, setSongSearch] = useState(search());

    useEffect(() => {
      (() => {
        setSongSearch(search());
      })();
    }, [search]);

    function addSongToFavorites(x) {
      let favorites = storageStringToArray(
        localStorage.getItem(props.currentUserData.id)
      );
      favorites.push(x);
      localStorage.setItem(
        props.currentUserData.id,
        arrayToStorageString(favorites)
      );
      console.log("fav:" + x);
    }

    function removeSongFromFavorites(x) {
      let favorites = storageStringToArray(
        localStorage.getItem(props.currentUserData.id)
      );
      favorites.splice(favorites.indexOf(x), 1);
      localStorage.setItem(
        props.currentUserData.id,
        arrayToStorageString(favorites)
      );
    }

    return (
      <div className="d-inline-block row justify-content-between gap-3 mb-5">
        <div
          className="me-5"
          style={{ display: "inline-block", width: "40px" }}
        >
          <img
            src={album.images[0]?.url || "no-photo.jpg"}
            alt="Album cover"
            className="h-14 w-14 rounded-sm border border-neutral-800"
            width="40px"
            length="40px"
          />
        </div>
        <Link
          to={`/songs/${id}`}
          style={{ textDecoration: "none", color: "white" }}
          key={id}
        >
          <div
            className="me-5"
            style={{
              display: "inline-block",
              width: "250px",
              minWidth: "0",
              textAlign: "left",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {name}
          </div>
        </Link>
        <Link
          to={`/artists/${artists[0].id}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          <div
            className="me-5"
            style={{
              display: "inline-block",
              width: "250px",
              textAlign: "left",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {artists[0].name}
          </div>
        </Link>

        <Link
          to={`/albums/${album.id}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          <div
            className="me-5"
            style={{
              display: "inline-block",
              width: "250px",
              textAlign: "left",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {album.name}
          </div>
        </Link>
        <div
          className="me-5"
          style={{ display: "inline-block", width: "20px", textAlign: "left" }}
        >
          {songSearch != undefined ? (
            <FontAwesomeIcon
              icon="fa-solid fa-heart"
              onClick={() => {
                removeSongFromFavorites(song);
              }}
            />
          ) : (
            <FontAwesomeIcon
              icon="fa-regular fa-heart"
              onClick={() => {
                addSongToFavorites(song);
              }}
            />
          )}
        </div>
      </div>
    );
  };
  let display = props.songs.map((x) => {
    let {
      id,
      name,
      artists,
      album,
      track_number,
      duration_ms,
      type,
      preview_url,
      popularity,
      href,
    } = x;

    return (
      <Song
        key={id}
        id={id}
        name={name}
        artists={artists}
        album={album}
        track_number={track_number}
        duration_ms={duration_ms}
        type={type}
        preview_url={preview_url}
        popularity={popularity}
        href={href}
      />
    );

    /*let songSearch = storageStringToArray(localStorage.getItem(props.currentUserData.id)).length > 0 ? storageStringToArray(localStorage.getItem(props.currentUserData.id))?.find(x => x?.id == id) : undefined;


    function addSongToFavorites() {
      let favorites = storageStringToArray(localStorage.getItem(props.currentUserData.id));
      favorites.push(x);
      localStorage.setItem(props.currentUserData.id, arrayToStorageString(favorites));
    }

    function removeSongFromFavorites() {
      let favorites = storageStringToArray(localStorage.getItem(props.currentUserData.id));
      favorites.splice(favorites.indexOf(x), 1);
      localStorage.setItem(props.currentUserData.id, arrayToStorageString(favorites));
    }

    return (
      <div className="d-inline-block row justify-content-between gap-3 mb-5">
        <div
          className="me-5"
          style={{ display: "inline-block", width: "40px" }}
        >
          <img
            src={album.images[0]?.url || "no-photo.jpg"}
            alt="Album cover"
            className="h-14 w-14 rounded-sm border border-neutral-800"
            width="40px"
            length="40px"
          />
        </div>
        <Link
          to={`/songs/${id}`}
          style={{ textDecoration: "none", color: "white" }}
          key={id}
        >
          <div
            className="me-5"
            style={{
              display: "inline-block",
              width: "250px",
              minWidth: "0",
              textAlign: "left",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {name}
          </div>
        </Link>
        <Link
          to={`/artists/${artists[0].id}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          <div
            className="me-5"
            style={{
              display: "inline-block",
              width: "250px",
              textAlign: "left",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {artists[0].name}
          </div>
        </Link>

        <Link
          to={`/albums/${album.id}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          <div
            className="me-5"
            style={{
              display: "inline-block",
              width: "250px",
              textAlign: "left",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {album.name}
          </div>
        </Link>
        <div
          className="me-5"
          style={{ display: "inline-block", width: "20px", textAlign: "left" }}
        >
          {songSearch != undefined ? (<FontAwesomeIcon icon="fa-solid fa-heart" onClick={removeSongFromFavorites}/>): (<FontAwesomeIcon icon="fa-regular fa-heart" onClick={addSongToFavorites}/>)
          }
        </div>
      </div>
    );*/
  });
  return (
    <Container>
      {props.songs.length > 0 && (
        <div className="d-inline-block row justify-content-between gap-3 mb-3">
          <div
            className="me-5"
            style={{
              display: "inline-block",
              width: "40px",
              textAlign: "left",
            }}
          ></div>
          <div
            className="me-5"
            style={{
              display: "inline-block",
              width: "250px",
              fontWeight: "bold",
              textAlign: "left",
            }}
          >
            Title
          </div>
          <div
            className="me-5"
            style={{
              display: "inline-block",
              width: "250px",
              fontWeight: "bold",
              textAlign: "left",
            }}
          >
            Artist
          </div>
          <div
            className="me-5"
            style={{
              display: "inline-block",
              width: "250px",
              fontWeight: "bold",
              textAlign: "left",
            }}
          >
            Album
          </div>
          <div
            className="me-5"
            style={{
              display: "inline-block",
              width: "20px",
              textAlign: "center",
            }}
          ></div>
        </div>
      )}
      <br></br>
      {display}
    </Container>
  );
}
