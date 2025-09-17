import DashboardLayout from '../components/layout/DashboardLayout';
import { IoSearchOutline } from 'react-icons/io5'
import { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import API_URL from '../api/endpoint';
import type { Books } from '../utils/interface';

const Dashboard = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('Name');
    const [books, setBooks] = useState<Books[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<Books[]>([]);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        let filtered = books.filter(book =>
            book.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author?.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (sortOption === "Name") {
            filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortOption === "Status") {
            filtered = filtered.sort((a, b) => (a.available === b.available ? 0 : a.available ? -1 : 1));
        } else if (sortOption === "Due Date") {
            filtered = filtered.sort((a, b) => new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime());
        }

        setFilteredBooks(filtered);
    }, [searchQuery, books, sortOption]);

    return (
        <DashboardLayout activeMenu="Dashboard">
            <div className="my-5">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                    <h2 className="text-xl md:text-xl font-medium">Manage Books</h2>
                    <div className="flex items-center space-x-4 mt-4 lg:mt-0 lg:justify-end w-full lg:w-auto">
                        <button
                            className="flex items-center bg-primary text-white px-4 py-2 rounded-lg text-sm"
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

                    <div className="flex items-center space-x-2">
                        <span className="text-[12px] font-medium text-gray-600">Sort By:</span>
                        <select
                            className="border border-gray-300 rounded-lg px-3 py-2 bg-white 
                            focus:ring-primary focus:outline-none text-[12px] text-gray-700"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                        >
                            <option value="Name">Name</option>
                            <option value="Status">Status</option>
                            <option value="Due Date">Due Date</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-96">
                        <p className="text-gray-500 text-sm">Loading books...</p>
                    </div>
                ) : filteredBooks.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        {filteredBooks.map((book) => (
                            <BookCard key={book._id} book={book} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col justify-center items-center h-96">
                        <p className="text-gray-500 mt-4 text-center text-sm">
                            No books found at the moment. Please check back later.
                        </p>
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}

export default Dashboard;
