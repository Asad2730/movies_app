import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { IResult, IData } from "./interface/data";

const Home = () => {
  const [data, setData] = useState<IResult[]>([]);
  const [page, setPage] = useState(1);
  const [view, setView] = useState("grid");
  const [sortBy, setSortBy] = useState("price");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axios.get<IData>("https://itunes.apple.com/search", {
        params: {
          term: "star",
          country: "au",
          media: "movie",
          limit: 10,
          offset: (page - 1) * 10,
        },
      });
      const results = response.data.results;

      if (results.length > 0) {
        setData((prevData) => [...prevData, ...results]);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  }, [page, loading]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (sortBy === "price") {
      setData((prevData) => [...prevData].sort((a, b) => a.trackPrice - b.trackPrice));
    } else if (sortBy === "releaseDate") {
      setData((prevData) => [...prevData].sort((a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()));
    }
  }, [sortBy]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    setData([]);
    setPage(1);
    setHasMore(true);
  };

  const { ref } = useInView({
    triggerOnce: false,
    onChange: (inView) => {
      if (inView && hasMore && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    },
  });

  const handleNavigate = (item: IResult) => {
    navigate("/detail", { state: { movie: item } });
    window.location.reload()
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <div>
          <button
            onClick={() => setView(view === "grid" ? "list" : "grid")}
            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md transition duration-200 transform hover:scale-105"
          >
            {view === "grid" ? "Switch to List View" : "Switch to Grid View"}
          </button>
        </div>
        <div>
          <select
            onChange={handleSortChange}
            value={sortBy}
            className="border p-2 rounded-md bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 transition duration-200"
          >
            <option value="price">Sort by Price</option>
            <option value="releaseDate">Sort by Release Date</option>
          </select>
        </div>
      </div>

      <div className={`grid ${view === "grid" ? "grid-cols-2 md:grid-cols-4" : "grid-cols-1"} gap-4`}>
        {data.map((item) => (
          <div
            key={item.trackId}
            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl dark:bg-gray-800 dark:text-white transition-all duration-300"
            onClick={() => handleNavigate(item)}
          >
            <img
              src={item.artworkUrl100}
              alt={item.trackName}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">{item.trackName}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{item.primaryGenreName}</p>
            <p className="text-md text-gray-800 mt-2 dark:text-gray-200">{`$${item.trackPrice}`}</p>
          </div>
        ))}
      </div>

      {loading && (
        <div className="text-center mt-4">
          <p>Loading...</p>
        </div>
      )}

      <div ref={ref}></div>
    </div>
  );
};

export default Home;
