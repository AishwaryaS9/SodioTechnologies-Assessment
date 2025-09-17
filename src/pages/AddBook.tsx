import { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout'
import { useNavigate } from 'react-router-dom';
import SelectDropdown from '../components/SelectDropdown';
import { STATUS_DATA } from '../utils/data';
import type { Books } from '../utils/interface';
import API_URL from '../api/endpoint';

const AddBook = () => {
    const navigate = useNavigate();

    const [bookData, setBookData] = useState({
        title: "",
        author: "",
        genre: "",
        publishedYear: null,
        status: "Available",
        pages: 1,
        language: "English"

    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleValueChange = <K extends keyof Books>(
        key: K,
        value: Books[K]
    ) => {
        setBookData((prevData) => ({ ...prevData, [key]: value }));
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setError(null);

            const payload = {
                ...bookData,
                available: bookData.status === "Available",
                publishedDate: new Date().toISOString(),
            };

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Failed to add book');
            }

            navigate('/');
        } catch (err: any) {
            console.error('Error adding book:', err);
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout activeMenu="Add Book">
            <div className="mt-5">
                <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
                    <div className="form-card col-span-3">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl md:text-xl font-medium dark:text-white">
                                Add Book
                            </h2>

                        </div>
                        <div className="mt-4">
                            <label className="text-xs font-medium text-slate-600 dark:text-gray-400">
                                Book Title
                            </label>
                            <input placeholder='Enter book name'
                                className='form-input'
                                value={bookData.title}
                                onChange={({ target }) =>
                                    handleValueChange("title", target.value)}
                            />
                        </div>
                        <div className="mt-3">
                            <label className="text-xs font-medium text-slate-600 dark:text-gray-400">
                                Author
                            </label>
                            <input placeholder='Enter author name'
                                className='form-input'
                                value={bookData.author}
                                onChange={({ target }) =>
                                    handleValueChange("author", target.value)}
                            />
                        </div>
                        <div className="mt-3">
                            <label className="text-xs font-medium text-slate-600 dark:text-gray-400">
                                Genre
                            </label>
                            <input placeholder='Enter genre'
                                className='form-input'
                                value={bookData.genre}
                                onChange={({ target }) =>
                                    handleValueChange("genre", target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-12 gap-4 mt-2">
                            <div className="col-span-6 md:col-span-4">
                                <label className="text-xs font-medium text-slate-600 dark:text-gray-400">
                                    Status
                                </label>

                                <SelectDropdown
                                    options={STATUS_DATA}
                                    value={bookData.status}
                                    onChange={(value) => handleValueChange("status", value)}
                                    placeholder="Select Availability"
                                />
                            </div>
                            <div className="col-span-6 md:col-span-4">
                                <label className='text-xs font-medium text-slate-600 dark:text-gray-400'>
                                    Published Year
                                </label>
                                <input placeholder='Enter published year'
                                    className='form-input'
                                    value={bookData.publishedYear || ""}
                                    onChange={({ target }) =>
                                        handleValueChange("publishedYear", target.value)}
                                    type='date' />
                            </div>

                            <div className="col-span-12 md:col-span-3">
                                <label className="text-xs font-medium text-slate-600 dark:text-gray-400">
                                    Pages
                                </label>

                                <input placeholder='Enter number of pages'
                                    className='form-input'
                                    value={bookData.pages || 1}
                                    onChange={({ target }) =>
                                        handleValueChange("pages", Number(target.value))}
                                    type='number' />
                            </div>
                        </div>

                        <div className="col-span-6 md:col-span-4">
                            <label className="text-xs font-medium text-slate-600 dark:text-gray-400">
                                Language
                            </label>
                            <input placeholder='Enter language'
                                className='form-input'
                                value={bookData.language || ""}
                                onChange={({ target }) =>
                                    handleValueChange("language", target.value)}
                                type='text' />
                        </div>


                        <div className="flex justify-end mt-7">
                            <button className="add-btn"
                                onClick={handleSubmit}
                                disabled={loading}>
                                ADD BOOK
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </DashboardLayout>
    )
}

export default AddBook