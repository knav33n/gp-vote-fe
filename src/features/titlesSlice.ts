import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTitlesApi, postTitleApi } from "../api/titlesApi";

export interface Title {
  title: string;
  uuid: string;
}

interface TitlesState {
  titles: Title[];
  loading: boolean;
  error: string | null;
}

const initialState: TitlesState = {
  titles: [],
  loading: false,
  error: null,
};

export const createTitle = createAsyncThunk(
  "titles/createTitle",
  async (newTitle: string) => {
    const response = await postTitleApi(newTitle);
    return response;
  }
);

export const fetchTitlesByUser = createAsyncThunk(
  "titles/fetchTitlesByUser",
  async () => {
    const response = await getTitlesApi();
    return response;
  }
);

const titlesSlice = createSlice({
  name: "titles",
  initialState,
  reducers: {
    removeTitle(state, action: PayloadAction<string>) {
      state.titles = state.titles.filter((t) => t.uuid !== action.payload);
    },
    setTitlesError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTitle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTitle.fulfilled, (state, action: PayloadAction<Title>) => {
        state.loading = false;
        state.titles = [...state.titles, action.payload];
      })
      .addCase(createTitle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create title";
      })
      .addCase(fetchTitlesByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTitlesByUser.fulfilled,
        (state, action: PayloadAction<Title[]>) => {
          state.loading = false;
          state.titles = action.payload;
        }
      )
      .addCase(fetchTitlesByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch titles";
      });
  },
});

export const { removeTitle, setTitlesError } = titlesSlice.actions;
export default titlesSlice.reducer;
