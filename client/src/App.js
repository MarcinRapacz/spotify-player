import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import { TrackContext } from "./contexts/TrackContext";
import Spotify from "./components/Spotify";
import SpotifyLink from "./components/SpotifyLink";
import InputFilter from "./components/InputFilter";
import TrackList from "./components/TrackList";
import Player from "./components/Player";
import MoreButton from "./components/MoreButton";
import "./App.scss";

function App() {
  const accessToken = localStorage.getItem("spotify_access_token");
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const { next } = useContext(TrackContext);

  useEffect(() => {
    if (accessToken && !isAuth) {
      setIsAuth(true);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <Router>
        {isAuth && <InputFilter />}
        <TrackList />
        {!isAuth && <SpotifyLink />}
        {next && <MoreButton />}
        <Player />

        <Route path="/spotify/:accessToken/:refreshToken" component={Spotify} />
      </Router>
    </div>
  );
}

export default App;
