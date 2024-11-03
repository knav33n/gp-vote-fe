import { Store } from "@reduxjs/toolkit";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { createTitle } from "../features/titlesSlice";
import { setupStore } from "../store";
import { renderWithProviders } from "../utils/test-utils";
import AddTitle from "./AddTitle";

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: vi.fn(),
    };
});

vi.mock('../features/titlesSlice', async () => {
    const actual = await vi.importActual('../features/titlesSlice');
    return {
        ...actual,
        createTitle: vi.fn(),
    };
});
describe('AddTitle', () => {
    let store: Store;

    beforeEach(() => {
        vi.clearAllMocks();
        store = setupStore({
            titles: {
                titles: [],
                loading: false,
                error: null,
            },
            wallet: {
                address: '0x123456789abcdef',
                loading: false,
                error: null,
                isMetaMaskAvailable: true,
            },
        });
        console.log = vi.fn();
        console.error = vi.fn();
    });

    it('renders the AddTitle component', () => {
        renderWithProviders(<AddTitle />, {
            preloadedState: {
                wallet: { address: '0x123', loading: false, error: null, isMetaMaskAvailable: true, },
            }
        });

        expect(screen.getByRole('heading', { name: /add title/i })).toBeInTheDocument();
        expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /add title/i })).toBeInTheDocument();
    });

    it('navigates back if there is no wallet address', () => {
        const store = setupStore({
            wallet: { address: null, loading: false, error: null, isMetaMaskAvailable: true, },
        });

        const mockNavigate = vi.fn();
        (useNavigate as vi.Mock).mockReturnValue(mockNavigate);

        renderWithProviders(<AddTitle />, {
            preloadedState: {}, store
        });

        expect(mockNavigate).toHaveBeenCalledWith(-1);
    });

    it('submits the form and adds a title', async () => {
        (createTitle as vi.Mock).mockImplementation(() => {
            return () => ({
                unwrap: () => Promise.resolve(),
            });
        });

        renderWithProviders(<AddTitle />);
        fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'New Title' } });
        fireEvent.click(screen.getByRole('button', { name: /add title/i }));
        await waitFor(() => {
            expect(createTitle).toHaveBeenCalledWith('New Title');
        });
    });

    it('displays an error message when adding a title fails', async () => {
        const errorMessage = 'Failed to add title';

        const mockDispatch = vi.fn();
        store.dispatch = mockDispatch;
        (createTitle as vi.Mock).mockImplementation(() => {
            return () => ({
                unwrap: () => Promise.reject(new Error(errorMessage)),
            });
        });

        renderWithProviders(<AddTitle />);
        fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'New Title' } });
        fireEvent.click(screen.getByRole('button', { name: /add title/i }));
        await waitFor(() => {
            expect(screen.getByText(errorMessage)).toBeInTheDocument();
        });
    });

});