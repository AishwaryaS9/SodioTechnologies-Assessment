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
            <div className="my-5">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                    <h2 className="text-xl md:text-xl font-medium">Manage Books</h2>
                    <div className="flex items-center space-x-4 mt-4 lg:mt-0 lg:justify-end w-full lg:w-auto">
                        <button
                            className="flex items-center bg-primary text-white px-4 py-2 rounded-lg text-sm cursor-pointer"
                            onClick={handleAddBook}
                        >
                            + Add New Book
                        </button>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center my-8 space-y-4 md:space-y-0">
                    <div className="flex items-center w-full md:w-1/2 relative">
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-lg px-10 py-2 bg-white 
                                       focus:ring-primary focus:outline-none text-sm text-gray-700"
                            placeholder="Search books..."
                            value={searchQuery}
                            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                        />
                        <span className="absolute left-3 text-gray-400">
                            <IoSearchOutline className="w-5 h-5" />
                        </span>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="flex flex-col">
                            <label htmlFor="genreFilter" className="text-[12px] font-medium text-gray-600 mb-1">
                                Genre
                            </label>
                            <select
                                id="genreFilter"
                                className="border border-gray-300 rounded-lg px-3 py-2 bg-white
                                focus:ring-primary focus:outline-none text-[12px] text-gray-700"
                                value={genreFilter}
                                onChange={(e) => dispatch(setGenreFilter(e.target.value))}
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
                                className="border border-gray-300 rounded-lg px-3 py-2 bg-white 
                                focus:ring-primary focus:outline-none text-[12px] text-gray-700"
                                value={statusFilter}
                                onChange={(e) => dispatch(setStatusFilter(e.target.value))}
                            >
                                <option value="All">All</option>
                                <option value="Available">Available</option>
                                <option value="Issued">Issued</option>
                            </select>
                        </div>
                    </div>
                </div>
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        {Array.from({ length: pageSize }).map((_, index) => (
                            <BookCardSkeleton key={index} />
                        ))}
                    </div>
                ) : isError ? (
                    <div className="flex justify-center items-center h-96">
                        <p className="text-red-500 text-sm">Failed to load books. Please try again.</p>
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
            </div>
            {totalPages > 1 && (
                isLoading ? (
                    <PaginationSkeleton />
                ) : (
                    <nav className="my-15" aria-label="Book list pagination">
                        <Pagination
                            page={page}
                            totalPages={totalPages}
                            onPageChange={(newPage) => dispatch(setPage(newPage))}
                        />
                    </nav>
                )
            )}
            {selectedBook && (
                <EditBookModal
                    isOpen={isEditModalOpen}
                    onClose={handleCloseEditModal}
                    bookId={selectedBook._id}
                    onSuccess={handleEditSuccess}
                />
            )}

            {isAlertModalOpen && (
                <DeleteAlert
                    content={`Are you sure you want to delete "${bookToDelete?.title}"? This action cannot be undone.`}
                    isOpen={isAlertModalOpen}
                    onClose={handleCloseDeleteAlert}
                    onDelete={handleConfirmDelete}
                />
            )}
        </DashboardLayout>
    );
};

export default Dashboard;
