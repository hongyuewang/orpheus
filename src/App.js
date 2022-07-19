import "./App.css";
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navigation/Navigation";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Container, Row, Button } from "react-bootstrap";
import axios from "axios";
import qs from "qs";
import { Buffer } from "buffer";

import Discover from "./pages/Discover";
import UserProfile from "./pages/UserProfile";
import Search from "./pages/Search";
import ArtistProfile from "./components/Profiles/ArtistProfile";
import AlbumProfile from "./components/Profiles/AlbumProfile";
import SongProfile from "./components/Profiles/SongProfile";

function App() {
  const CLIENT_ID = "2b8587e1136c463bbacecc73035758af";
  const CLIENT_SECRET = "af3a7aaddda7469896966bf3f21414ab";
  const REDIRECT_URI = "http://localhost:3000";
  //const REDIRECT_URI = "https://orpheus-music.web.app/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "code";

  const [token, setToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [expiresIn, setExpiresIn] = useState(-1);
  const [currentUserData, setCurrentUserData] = useState([]);

  useEffect(() => {
    const hash = window.location.hash;
    const search = window.location.search;
    let token = window.localStorage.getItem("token");
    let refreshToken = window.localStorage.getItem("refreshToken");
    let code = window.localStorage.getItem("code");

    if (!code && search) {
      code = search.substring(1).split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("code", code);
      console.log(code);
    }

    const getAccessToken = async () => {
      const { data } = await axios.post(
        "https://accounts.spotify.com/api/token",
        qs.stringify({
          code: code,
          redirect_uri: REDIRECT_URI,
          grant_type: "authorization_code",
        }),
        {
          headers: {
            Authorization: `Basic ${Buffer.from(
              `${CLIENT_ID}:${CLIENT_SECRET}`
            ).toString("base64")}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      window.localStorage.setItem("token", data.access_token);
      window.localStorage.setItem("refreshToken", data.refresh_token);
      window.localStorage.setItem("expiresIn", data.expires_in);
    };

    if (!token || !refreshToken) {
      getAccessToken();
    }

    setToken(window.localStorage.getItem("token"));
    setRefreshToken(window.localStorage.getItem("refreshToken"));
    setExpiresIn(Number(window.localStorage.getItem("expiresIn")));

    const getCurrentUserData = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCurrentUserData(data);
    };
    getCurrentUserData();
  }, [token, refreshToken]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) {
      return;
    }

    const interval = setInterval(async () => {
      const { data } = await axios.post(
        "https://accounts.spotify.com/api/token",
        qs.stringify({
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        }),
        {
          headers: {
            Authorization: `Basic ${Buffer.from(
              `${CLIENT_ID}:${CLIENT_SECRET}`
            ).toString("base64")}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      window.localStorage.setItem("token", data.access_token);
      window.localStorage.setItem(refreshToken, data.refresh_token);
      window.localStorage.setItem("expiresIn", data.expires_in);
      
      setToken(window.localStorage.getItem("token"));
      setRefreshToken(window.localStorage.getItem("refreshToken"));
      setExpiresIn(Number(window.localStorage.getItem("expiresIn")));

    }, expiresIn * 1000);

    return () => clearInterval(interval)
  }, [refreshToken, expiresIn]);

  if (
    !localStorage.getItem(currentUserData.id) &&
    currentUserData.id != undefined
  ) {
    localStorage.setItem(currentUserData.id, "[]");
  }

  const signout = () => {
    setToken("");
    setRefreshToken("");
    setExpiresIn(-1);
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("refreshToken");
    window.localStorage.removeItem("expiresIn");
    window.location.href = "/";
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
        <Route
          path="/profile"
          element={
            <UserProfile token={token} currentUserData={currentUserData} />
          }
        />
        <Route path="/search" element={<Search token={token} />} />

        <Route
          path="/artists/:id"
          element={
            <ArtistProfile token={token} currentUserData={currentUserData} />
          }
        />
        <Route
          path="/albums/:id"
          element={
            <AlbumProfile token={token} currentUserData={currentUserData} />
          }
        />
        <Route
          path="/songs/:id"
          element={
            <SongProfile token={token} currentUserData={currentUserData} />
          }
        />
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
            <Link to="/profile" className="link">
              View Your Profile
            </Link>
          </button>
        )}
      </div>
    </Container>
  );
};

export default App;
