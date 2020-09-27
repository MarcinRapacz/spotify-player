require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const qs = require("qs");
const publicPath = require("path").join(__dirname, "client", "build");

const app = express();
app.use(cors());

const {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_SECRET_ID,
  SPOTIFY_REDIRECT_URL,
  CLIENT_URL,
  PORT,
} = process.env;
const spotifyURL = "https://accounts.spotify.com";
const spotifyGetCodeURL = `${spotifyURL}/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${SPOTIFY_REDIRECT_URL}&scope=user-modify-playback-state`;

app.get("/api/spotify/login", (req, res) => {
  res.redirect(spotifyGetCodeURL);
});

app.get("/api/spotify/refresh/:refreshToken", async (req, res) => {
  const { refreshToken } = req.params;
  const base64Id = Buffer.from(
    `${SPOTIFY_CLIENT_ID}:${SPOTIFY_SECRET_ID}`
  ).toString("base64");

  const response = await axios({
    method: "post",
    url: `${spotifyURL}/api/token`,
    data: qs.stringify({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    headers: {
      Authorization: `Basic ${base64Id}`,
      "content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  });

  res.status(200).json({ accessToken: response.data.access_token });
});

app.get("/api/spotify/callback", async (req, res) => {
  const code = req.query.code;
  const base64Id = Buffer.from(
    `${SPOTIFY_CLIENT_ID}:${SPOTIFY_SECRET_ID}`
  ).toString("base64");

  const response = await axios({
    method: "post",
    url: `${spotifyURL}/api/token`,
    data: qs.stringify({
      grant_type: "authorization_code",
      code,
      redirect_uri: SPOTIFY_REDIRECT_URL,
    }),
    headers: {
      Authorization: `Basic ${base64Id}`,
      "content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  });

  res.redirect(
    `${CLIENT_URL}/spotify/${response.data.access_token}/${response.data.refresh_token}`
  );
});

app.use(express.static(publicPath));
app.get("*", (req, res) => {
  res.sendFile(publicPath + "/index.html");
});

app.listen(PORT, () => {
  console.log(`App listening at:${PORT}`);
});
