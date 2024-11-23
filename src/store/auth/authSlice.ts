import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {login, TLoginResponse, TUser} from './authThunk';

interface AuthState {
  isLoggedIn: boolean;
  user: TUser | null;
  isLoginFormLoading: boolean;
  errorMessage: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  isLoginFormLoading: false,
  errorMessage: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUnauthenticated: () => ({
      isLoggedIn: false,
      user: null,
      isLoginFormLoading: false,
      errorMessage: null,
    }),
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state: AuthState) => {
        state.isLoginFormLoading = true;
      })
      .addCase(login.rejected, (state: AuthState, action: PayloadAction<any>) => {
        state.errorMessage = action.payload?.message ?? "Unknown error";
      })
      .addCase(login.fulfilled, (state: AuthState, action: PayloadAction<TLoginResponse>) => {
        state.errorMessage = null;
        state.user = action.payload.user;
        state.isLoggedIn = true;
      })
  }
});

export const { setUnauthenticated } = authSlice.actions;
export default authSlice.reducer;
