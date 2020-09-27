import React, { useContext, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Spotify() {
  const { accessToken, refreshToken } = useParams();
  const { setIsAuth } = useContext(AuthContext);

  useEffect(() => {
    localStorage.setItem("spotify_access_token", `Bearer ${accessToken}`);
    localStorage.setItem("spotify_refresh_token", `${refreshToken}`);
    setIsAuth(true);
    // eslint-disable-next-line
  }, []);

  return <Redirect to="/" />;
}
