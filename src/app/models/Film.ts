export interface Film {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[]; // From initial response
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;

  // Additional fields from detailed response
  belongs_to_collection?: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  } | null;
  budget?: number;
  genres?: { id: number; name: string }[]; // Array of genre objects
  homepage?: string;
  imdb_id?: string;
  origin_country?: string[]; // Array of country codes
  production_companies?: {
    id: number;
    name: string;
    logo_path?: string;
    origin_country: string;
  }[];
  production_countries?: { iso_3166_1: string; name: string }[];
  revenue?: number;
  runtime?: number;
  spoken_languages?: { iso_639_1: string; name: string }[];
  status?: string;
  tagline?: string;
}
