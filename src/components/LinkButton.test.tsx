import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LinkButton from './LinkButton';

describe('LinkButton', () => {
    it('renders the button with the correct label', () => {
        render(
            <MemoryRouter>
                <LinkButton label="Click Me" to="/test" />
            </MemoryRouter>
        );

        const link = screen.getByRole('link', { name: /click me/i });
        expect(link).toBeInTheDocument();
    });

    it('navigates to the correct route', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <LinkButton label="Go to Test" to="/test" />
            </MemoryRouter>
        );

        const link = screen.getByRole('link', { name: /go to test/i });
        expect(link).toHaveAttribute('href', '/test');
    });

    it('applies custom styles from the sx prop', () => {
        const customStyles = { color: 'rgb(255, 0, 0)' };

        render(
            <MemoryRouter>
                <LinkButton label="Styled Button" to="/test" sx={customStyles} />
            </MemoryRouter>
        );

        const link = screen.getByRole('link', { name: /styled button/i });
        expect(link).toHaveStyle('color: rgb(255, 0, 0)');
    });
});
