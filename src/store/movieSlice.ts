import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {  IResult } from "../pages/movies/interface/data";

interface MovieState {
  selectedMovie: IResult | null;
  movies: IResult[];
}

const initialState: MovieState = {
  selectedMovie: null,
  movies: [],
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setSelectedMovie: (state, action: PayloadAction<IResult>) => {
      state.selectedMovie = action.payload;
    },
  
    addMovies: (state, action: PayloadAction<IResult[]>) => {
      state.movies = [...state.movies, ...action.payload];
    },
  },
});

export const { setSelectedMovie, addMovies } = movieSlice.actions;
export default movieSlice.reducer;
