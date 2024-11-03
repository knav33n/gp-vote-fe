import { screen } from '@testing-library/react';
import { renderWithProviders } from '../utils/test-utils';
import Home from './Home';

describe('Home Page', () => {
  it('renders the welcome message', () => {
    renderWithProviders(<Home />);
    expect(screen.getByText(/welcome to gp vote/i)).toBeInTheDocument();
  });
});
