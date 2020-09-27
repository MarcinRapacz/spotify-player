import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";

import "../scss/SpotifyLink.scss";

export default function SpotifyLink() {
  return (
    <div className={"SpotifyLink"}>
      <a
        className="SpotifyLink__link"
        href={`${
          process.env.NODE_ENV === "development" ? "http://localhost:5000" : ""
        }/api/spotify/login`}
      >
        Login by Spotify{" "}
        <FontAwesomeIcon className={"SpotifyLink__icon"} icon={faSpotify} />
      </a>
    </div>
  );
}
