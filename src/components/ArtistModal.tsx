import React, { useState, useEffect} from 'react';
import { Artist } from '../types/artist';
import { X , Loader, TrendingUp} from 'lucide-react';
import { ArtistAnalyticsGraph } from "./ArtistAnalyticsGraph";

interface ArtistModalProps {
  artist: Artist;
  onClose: () => void;
}

interface ListenerData {
  date: string;
  value: number;
}

const URL = process.env.REACT_APP_BACKEND_URL;

export const ArtistModal: React.FC<ArtistModalProps> = ({ artist, onClose }) => {
  // const [graphData, setGraphData] = useState<ListenerData[]>([]);
  const [ratingGraphData, setRatingGraphData] = useState<ListenerData[]>([]);
  const [listenerGraphData, setListenerGraphData] = useState<ListenerData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  console.log(artist, "artist===");

  const fetchGraphData = async (days?: string) => {
    setLoading(true);
    try {
      const queryParams = days ? `?days=${days}` : "";
      const response = await fetch(
        `${URL}/artists/${artist.artistId}${queryParams}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch graph data");
      }
      const data = await response.json();
      console.log("graph response==========", data);
      setListenerGraphData(data.listenerDynamics);
      setRatingGraphData(data.ratingDynamics);
      // setGraphData(data); // Assuming the API returns an array of numbers
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (artist.artistId) {
      fetchGraphData();
    }
  }, [artist.artistId]);

  const handleTimePeriodChange = (days: string) => {
    fetchGraphData(days);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {artist.name}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img
              src={
                artist.photoUrl ||
                `${"https://cdn.vectorstock.com/i/1000v/66/13/default-avatar-profile-icon-social-media-user-vector-49816613.jpg"}`
              }
              alt={artist.name}
              className="w-full h-42 object-cover rounded-lg"
            />
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {artist.name} Details
              </h3>
              <dl className="mt-2 space-y-2">
                <div>
                  <dt className="text-sm text-gray-500 dark:text-gray-400">
                    Country:
                  </dt>
                  <dd className="text-sm font-medium text-gray-800 dark:text-gray-100">
                    {artist.country}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500 dark:text-gray-400">
                    Rating:
                  </dt>
                  <dd className="text-sm font-medium text-gray-800 dark:text-gray-100">
                    {artist.rating}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500 dark:text-gray-400">
                    Listeners:
                  </dt>
                  <dd className="text-sm font-medium text-gray-800 dark:text-gray-100">
                    {artist.dailyListeners &&
                      artist.dailyListeners.toLocaleString()}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500 dark:text-gray-400">
                    Genre:
                  </dt>
                  <dd className="text-sm break-words font-medium text-gray-800 dark:text-gray-100">
                    {artist?.genre || artist?.majors}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500 dark:text-gray-400">
                    Label:
                  </dt>
                  <dd className="text-sm break-words font-medium text-gray-800 dark:text-gray-100">
                    {artist.labels}
                    {artist.majors && " (Major Label)"}
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200">
                Listener Growth:
              </h3>
              <div
                className={`text-sm font-medium ${
                  artist.listenersGrowth && artist.listenersGrowth >= 0
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {artist?.listenersGrowth}
                {/* <TrendingUp className="w-5 h-5 text-green-500" /> */}
              </div>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="w-8 h-8 animate-spin text-indigo-600 dark:text-indigo-400" />
          </div>
        ) : error ? (
          <div className="text-red-600 dark:text-red-400 text-center py-4">
            {error}
          </div>
        ) : (
          <>
            {ratingGraphData.length > 0 && (
              <div className="mt-6">
                <ArtistAnalyticsGraph
                  data={ratingGraphData}
                  title="Rating Dynamics"
                  type="rating"
                  artistId={artist.artistId}
                  onTimePeriodChange={handleTimePeriodChange}
                />
              </div>
            )}
            {listenerGraphData.length > 0 && (
              <div className="mt-6">
                <ArtistAnalyticsGraph
                  data={listenerGraphData}
                  title="Listener Dynamics"
                  type="listeners"
                  artistId={artist.artistId}
                  onTimePeriodChange={handleTimePeriodChange}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};