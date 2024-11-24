import React, { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IResult } from "./interface/data";
import { setSelectedMovie } from "../../store/movieSlice";
import { MoviesList } from "./components/moviesList";
import {  GetFavorite } from "./api/request";
import { HeaderNavigation } from "./components/headerNavigation";

const Favorites = () => {
  const token = useSelector((state: any) => state.auth.token);
  const [data, setData] = useState<IResult[]>([]);
  const [page, setPage] = useState(1);
  const [view, setView] = useState("grid");
  const [sortBy, setSortBy] = useState("price");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loadMovies = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);
    try {
      const results = await GetFavorite(token, page);

      if (results.length === 0) {
        setHasMore(false);
      } else {
        setData((prevData) => [...prevData, ...results]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (err) {
      setError("Failed to load movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore, token]);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortKey = e.target.value;
    setSortBy(sortKey);

    const sortedData = [...data].sort((a, b) =>
      sortKey === "price"
        ? a.trackPrice - b.trackPrice
        : new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
    );

    setData(sortedData);
  };

  const handleNavigate = (item: IResult) => {
    dispatch(setSelectedMovie(item));
    navigate("/detail");
  };

  const { ref } = useInView({
    onChange: (inView) => {
      if (inView && hasMore && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    },
  });

  return (
    <div className="container mx-auto p-4">
      <HeaderNavigation />
      <div className="flex flex-wrap justify-between items-center mb-4 gap-4 mt-4">
        <button
          onClick={() => setView(view === "grid" ? "list" : "grid")}
          className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md transition duration-200 w-full sm:w-auto"
        >
          {view === "grid" ? "Switch to List View" : "Switch to Grid View"}
        </button>
        <select
          onChange={handleSortChange}
          value={sortBy}
          className="border p-2 rounded-md bg-gray-100 text-gray-700 w-full sm:w-auto"
          aria-label="Sort Movies"
        >
          <option value="price">Sort by Price</option>
          <option value="releaseDate">Sort by Release Date</option>
        </select>
      </div>

      {error && (
        <div className="text-center text-red-600 my-4">
          <p>{error}</p>
        </div>
      )}

      <MoviesList
        data={data}
        handleNavigate={handleNavigate}
       
        view={view}
      />

      {loading && (
        <div className="text-center mt-4">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p>Loading...</p>
        </div>
      )}
      <div ref={ref} aria-hidden="true"></div>
    </div>
  );
};

export default Favorites;
