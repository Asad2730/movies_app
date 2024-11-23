
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IResult } from "../pages/movies/interface/data";


interface MovieState {
  selectedMovie: IResult | null;
}

const initialState: MovieState = {
  selectedMovie: null,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setSelectedMovie: (state, action: PayloadAction<IResult>) => {
      state.selectedMovie = action.payload;
    },
  },
});

export const { setSelectedMovie } = movieSlice.actions;
export default movieSlice.reducer;
