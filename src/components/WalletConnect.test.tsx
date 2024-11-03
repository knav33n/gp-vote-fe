import { fireEvent, screen, waitFor } from "@testing-library/react";
import { setupStore } from "../store";
import { renderWithProviders } from "../utils/test-utils";
import WalletConnect from "./WalletConnect";

describe('WalletConnect', () => {
    it('renders nothing when authToken is missing or address is present', () => {
        renderWithProviders(<WalletConnect />, {
            preloadedState: {
                wallet: { address: '0x123', loading: false, error: null, isMetaMaskAvailable: false, },
                auth: { authToken: null, loading: false, error: null },
            }
        });

        expect(screen.queryByText('Connect Wallet')).toBeNull();
    });

    it('renders a disabled button when MetaMask is not available', async () => {
        global.window.ethereum = undefined;
        renderWithProviders(<WalletConnect />, {
            preloadedState: {
                wallet: { address: null, loading: false, error: 'MetaMask not found', isMetaMaskAvailable: false, },
                auth: { authToken: 'test-token', loading: false, error: null },
            }
        });

        const button = screen.getByRole('button', { name: /connect wallet/i });
        expect(button).toBeDisabled();

        fireEvent.mouseOver(button);
        const tooltip = await waitFor(() => screen.getByText('MetaMask not found'));
        expect(tooltip).toBeInTheDocument();
    });

    it('calls connectWallet when the button is clicked and MetaMask is available', async () => {
        global.window.ethereum = {
            request: vi.fn().mockResolvedValue(['0x123']),
        };

        const store = setupStore({
            wallet: { address: null, loading: false, error: null, isMetaMaskAvailable: true, },
            auth: { authToken: 'test-token', loading: false, error: null },
        });
        const mockDispatch = vi.fn();
        store.dispatch = mockDispatch;

        renderWithProviders(<WalletConnect />, {
            preloadedState: {},
            store
        });

        const button = screen.getByRole('button', { name: /connect wallet/i });
        fireEvent.click(button);

        expect(global.window.ethereum.request).toHaveBeenCalledWith({
            method: 'eth_requestAccounts',
        });
    });
})



