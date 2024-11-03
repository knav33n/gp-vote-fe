import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import titlesReducer from "../features/titlesSlice";
import walletReducer from "../features/walletSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  titles: titlesReducer,
  wallet: walletReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};


export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];