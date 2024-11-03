import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "../utils/test-utils";
import TitlesTable from "./TitlesTable";
import { setupStore } from "../store";
import { removeTitle, Title } from "../features/titlesSlice";

const setupTestStore = (state: {
    titles: { titles: Title[], loading: boolean, error: string | null }
}) => setupStore(state);

describe('TitlesTable', () => {
    let mockDispatch: vi.Mock;
    beforeEach(() => {
        mockDispatch = vi.fn();
    });

    it('renders loading state', () => {
        renderWithProviders(<TitlesTable />, {
            preloadedState: {
                titles: { titles: [], loading: true, error: null }
            }
        });
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('renders error state', () => {
        const store = setupTestStore({
            titles: {
                titles: [],
                loading: false,
                error: 'Failed to fetch titles'
            }
        });
        store.dispatch = mockDispatch;

        renderWithProviders(<TitlesTable />, {
            preloadedState: {}, store
        });
        expect(screen.getByRole('alert')).toHaveTextContent('Failed to fetch titles');
    });

    it('renders table with titles', () => {
        const store = setupTestStore({
            titles: {
                titles: [
                    { uuid: '1', title: 'Title 1' },
                    { uuid: '2', title: 'Title 2' },
                ], loading: false, error: null
            },
        });
        store.dispatch = mockDispatch;

        renderWithProviders(<TitlesTable />, {
            preloadedState: {}, store
        });
        expect(screen.getByText('Title 1')).toBeInTheDocument();
        expect(screen.getByText('Title 2')).toBeInTheDocument();
    });

    it('calls deleteTitle when delete icon is clicked', () => {
        const store = setupTestStore({
            titles: { titles: [{ uuid: '1', title: 'Title 1' }], loading: false, error: null },
        });
        store.dispatch = mockDispatch;

        renderWithProviders(<TitlesTable />, {
            preloadedState: {}, store
        });

        const deleteButton = screen.getByLabelText('delete');
        fireEvent.click(deleteButton);
        expect(mockDispatch).toHaveBeenCalledWith(removeTitle('1'));
    });
});