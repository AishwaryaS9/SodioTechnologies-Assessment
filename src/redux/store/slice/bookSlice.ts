import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Books } from '../../../utils/interface';

interface BookState {
    books: Books[];
    searchQuery: string;
    genreFilter: string;
    statusFilter: string;
    page: number;
}

const initialState: BookState = {
    books: [],
    searchQuery: '',
    genreFilter: 'All',
    statusFilter: 'All',
    page: 1,
};

export const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        setBooks: (state, action: PayloadAction<Books[]>) => {
            state.books = action.payload;
        },

        clearBooks: (state) => {
            state.books = [];
        },

        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
            state.page = 1; 
        },

        setGenreFilter: (state, action: PayloadAction<string>) => {
            state.genreFilter = action.payload;
            state.page = 1;
        },

        setStatusFilter: (state, action: PayloadAction<string>) => {
            state.statusFilter = action.payload;
            state.page = 1;
        },

        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
    },
});

export const {
    setBooks,
    clearBooks,
    setSearchQuery,
    setGenreFilter,
    setStatusFilter,
    setPage,
} = bookSlice.actions;

export default bookSlice.reducer;
