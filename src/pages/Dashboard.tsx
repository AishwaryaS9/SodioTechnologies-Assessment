import DashboardLayout from '../components/layout/DashboardLayout';
import { IoSearchOutline } from 'react-icons/io5';
import { useEffect, useState, useMemo } from 'react';
import BookCard from '../components/BookCard';
import API_URL from '../api/endpoint';
import type { Books } from '../utils/interface';
import { useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination';

const Dashboard = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [books, setBooks] = useState<Books[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<Books[]>([]);
    const [genreFilter, setGenreFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 10;

    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);
                const res = await fetch(API_URL);
                if (!res.ok) throw new Error("Failed to fetch books");
                const data = await res.json();
                setBooks(data);
                setFilteredBooks(data);
            } catch (error) {
                console.error("Error fetching books:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    const availableGenres = useMemo(() => {
        const genres = books
            .map((b) => b.genre)
            .filter((g) => g && g.trim() !== '');
        return ['All', ...Array.from(new Set(genres))];
    }, [books]);

    useEffect(() => {
        let filtered = books.filter(book => {
            const matchesSearch =
                book.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                book.author?.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesGenre =
                genreFilter === 'All' || book.genre === genreFilter;

            const matchesStatus =
                statusFilter === 'All' ||
                (statusFilter === 'Available' && book.available) ||
                (statusFilter === 'Unavailable' && !book.available);

            return matchesSearch && matchesGenre && matchesStatus;
        });

        setFilteredBooks(filtered);
        setTotalPages(Math.max(1, Math.ceil(filtered.length / pageSize)));
        setPage(1); 
    }, [searchQuery, books, genreFilter, statusFilter]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const startIndex = (page - 1) * pageSize;
    const paginatedBooks = filteredBooks.slice(startIndex, startIndex + pageSize);

    const handleAddBook = () => {
        navigate('/add-book');
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
                            onChange={(e) => setSearchQuery(e.target.value)}
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
                                onChange={(e) => setGenreFilter(e.target.value)}
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
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="All">All</option>
                                <option value="Available">Available</option>
                                <option value="Unavailable">Unavailable</option>
                            </select>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-96">
                        <p className="text-gray-500 text-sm">Loading books...</p>
                    </div>
                ) : paginatedBooks.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        {paginatedBooks.map((book) => (
                            <BookCard key={book._id} book={book} />
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
                <nav className="my-15" aria-label="Book list pagination">
                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </nav>
            )}
        </DashboardLayout>
    );
};

export default Dashboard;
