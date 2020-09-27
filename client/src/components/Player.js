import React, { useContext, useRef, useEffect } from "react";
import { TrackContext } from "../contexts/TrackContext";
import "../scss/Player.scss";

export default function Player() {
  const player = useRef();
  const { track, setTrack } = useContext(TrackContext);

  const handleEnded = () => {
    setTrack({});
  };

  useEffect(() => {
    player.current.load();
  }, [track.id]);

  return (
    <div
      className={`Player ${track.id ? "Player--active" : ""}`}
      onClick={handleEnded}
    >
      {track && (
        <p className="Player__info">
          <span>{track.artist?.name}</span> - {track.name}
        </p>
      )}
      <audio
        className={`Player__audio ${
          track.preview_url ? "" : "Player__audio--hide"
        }`}
        ref={player}
        controls
        autoPlay
        onEnded={handleEnded}
      >
        <source src={track.preview_url} />
        Your browser does not support the audio tag.
      </audio>
    </div>
  );
}
