import ReactPlayer from "react-player";
import { RelatedMovies } from "./components/relatedMovie";
import { useSelector } from "react-redux";

const Detail = () => {
  const movie = useSelector((state: any) => state.movie.selectedMovie);
  if (!movie) {
    return <div>Loading movie details...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row">
        <img
          src={movie.artworkUrl100.replace("100x100", "600x600")}
          alt={movie.trackName}
          className="w-full md:w-1/3 rounded-md mb-4 md:mb-0"
        />
        <div className="md:ml-8">
          <h2 className="text-3xl font-semibold">{movie.trackName}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {movie.primaryGenreName}
          </p>
          <p className="text-md text-gray-800 mt-2 dark:text-gray-200">
            {movie.longDescription}
          </p>
          <p className="text-md text-gray-800 mt-4 dark:text-gray-200">
            <strong>Release Date:</strong>{" "}
            {new Date(movie.releaseDate).toLocaleDateString()}
          </p>
          <p className="text-md text-gray-800 mt-4 dark:text-gray-200">
            <strong>Price:</strong> ${movie.trackPrice}
          </p>
          {movie.previewUrl ? (
            <div className="mt-4">
              <ReactPlayer
                url={movie.previewUrl}
                controls
                className="w-full rounded-md"
              />
            </div>
          ) : (
            <div className="mt-4">Preview not available</div>
          )}
        </div>
      </div>

      <RelatedMovies genre={movie.primaryGenreName} />
    </div>
  );
};

export default Detail;
