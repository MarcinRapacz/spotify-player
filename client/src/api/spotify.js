const apiUrl = "https://api.spotify.com/v1";

const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("spotify_refresh_token");

    const response = await fetch(
      `${
        process.env.NODE_ENV === "development" ? "http://localhost:5000" : ""
      }/api/spotify/refresh/${refreshToken}`
    );

    const body = await response.json();
    localStorage.setItem("spotify_access_token", `Bearer ${body.accessToken}`);
  } catch {
    localStorage.removeItem("spotify_access_token");
    localStorage.removeItem("spotify_refresh_token");
  }
};

export const findTracks = async (query, offset = 0) => {
  try {
    const accessToken = localStorage.getItem("spotify_access_token");
    const response = await fetch(
      `${apiUrl}/search?q=${query}&type=track&offset=${offset}&limit=20`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      }
    );

    if (response.status === 401) {
      await refreshToken(query);
      return findTracks(query, offset);
    }

    const body = await response.json();

    return body.tracks;
  } catch (error) {
    console.log(error);
  }
};
