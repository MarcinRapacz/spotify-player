import React, { useContext } from "react";
import { TrackContext } from "../contexts/TrackContext";
import * as spotifyAPI from "../api/spotify";
import "../scss/MoreButton.scss";

export default function MoreButton() {
  const { next, setNext, tracks, setTracks } = useContext(TrackContext);

  const handleClick = async () => {
    const url = new URL(next);
    const offset = url.searchParams.get("offset");
    const query = url.searchParams.get("query");

    document.activeElement.blur();

    const newTracks = await spotifyAPI.findTracks(query, offset);

    if (newTracks) {
      setNext(newTracks.next);
      setTracks([...tracks, ...newTracks.items]);
    } else {
      setNext(false);
      setTracks([]);
    }
  };

  return (
    <button className={"MoreButton"} onClick={handleClick}>
      More
    </button>
  );
}
