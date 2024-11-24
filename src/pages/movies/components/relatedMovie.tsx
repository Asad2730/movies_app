import { useEffect, useState } from "react";
import axios from "axios";
import { IResult } from "../interface/data";

export const RelatedMovies = ({ genre }: { genre: string }) => {
  const [relatedMovies, setRelatedMovies] = useState<IResult[]>([]);

  useEffect(() => {
    const fetchRelatedMovies = async () => {
      if (genre) {
        try {
          const res = await axios.get(`https://itunes.apple.com/search`, {
            params: {
              term: genre,
              country: "au",
              media: "movie",
              limit: 5,
            },
          });
          setRelatedMovies(res.data.results);
        } catch (error) {
          console.error("Error fetching related movies:", error);
        }
      }
    };

    fetchRelatedMovies();
  }, [genre]);

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Related Movies
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {relatedMovies.map((movie) => (
          <div
            key={movie.trackId}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center"
          >
            <img
              src={movie.artworkUrl100.replace("100x100", "600x600")}
              alt={movie.trackName}
              className="w-full h-40 sm:h-48 object-cover rounded-md mb-4 shadow-md hover:scale-105 transform transition-transform duration-300"
            />
            <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 truncate">
              {movie.trackName}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {movie.primaryGenreName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
