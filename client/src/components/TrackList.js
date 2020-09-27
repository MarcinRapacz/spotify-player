import React, { useContext } from "react";
import { TrackContext } from "../contexts/TrackContext";
import Track from "./Track";
import "../scss/TrackList.scss";

export default function TrackList() {
  const { tracks } = useContext(TrackContext);

  const filteredTracks = tracks.map((track) => {
    return {
      id: track.id,
      name: track.name,
      preview_url: track.preview_url,
      album: {
        name: track.album.name,
        image: track.album.images[0].url,
        href: track.album.href,
      },
      artist: {
        name: track.artists[0].name,
        href: track.artists[0].href,
      },
    };
  });

  return (
    <div className={`TrackList`}>
      {filteredTracks.map((track) => (
        <Track key={track.id} track={track} />
      ))}
    </div>
  );
}
