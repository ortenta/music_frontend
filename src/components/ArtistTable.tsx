import React from "react";
import { Artist } from "../types/artist";
import { TrendingUp, TrendingDown, MoreHorizontal } from "lucide-react";

interface ArtistTableProps {
  artists: Artist[];
  onArtistClick: (artist: Artist) => void;
  onEditArtist: (artist: Artist) => void;
  onDeleteArtist: (artistId: string) => void;
}

export const ArtistTable: React.FC<ArtistTableProps> = ({
  artists,
  onArtistClick,
  onEditArtist,
  onDeleteArtist,
}) => {
  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Artist
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Listeners
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Labels
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Majors
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Genre
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Rating
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Country
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
          {artists.map((artist) => (
            <tr
              key={artist.id}
              className="hover:bg-gray-50 cursor-pointer dark:hover:bg-gray-700"
              onClick={() => onArtistClick(artist)}
            >
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={
                        artist.photoUrl ||
                        `${"https://cdn.vectorstock.com/i/1000v/66/13/default-avatar-profile-icon-social-media-user-vector-49816613.jpg"}`
                      }
                      alt={artist.name}
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {artist.name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-400">
                {artist?.dailyListeners?.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-normal break-words text-center text-sm text-gray-500 dark:text-gray-400">
                {artist?.labels}
              </td>
              <td className="px-6 py-4 whitespace-normal break-words text-center text-sm text-gray-500 dark:text-gray-400">
                {artist?.majors}
              </td>
              <td className="px-6 py-4 whitespace-normal break-words text-center text-sm text-gray-500 dark:text-gray-400">
                {artist?.genre}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-400">
                {artist?.rating?.toFixed(1)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-400">
                {artist.country}
              </td>
              {/* <td className="px-6 py-4 whitespace-nowrap text-center">
                <div className="flex items-center justify-center">
                  {artist?.listenerTrend && artist?.listenerTrend > 0 ? (
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-500" />
                  )}
                  <span
                    className={`ml-2 text-sm ${
                      artist?.listenerTrend && artist.listenerTrend > 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {artist?.listenerTrend}
                  </span>
                </div>
              </td> */}
              {/* <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                <div className="flex space-x-2 justify-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteArtist(artist.id);
                    }}
                    className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};