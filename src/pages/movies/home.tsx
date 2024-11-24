import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IResult, IData } from "./interface/data";
import { setSelectedMovie } from "../../store/movieSlice";
import { ip } from "../../util/helper";


const Home = () => {
  const [data, setData] = useState<IResult[]>([]);
  const [page, setPage] = useState(1);
  const [view, setView] = useState("grid");
  const [sortBy, setSortBy] = useState("price");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await axios.get<IData>(
        "https://itunes.apple.com/search",
        {
          params: {
            term: "star",
            country: "au",
            media: "movie",
            limit: 10,
            offset: (page - 1) * 10,
          },
        }
      );

      const results = response.data.results;

      if (results.length === 0) {
        setHasMore(false);
      } else {
        setData((prevData) => [...prevData, ...results]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    const sortedData = [...data].sort((a, b) =>
      e.target.value === "price"
        ? a.trackPrice - b.trackPrice
        : new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
    );
    setData(sortedData);
  };

  const handleNavigate = (item: IResult) => {
    dispatch(setSelectedMovie(item));
    navigate("/detail");
    window.location.reload();
  };

  const { ref } = useInView({
    onChange: (inView) => {
      if (inView && hasMore && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    },
  });

  const token = useSelector((state:any)=>state.auth.token)
  const addToFavorite = async (item: IResult) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
       
      const res = await axios.post(`${ip}/favorites/`,item,config);
      console.log('response is',res)
      if (res.status === 201) {
        window.alert("Added to Favorites!");
      } else {
        window.alert("Error adding to Favorites!");
      }
    } catch (ex) {
      console.error("Error adding to favorites:", ex);
      window.alert("An error occurred. Please try again.");
    }
  };


  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <button
          onClick={() => setView(view === "grid" ? "list" : "grid")}
          className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md transition duration-200"
        >
          {view === "grid" ? "Switch to List View" : "Switch to Grid View"}
        </button>
        <select
          onChange={handleSortChange}
          value={sortBy}
          className="border p-2 rounded-md bg-gray-100 text-gray-700"
        >
          <option value="price">Sort by Price</option>
          <option value="releaseDate">Sort by Release Date</option>
        </select>
      </div>

      <div
        className={`grid ${
          view === "grid" ? "grid-cols-2 md:grid-cols-4" : "grid-cols-1"
        } gap-4`}
      >
        {data.map((item,index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
          >
            <img
              src={item.artworkUrl100}
              alt={item.trackName}
              className="w-full h-48 object-cover rounded-md mb-4 cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200"
              onClick={() => handleNavigate(item)}
            />

            <h3 className="text-lg font-semibold mb-2">{item.trackName}</h3>
            <p className="text-sm text-gray-600">{item.primaryGenreName}</p>
            <p className="text-md text-gray-800 mt-2">{`$${item.trackPrice}`}</p>
            <button
              onClick={() => addToFavorite(item)}
              className="bg-green-500 hover:bg-green-600 text-white mt-2 p-2 rounded-md transition duration-200"
            >
              Add to Favorites
            </button>
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
