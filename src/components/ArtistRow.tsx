import React from "react";
import { Artist } from "../types/artist";

interface ArtistRowProps {
  artist: Artist;
}

const ArtistRow: React.FC<ArtistRowProps> = ({ artist }) => {
  const trendClass =
  artist?.listenerTrend && artist?.listenerTrend >= 4 ? "text-green-500" : "text-red-500";

  return (
    <tr>
      <td className="border border-gray-300 p-2">
        <img
          src={artist.photoUrl}
          alt={`${artist.name}'s avatar`}
          className="w-10 h-10 rounded-full"
        />
      </td>
      <td className="border border-gray-300 p-2">{artist.name}</td>
      <td className="border border-gray-300 p-2">{artist.country}</td>
      <td className="border border-gray-300 p-2">{artist.rating}</td>
      <td className="border border-gray-300 p-2">{artist.dailyListeners}</td>
      <td className={`border border-gray-300 p-2 font-bold ${trendClass}`}>
        {artist?.listenerTrend && artist.listenerTrend >= 4
          ? "↑ Growth"
          : "↓ Decline"}
      </td>
    </tr>
  );
};

export default ArtistRow;
