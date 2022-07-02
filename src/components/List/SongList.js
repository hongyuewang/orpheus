import React from "react";
import Card from "react-bootstrap/Card";
import { Container, Row } from "react-bootstrap";
import AlbumList from "./AlbumList";

export default function SongList(props) {
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
      <div className="d-flex flex-md-row flex-row  justify-content-between gap-3">
        <div className="p-3" style={{ display: "inline" }}>
          <img
            src={album.images[0]?.url || "no-photo.jpg"}
            alt="Album cover"
            className="h-14 w-14 rounded-sm border border-neutral-800"
            width="40px"
            length="40px"
          />
        </div>
        <div className="p-3" style={{ display: "inline", width: "150px", textAlign: "center"}}>
          {name}
        </div>
        <div className="p-3" style={{ display: "inline", width: "150px", textAlign: "left"}}>
          {artists[0].name}
        </div>
        <div className="p-3" style={{ display: "inline", width: "150px", textAlign: "left" }}>
          {album.name}
        </div>
      </div>
    );
  });
  return <Container>
    {props.songs.length > 0 && (<div className="d-flex flex-md-row flex-row  justify-content-between gap-3">
        <div style={{width: "40px", textAlign: "center"}}></div>
        <div style={{width: "150px", fontWeight: "bold", textAlign: "center"}}>Title</div>
        <div style={{width: "150px", fontWeight: "bold", textAlign: "center"}}>Artist</div>
        <div style={{width: "150px", fontWeight: "bold", textAlign: "center"}}>Album</div>   
    </div>)}
    {display}</Container>;
}
