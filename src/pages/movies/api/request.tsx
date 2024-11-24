import axios from "axios";
import { IData, IResult } from "../interface/data";
import { ip } from "../../../util/helper";

export const fetchMovies = async (page: number): Promise<IData["results"]> => {
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

    return response.data.results;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const addToFavorite = async (item: IResult, token: string) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const res = await axios.post(`${ip}/favorites/`, item, config);
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

export const GetFavorite = async (token: string, page: number) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const res = await axios.get(`${ip}/favorites?page=${page}`, config);

    if (res.status === 200) {
      return res.data.favorites;
    } else {
      return { error: `Unexpected status code: ${res.status}` };
    }
  } catch (ex) {
    console.error("Error fetching favorites:", ex);
    return { error: "Failed to fetch favorites. Please try again later." };
  }
};
