import DashboardLayout from '../components/layout/DashboardLayout';
import { IoSearchOutline } from 'react-icons/io5';
import { useMemo, useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import API_URL from '../api/endpoint';
import type { Books } from '../utils/interface';
import { useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import {
    setSearchQuery,
    setGenreFilter,
    setStatusFilter,
    setPage,
    setBooks,
} from '../redux/store/slice/bookSlice';
import type { RootState } from '../redux/store';
import { useAppDispatch, useAppSelector } from '../redux/store/hooks';
import EditBookModal from '../components/EditBookModal';
import DeleteAlert from '../components/DeleteAlert';
import { BookCardSkeleton, PaginationSkeleton } from '../components/SkeletonLoader/BookCardSkeleton';

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState<Books | null>(null);
    const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
    const [bookToDelete, setBookToDelete] = useState<Books | null>(null);

    const searchQuery = useAppSelector((state: RootState) => state.book.searchQuery);
    const genreFilter = useAppSelector((state: RootState) => state.book.genreFilter);
    const statusFilter = useAppSelector((state: RootState) => state.book.statusFilter);
    const page = useAppSelector((state: RootState) => state.book.page);

    const pageSize = 10;

    const fetchBooksMutation = useMutation<Books[], Error>({
        mutationFn: async () => {
            const res = await axios.get<Books[]>(API_URL);
            return res.data;
        },
        onSuccess: (data) => {
            dispatch(setBooks(data));
        },
        onError: (error) => {
            console.error('Error fetching books:', error);
        },
    });

    useEffect(() => {
        fetchBooksMutation.mutate();
    }, []);

    const isLoading = fetchBooksMutation.status === 'pending';
    const isError = fetchBooksMutation.status === 'error';
    const books = fetchBooksMutation.data || [];

    const availableGenres = useMemo(() => {
        const genres = books
            .map((b) => b.genre)
            .filter((g) => g && g.trim() !== '');
        return ['All', ...Array.from(new Set(genres))];
    }, [books]);

    const filteredBooks = useMemo(() => {
        return books.filter((book) => {
            const matchesSearch =
                book.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                book.author?.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesGenre = genreFilter === 'All' || book.genre === genreFilter;

            const matchesStatus =
                statusFilter === 'All' ||
                (statusFilter === 'Available' && book.available) ||
                (statusFilter === 'Issued' && !book.available);

            return matchesSearch && matchesGenre && matchesStatus;
        });
    }, [books, searchQuery, genreFilter, statusFilter]);

    const totalPages = Math.max(1, Math.ceil(filteredBooks.length / pageSize));
    const startIndex = (page - 1) * pageSize;
    const paginatedBooks = filteredBooks.slice(startIndex, startIndex + pageSize);

    const handleAddBook = () => navigate('/add-book');
    const handleEditBook = (book: Books) => {
        setSelectedBook(book);
        setIsEditModalOpen(true);
    };
    const handleDelete = (book: Books) => {
        setBookToDelete(book);
        setIsAlertModalOpen(true);
    };
    const handleCloseEditModal = () => {
        setSelectedBook(null);
        setIsEditModalOpen(false);
    };
    const handleEditSuccess = () => {
        fetchBooksMutation.mutate();
        handleCloseEditModal();
    };
    const handleCloseDeleteAlert = () => {
        setIsAlertModalOpen(false);
        setBookToDelete(null);
    };
    const handleConfirmDelete = async () => {
        if (!bookToDelete) return;
        try {
            await axios.delete(`${API_URL}/${bookToDelete._id}`);
            fetchBooksMutation.mutate();
            handleCloseDeleteAlert();
        } catch (err) {
            console.error('Failed to delete book:', err);
        }
    };

    return (
        <DashboardLayout activeMenu="Dashboard">
            <main aria-label="Dashboard Main Content" className="my-5">
                <header className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
                    <h1 className="text-lg font-semibold">Manage Books</h1>
                    <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                        <button
                            className="flex items-center bg-primary text-white px-4 py-2 rounded-lg text-sm cursor-pointer"
                            onClick={handleAddBook}
                            aria-label="Add a new book"
                        >
                            + Add New Book
                        </button>
                    </div>
                </header>

                <section
                    aria-labelledby="filters-heading"
                    className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0"
                >
                    <h2 id="filters-heading" className="sr-only">Book Filters</h2>
                    <div className="flex items-center w-full md:w-1/2 relative">
                        <label htmlFor="search" className="sr-only">Search books</label>
                        <input
                            id="search"
                            type="text"
                            className="w-full border border-gray-300 rounded-lg px-10 py-2 bg-white 
                                       focus:ring-primary focus:outline-none text-sm text-gray-700"
                            placeholder="Search books..."
                            value={searchQuery}
                            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                        />
                        <span className="absolute left-3 text-gray-400">
                            <IoSearchOutline className="w-5 h-5" aria-hidden="true" />
                        </span>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="flex flex-col">
                            <label htmlFor="genreFilter" className="text-[12px] font-medium text-gray-600 mb-1">
                                Genre
                            </label>
                            <select
                                id="genreFilter"
                                value={genreFilter}
                                onChange={(e) => dispatch(setGenreFilter(e.target.value))}
                                className="border border-gray-300 rounded-lg px-3 py-2 bg-white
                                           focus:ring-primary focus:outline-none text-[12px] text-gray-700"
                            >
                                {availableGenres.map((genre) => (
                                    <option key={genre} value={genre}>
                                        {genre}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="statusFilter" className="text-[12px] font-medium text-gray-600 mb-1">
                                Status
                            </label>
                            <select
                                id="statusFilter"
                                value={statusFilter}
                                onChange={(e) => dispatch(setStatusFilter(e.target.value))}
                                className="border border-gray-300 rounded-lg px-3 py-2 bg-white
                                           focus:ring-primary focus:outline-none text-[12px] text-gray-700"
                            >
                                <option value="All">All</option>
                                <option value="Available">Available</option>
                                <option value="Issued">Issued</option>
                            </select>
                        </div>
                    </div>
                </section>

                <section aria-labelledby="book-list-heading">
                    <h2 id="book-list-heading" className="sr-only">Book List</h2>
                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            {Array.from({ length: pageSize }).map((_, index) => (
                                <BookCardSkeleton key={index} />
                            ))}
                        </div>
                    ) : isError ? (
                        <div className="flex justify-center items-center h-96">
                            <p className="text-red-500 text-sm" role="alert">
                                Failed to load books. Please try again.
                            </p>
                        </div>
                    ) : paginatedBooks.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            {paginatedBooks.map((book) => (
                                <BookCard
                                    key={book._id}
                                    book={book}
                                    onEdit={handleEditBook}
                                    onDelete={() => handleDelete(book)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col justify-center items-center h-96">
                            <p className="text-gray-500 mt-4 text-center text-sm">
                                No books found matching your filters.
                            </p>
                        </div>
                    )}
                </section>

                {totalPages > 1 && (
                    <nav
                        className="my-8"
                        aria-label="Book list pagination"
                    >
                        {isLoading ? (
                            <PaginationSkeleton />
                        ) : (
                            <Pagination
                                page={page}
                                totalPages={totalPages}
                                onPageChange={(newPage) => dispatch(setPage(newPage))}
                            />
                        )}
                    </nav>
                )}

                {selectedBook && (
                    <EditBookModal
                        isOpen={isEditModalOpen}
                        onClose={handleCloseEditModal}
                        bookId={selectedBook._id}
                        onSuccess={handleEditSuccess}
                        aria-label={`Edit book: ${selectedBook.title}`}
                    />
                )}

                {isAlertModalOpen && (
                    <DeleteAlert
                        content={`Are you sure you want to delete "${bookToDelete?.title}"? This action cannot be undone.`}
                        isOpen={isAlertModalOpen}
                        onClose={handleCloseDeleteAlert}
                        onDelete={handleConfirmDelete}
                        aria-label={`Delete confirmation for ${bookToDelete?.title}`}
                    />
                )}
            </main>
        </DashboardLayout>
    );
};

export default Dashboard;
