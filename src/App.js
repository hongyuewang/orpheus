import "./App.css";
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navigation/Navigation";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Container, Row, Button } from "react-bootstrap";
import axios from "axios";

import Discover from "./pages/Discover";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import ArtistProfile from "./components/Profiles/ArtistProfile";
import AlbumProfile from "./components/Profiles/AlbumProfile";
import SongProfile from "./components/Profiles/SongProfile";

function App() {
  const CLIENT_ID = "2b8587e1136c463bbacecc73035758af";
  const REDIRECT_URI = "http://localhost:3000";
  //const REDIRECT_URI = "https://orpheus-music.web.app/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");
  const [currentUserData, setCurrentUserData] = useState([]);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);

    const getCurrentUserData = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCurrentUserData(data);
    };
    getCurrentUserData();
  }, []);

  const signout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  return (
    <Router>
      <div className="App">
        <Navbar
          token={token}
          signout={signout}
          currentUserData={currentUserData}
        />
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <Home
              CLIENT_ID={CLIENT_ID}
              REDIRECT_URI={REDIRECT_URI}
              AUTH_ENDPOINT={AUTH_ENDPOINT}
              RESPONSE_TYPE={RESPONSE_TYPE}
              token={token}
              signout={signout}
            />
          }
        />
        <Route path="/discover" element={<Discover token={token} />} />
        <Route path="/profile" element={<Profile token={token} />} />
        <Route path="/search" element={<Search token={token} />} />

        <Route path="/artists/:id" element={<ArtistProfile token={token} />} />
        <Route path="/albums/:id" element={<AlbumProfile token={token} />} />
        <Route path="/songs/:id" element={<SongProfile token={token} />} />
      </Routes>
    </Router>
  );
}

const Home = (props) => {
  return (
    <Container>
      <Row className="container home-title d-flex align-items-center justify-content-center">
        <Row>
          <h1 className="text-blue logo mt-5 mb-2">Orpheus</h1>
        </Row>
        <Row>
          <p className="lead mb-5">Learn about the music you love.</p>
        </Row>
      </Row>

      <div>
        {!props.token ? (
          <a
            href={`${props.AUTH_ENDPOINT}?client_id=${props.CLIENT_ID}&redirect_uri=${props.REDIRECT_URI}&response_type=${props.RESPONSE_TYPE}`}
            style={{ textDecoration: "none" }}
          >
            <button
              className="home-button btn btn-outline-blue"
              style={{ margin: "0 auto", display: "block" }}
            >
              Sign In With Spotify
            </button>
          </a>
        ) : (
          <button
            className="home-button btn btn-outline-blue"
            style={{ margin: "0 auto", display: "block" }}
          >
            <Link to="profile" className="link">
              View Your Profile
            </Link>
          </button>
        )}
      </div>
    </Container>
  );
};

export default App;
