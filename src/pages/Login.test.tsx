import { fireEvent, screen } from '@testing-library/react';
import { loginUser } from '../features/authSlice';
import { renderWithProviders } from '../utils/test-utils';
import Login from './Login';

vi.mock('../features/authSlice', async () => {
    const actual = await vi.importActual('../features/authSlice');
    return {
        ...actual,
        loginUser: vi.fn(),
    };
});

describe('Login Page', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        console.log = vi.fn();
        console.error = vi.fn();
    });

    it('renders the login message', () => {
        renderWithProviders(<Login />);

        const heading = screen.getByRole('heading', { level: 4 });
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent('Login');
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    it('handles login successfully and redirects', async () => {
        const mockLoginUser = loginUser as vi.Mock;
        mockLoginUser.mockImplementation(() => async () => Promise.resolve({ token: 'mock-token' }));

        renderWithProviders(<Login />, {
            preloadedState: { auth: { authToken: null, loading: false, error: null } },
        });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
        await fireEvent.click(screen.getByRole('button', { name: /login/i }));
        expect(loginUser).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password' });
    });

    it('displays an error message when login fails', async () => {
        const mockLoginUser = loginUser as vi.Mock;
        mockLoginUser.mockImplementation(() => async () => Promise.reject('Login failed'));

        renderWithProviders(<Login />, {
            preloadedState: { auth: { authToken: null, loading: false, error: 'Login failed' } },
        });

        expect(screen.getByText(/login failed/i)).toBeInTheDocument();
    });

    it('disables the button while loading', () => {
        renderWithProviders(<Login />, {
            preloadedState: { auth: { authToken: null, loading: true, error: null } },
        });
        expect(screen.getByRole('button', { name: /logging in.../i })).toBeDisabled();
    });
});
