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
      )?.length > 0
        ? storageStringToArray(
            localStorage.getItem(props.currentUserData.id)
          )?.find((x) => x?.id == id)
        : undefined;
    };

    const [songSearch, setSongSearch] = useState();

    useEffect(() => {
      (() => {
        setSongSearch(search());
      })();
    }, [songSearch]);

    function addSongToFavorites(x) {
      let favorites = storageStringToArray(
        localStorage.getItem(props.currentUserData.id)
      );

      if (!favorites.some((y) => y?.id == x?.id)) {
        favorites.push(x);
      }
      localStorage.setItem(
        props.currentUserData.id,
        arrayToStorageString(favorites)
      );
      setSongSearch(search());
    }

    function removeSongFromFavorites(x) {
      let favorites = storageStringToArray(
        localStorage.getItem(props.currentUserData.id)
      );
      favorites.splice(
        favorites.findIndex((y) => y?.id == x?.id),
        1
      );
      localStorage.setItem(
        props.currentUserData.id,
        arrayToStorageString(favorites)
      );
      setSongSearch(search());
    }

    return (
      <div
        className="d-inline-block row justify-content-between gap-3 mb-5"
        role="listitem"
      >
        <div
          className="me-5"
          style={{ display: "inline-block", width: "40px" }}
        >
          <img
            src={album?.images[0]?.url || props.albumCover || "no-photo.jpg"}
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
          to={`/albums/${album?.id}`}
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
            {album?.name || props.albumName}
          </div>
        </Link>
        <div
          className="me-5"
          style={{ display: "inline-block", width: "20px", textAlign: "left" }}
          onClick={props.customClickEvent}
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
  let display = props.songs?.map((x) => {
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
  });
  return (
    <Container role="list" aria-label="Song list">
      {props.songs?.length > 0 && (
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
