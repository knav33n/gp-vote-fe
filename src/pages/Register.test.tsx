import { fireEvent, screen } from '@testing-library/react';
import { registerUser } from '../features/authSlice';
import { renderWithProviders } from '../utils/test-utils';
import Register from './Register';

vi.mock('../features/authSlice', async () => {
    const actual = await vi.importActual('../features/authSlice');
    return {
        ...actual,
        registerUser: vi.fn(),
    };
});

describe('Register Page', () => {

    beforeEach(() => {
        vi.clearAllMocks();
        console.log = vi.fn();
        console.error = vi.fn();
    });

    it('renders the register message', () => {
        renderWithProviders(<Register />);

        const heading = screen.getByRole('heading', { level: 4 });
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent('Register');
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
    });

    it('handles registration successfully', async () => {
        const mockRegisterUser = registerUser as vi.Mock;
        mockRegisterUser.mockImplementation(() => async () => Promise.resolve());

        renderWithProviders(<Register />, {
            preloadedState: { auth: { authToken: null, loading: false, error: null } },
        });
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
        await fireEvent.click(screen.getByRole('button', { name: /register/i }));
        expect(registerUser).toHaveBeenCalledWith({ username: 'testuser', email: 'test@example.com', password: 'password' });
    });

    it('displays an error message when registration fails', async () => {
        const mockRegisterUser = registerUser as vi.Mock;
        mockRegisterUser.mockImplementation(() => async () => Promise.reject('Registration failed'));
        renderWithProviders(<Register />, {
            preloadedState: { auth: { authToken: null, loading: false, error: 'Registration failed' } },
        });
        expect(screen.getByText(/registration failed/i)).toBeInTheDocument();
    });

    it('disables the button while loading', () => {
        renderWithProviders(<Register />, {
            preloadedState: { auth: { authToken: null, loading: true, error: null } },
        });
        expect(screen.getByRole('button', { name: /registering.../i })).toBeDisabled();
    });
});
