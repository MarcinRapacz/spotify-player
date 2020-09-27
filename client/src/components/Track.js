import React, { useContext } from "react";
import { TrackContext } from "../contexts/TrackContext";
import "../scss/Track.scss";

export default function Track(props) {
  const { track, setTrack } = useContext(TrackContext);

  const handleClick = () => {
    if (track.id === props.track.id) {
      setTrack({});
    } else {
      setTrack(props.track);
    }
  };

  return (
    <div
      className={`Track ${track.id === props.track.id ? "Track--active" : ""}`}
      onClick={handleClick}
    >
      <img
        className={`Track__image`}
        src={props.track.album.image}
        alt={props.track.album.name}
      />
      <h3 className={`Track__albumName`}>{props.track.album.name}</h3>
      <p className={`Track__artistName`}>
        Wykonawca: {props.track.artist.name}
      </p>
    </div>
  );
}
