import { screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../utils/test-utils";
import ProtectedRoute from "./ProtectedRoute";

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: vi.fn(),
    };
});

import { useNavigate } from "react-router-dom";

describe('ProtectedRoute Component', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('renders children when authenticated', () => {
        localStorage.setItem('authToken', 'mockToken');
        renderWithProviders(<ProtectedRoute><div>Protected Content</div></ProtectedRoute>);
        expect(screen.getByText(/Protected Content/i)).toBeInTheDocument();
    });

    it('redirects to login when not authenticated', async () => {
        const mockNavigate = vi.fn();
        (useNavigate as vi.Mock).mockReturnValue(mockNavigate);
        renderWithProviders(<ProtectedRoute><div>Protected Content</div></ProtectedRoute>);
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/login');
        });
    });
});