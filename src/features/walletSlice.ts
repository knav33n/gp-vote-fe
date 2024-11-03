import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WalletState {
  address: string | null;
  error: string | null;
  loading: boolean;
  isMetaMaskAvailable: boolean;
}

const initialState: WalletState = {
  address: localStorage.getItem("walletAddress") || null,
  error: null,
  loading: false,
  isMetaMaskAvailable: !!window.ethereum,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setWalletAddress(state, action: PayloadAction<string | null>) {
      state.address = action.payload;
      state.error = null;
      state.loading = false;
      if (action.payload) {
        localStorage.setItem("walletAddress", action.payload);
      } else {
        localStorage.removeItem("walletAddress");
      }
    },
    setWalletError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.loading = false;
    },
    setWalletLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    clearWalletError(state) {
      state.error = null;
    },
    setMetaMaskAvailability(state, action: PayloadAction<boolean>) {
      if (!action.payload) {
        state.error = "MetaMask is not installed!";
      }
      state.isMetaMaskAvailable = action.payload;
    },
  },
});

export const {
  setWalletAddress,
  setWalletError,
  setWalletLoading,
  clearWalletError,
  setMetaMaskAvailability,
} = walletSlice.actions;
export default walletSlice.reducer;
