import React, { useState, useEffect } from "react";
import { ArtistTable } from "./ArtistTable";
import { ArtistModal } from "./ArtistModal";
import { FilterBar } from "./FilterBar";
import { Artist, FilterOptions1 } from "../types/artist";
import { Loader } from "lucide-react";

const URL = process.env.REACT_APP_BACKEND_URL;
const MainPage: React.FC = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number | undefined>();
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<FilterOptions1>({
    search: "",
    dateRange: {
      start: "",
      end: "",
    },
    ratingRange: {
      min: 0,
      max: 5,
    },
    listenerGrowthRange: {
      min: 0,
      max: 1000000,
    },
    countries: [],
    genres: [],
    labels: [],
    excludePlaylists: false,
    majorLabelsOnly: false,
    sortBy: "dailyListeners",
    sortOrder: "desc",
  });

  // console.log(filters, "filters===");

  const fetchArtists = async (currentPage: Number) => {
    const {
      search,
      dateRange,
      ratingRange,
      listenerGrowthRange,
      countries,
      genres,
      labels,
      sortBy,
      sortOrder,
    } = filters;

    const params: any = {
      page : currentPage,
      limit :10,
      name: search,
      country: countries.join(","), // Assuming countries is an array
      startDate: dateRange.start,
      endDate: dateRange.end,
      minRating: ratingRange.min,
      maxRating: ratingRange.max,
      minListener: listenerGrowthRange.min,
      maxListener: listenerGrowthRange.max,
      genres: genres.join(","), // Assuming genres is an array
      labels: labels.join(","), // Assuming labels is an array
      sortBy,
      sortOrder
    };

    Object.keys(params).forEach((key) =>
      params[key] === undefined ||
      params[key] === "" ||
      params[key].length === 0
        ? delete params[key]
        : {}
    );
    const queryString = new URLSearchParams(params).toString();
    console.log("queryString", queryString);

    try {
      setIsLoading(true);
      const response = await fetch(`${URL}/artists?${queryString}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("artist response=====", response);
      if (!response.ok) {
        throw new Error("Failed to fetch artists");
      }
      const data = await response.json();
      console.log("artist data=====", data.data);
      setArtists(data.data);
      setTotalPages(data?.totalPages);
    } catch (error) {
      console.error("Error fetching artists:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArtists(currentPage);
  }, [filters, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && totalPages && (page <= totalPages)) {
      setCurrentPage(page);
    }
  };

  const handleFilterChange = (newFilters: FilterOptions1) => {
    setFilters(newFilters);
    // Implement filter logic here
  };

  const handleArtistClick = (artist: Artist) => {
    setSelectedArtist(artist);
  };

  const handleEditArtist = (artist: Artist) => {
    // Implement edit logic
    console.log("Edit artist:", artist);
  };

  const handleDeleteArtist = (artistId: string) => {
    // Implement delete logic
    setArtists(artists.filter((artist) => artist.id !== artistId));
  };

  // console.log("MainPage", artists);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Music Artists</h1>
      {/* <ArtistTable artists={artists} /> */}
      <FilterBar filters={filters} onFilterChange={handleFilterChange} />
      <div>
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <Loader className="h-10 w-10 text-indigo-600 animate-spin" />
          </div>
        ) : (
          <ArtistTable
            artists={artists}
            onArtistClick={handleArtistClick}
            onEditArtist={handleEditArtist}
            onDeleteArtist={handleDeleteArtist}
          />
        )}
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          <span className="mx-4">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
      {selectedArtist && (
        <ArtistModal
          artist={selectedArtist}
          onClose={() => setSelectedArtist(null)}
        />
      )}
    </div>
  );
};

export default MainPage;
