import { fireEvent, screen } from '@testing-library/react';
import Layout from '../components/Layout';
import { setupStore } from '../store';
import { renderWithProviders } from '../utils/test-utils';
import { logout } from '../features/authSlice';

describe('Layout Component', () => {
    it('renders the AppBar with the title', () => {
        renderWithProviders(<Layout><div>Child Content</div></Layout>)
        expect(screen.getByText(/GP Vote/i)).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /register/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
        expect(screen.getByText(/Child Content/i)).toBeInTheDocument();
    });

    it('shows the Logout button when authenticated', () => {
        renderWithProviders(<Layout><div>Child Content</div></Layout>, {
            preloadedState: {
                auth: {
                    authToken: 'test-token',
                    loading: false,
                    error: null,
                }
            }
        });
        expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
    });

    it('dispatches logout action when Logout button is clicked', () => {
        const store = setupStore({
            auth: {
                authToken: 'test-token',
                loading: false,
                error: null,
            }
        });
        const mockDispatch = vi.fn();
        store.dispatch = mockDispatch;

        renderWithProviders(<Layout><div>Child Content</div></Layout>, {
            preloadedState: {}, store
        });
        fireEvent.click(screen.getByRole('button', { name: /logout/i }));

        expect(mockDispatch).toHaveBeenCalledWith(logout());
        expect(mockDispatch).toHaveBeenCalledTimes(1);
    });

});