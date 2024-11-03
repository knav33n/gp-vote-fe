import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginApi, registerApi } from "../api/authApi";

interface AuthState {
  authToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  authToken: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }) => {
    const response = await loginApi(credentials);
    return response;
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (credentials: {
    username: string;
    email: string;
    password: string;
  }) => {
    const response = await registerApi(credentials);
    return response;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.authToken = null;
      state.error = null;
      localStorage.removeItem("authToken");
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setAuthToken(state, action) {
      state.authToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.authToken = action.payload.token;
        localStorage.setItem("authToken", action.payload.token);
        state.error = null;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message || "Login failed";
        state.loading = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.error = null;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message || "Registration failed";
        state.loading = false;
      });
  },
});

export const { logout, setError, setAuthToken } = authSlice.actions;
export default authSlice.reducer;
