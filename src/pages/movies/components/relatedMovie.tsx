import { useEffect, useState } from 'react';
import axios from 'axios';
import { IResult } from '../interface/data';

export const RelatedMovies = ({ genre }: any) => {
  const [relatedMovies, setRelatedMovies] = useState<IResult[]>([]);

  const fetchRelatedMovies = async () => {
    if (genre) {
      try {
        const res = await axios.get(`https://itunes.apple.com/search`, {
          params: {
            term: genre,
            country: 'au',
            media: 'movie',
            limit: 5,
          },
        });
        setRelatedMovies(res.data.results);
      } catch (error) {
        console.error('Error fetching related movies:', error);
      }
    }
  };

  useEffect(() => {
    fetchRelatedMovies();
  }, [genre]);

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold">Related Movies</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {relatedMovies.map((movie) => (
          <div key={movie.trackId} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <img
              src={movie.artworkUrl100}
              alt={movie.trackName}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h4 className="text-lg font-semibold">{movie.trackName}</h4>
            <p className="text-sm text-gray-600">{movie.primaryGenreName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
