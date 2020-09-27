import React, { createContext, useState } from "react";

const TrackContext = createContext();

const TrackProvider = ({ children }) => {
  const [tracks, setTracks] = useState([]);
  const [next, setNext] = useState(false);
  const [track, setTrack] = useState({});

  return (
    <TrackContext.Provider
      value={{ tracks, setTracks, next, setNext, track, setTrack }}
    >
      {children}
    </TrackContext.Provider>
  );
};

export { TrackContext, TrackProvider };
