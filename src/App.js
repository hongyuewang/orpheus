import "./App.css";
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navigation/Navigation";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Container, Row, Button } from "react-bootstrap";
import axios from "axios";

function App() {
  const CLIENT_ID = "2b8587e1136c463bbacecc73035758af";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
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
          <Button
            variant="outline-blue"
            className="home-button"
            style={{ margin: "0 auto", display: "block" }}
            href={`${props.AUTH_ENDPOINT}?client_id=${props.CLIENT_ID}&redirect_uri=${props.REDIRECT_URI}&response_type=${props.RESPONSE_TYPE}`}
          >
            Sign In With Spotify
          </Button>
        ) : (
          <Button
            variant="outline-blue"
            className="home-button"
            style={{ margin: "0 auto", display: "block" }}
          >
            <Link to="profile" className="link">
              View Your Profile
            </Link>
          </Button>
        )}
      </div>
    </Container>
  );
};

export default App;
