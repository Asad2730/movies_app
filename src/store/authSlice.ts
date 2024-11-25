import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../pages/movies/interface/user';

interface AuthState {
    user:IUser | null,
    token: string | null;
}

const initialState: AuthState = {
    user:null,
    token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
    },
    clearAuthToken: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setAuthToken, setUser,clearAuthToken } = authSlice.actions;
export default authSlice.reducer;
