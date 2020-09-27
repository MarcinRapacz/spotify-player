import React, { useContext, useState } from "react";
import { TrackContext } from "../contexts/TrackContext";
import * as spotifyAPI from "../api/spotify";
import "../scss/InputFilter.scss";

export default function InputFilter() {
  const { setTracks, setNext } = useContext(TrackContext);
  const [active, setActive] = useState(false);

  const handleChange = async (e) => {
    const { value } = e.target;

    setActive(!!value);

    if (value && value.length >= 3) {
      const tracks = await spotifyAPI.findTracks(value);

      if (tracks) {
        setNext(tracks.next);
        setTracks(tracks.items);
      } else {
        setNext(false);
        setTracks([]);
      }

      return;
    }

    setNext(false);
    setTracks([]);
  };

  return (
    <input
      className={`InputFilter ${active ? "InputFilter--active" : ""}`}
      type="text"
      onChange={handleChange}
      placeholder={"Find track ..."}
    />
  );
}
