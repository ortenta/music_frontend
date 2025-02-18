// export interface Artist {
//     id: number;
//     name: string;
//     photo: string;
//     country: string;
//     rating: number;
//     monthlyListeners: number;
//     trend: "growth" | "decline";
//   }

export interface Artist {
  id: string;
  artistId: string;
  name: string;
  photoUrl?: string;
  country?: string;
  rating?: number;
  dailyListeners?: number;
  listenerTrend?: number; // Percentage change
  genre?: string[];
  labels?: string;
  majors?: string;
  createdAt?: string;
  listenersGrowth?: number;
}

export interface FilterOptions {
  search: string;
  dateRange: {
    start: string;
    end: string;
  };
  ratingRange: {
    min: number;
    max: number;
  };
  countries: string[];
  genres: string[];
  labels: string[];
}

export interface FilterOptions1 {
  search: string;
  dateRange: {
    start: string;
    end: string;
  };
  ratingRange: {
    min: number;
    max: number;
  };
  listenerGrowthRange: {
    min: number;
    max: number;
  };
  countries: string[];
  genres: string[];
  labels: string[];
  majorLabelsOnly: boolean;
  excludePlaylists: boolean;
  sortBy?: "dailyListeners" | "country" | "genre" | "rating" | "listenerGrowth";
  sortOrder?: "asc" | "desc";
}
