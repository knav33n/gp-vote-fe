import { screen } from "@testing-library/react";
import { setupStore } from "../store";
import { renderWithProviders } from "../utils/test-utils";
import Dashboard from "./Dashboard";

describe('Dashboard', () => {
    it('renders the dashboard with title and wallet address', () => {
        renderWithProviders(<Dashboard />, {
            preloadedState: {
                wallet: { address: '0x123', loading: false, error: null, isMetaMaskAvailable: true, },
            }
        });

        expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument();
        expect(screen.getByText(/wallet address: 0x123/i)).toBeInTheDocument();
    });

    it('disables the Add Title button when there is no wallet address', () => {
        const store = setupStore({
            wallet: { address: null, loading: false, error: null, isMetaMaskAvailable: true, },
        });
        renderWithProviders(<Dashboard />, { preloadedState: {}, store });
        const addTitleLink = screen.getByRole('link', { name: /add title/i });
        expect(addTitleLink).toBeInTheDocument();
        expect(addTitleLink).toHaveAttribute('aria-disabled', 'true');
        expect(screen.getByText(/please connect your wallet to add\/delete your titles/i)).toBeInTheDocument();
    });
});