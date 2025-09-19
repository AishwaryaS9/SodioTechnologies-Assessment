import { useEffect, useRef } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import API_URL from '../api/endpoint';
import type { Books, EditBookModalProps } from '../utils/interface';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { RiCloseLargeLine } from 'react-icons/ri';

const EditBookModal = ({ isOpen, onClose, bookId, onSuccess }: EditBookModalProps) => {
    const queryClient = useQueryClient();
    const modalRef = useRef<HTMLDivElement>(null);

    const {
        data: book,
        isLoading: isBookLoading,
        isError: isBookError,
    } = useQuery<Books>({
        queryKey: ['book', bookId],
        queryFn: async () => {
            const res = await axios.get<Books>(`${API_URL}/${bookId}`);
            return res.data;
        },
        enabled: isOpen,
    });

    const updateBookMutation = useMutation({
        mutationFn: async (updatedBook: Partial<Books>) => {
            const fullBook = {
                title: updatedBook.title,
                author: updatedBook.author,
                genre: updatedBook.genre,
                publishedYear: updatedBook.publishedYear,
                available: updatedBook.available,
            };
            await axios.put(`${API_URL}/${bookId}`, fullBook);
            return fullBook;
        },
        onSuccess: async () => {
            toast.success('Book updated successfully');
            await queryClient.invalidateQueries({ queryKey: ['books'] });
            onSuccess();
            onClose();
        },
        onError: () => {
            toast.error('Failed to update book. Please try again.');
        },
    });

    const formik = useFormik<Partial<Books>>({
        initialValues: {
            title: '',
            author: '',
            genre: '',
            publishedYear: 1900,
            available: true,
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            author: Yup.string().required('Author is required'),
            genre: Yup.string().required('Genre is required'),
            publishedYear: Yup.number()
                .required('Published year is required')
                .max(new Date().getFullYear(), 'Published year cannot be in the future'),
            available: Yup.boolean().required(),
        }),
        onSubmit: (values) => {
            updateBookMutation.mutate({
                ...values,
                publishedYear: Number(values.publishedYear),
            });
        },
        enableReinitialize: true,
    });

    useEffect(() => {
        if (book) formik.setValues(book);
    }, [book]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex justify-center items-center bg-black/20 overflow-y-auto p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-book-title"
        >
            <div
                ref={modalRef}
                className="relative bg-white rounded-lg shadow-sm w-full max-w-2xl max-h-full overflow-auto"
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-200 rounded-t">
                    <h3 id="edit-book-title" className="text-lg font-medium text-gray-900">
                        Edit Book
                    </h3>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close modal"
                        className="text-gray-400 hover:bg-gray-200 cursor-pointer hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
                    >
                        <RiCloseLargeLine color="#212121" size={15} aria-hidden="true" className="cursor-pointer" />
                    </button>
                </div>

                {isBookLoading ? (
                    <div className="p-4 text-center text-gray-500" role="status" aria-live="polite">
                        Loading book details...
                    </div>
                ) : isBookError ? (
                    <div className="p-4 text-center text-red-500" role="alert">
                        Failed to load book data.
                    </div>
                ) : (
                    <form onSubmit={formik.handleSubmit} className="p-4 space-y-4">
                        <div>
                            <label htmlFor="title" className="text-xs font-medium text-gray-600">
                                Title
                            </label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                className="form-input"
                                placeholder="Enter book title"
                                value={formik.values.title || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                aria-describedby={formik.errors.title ? 'title-error' : undefined}
                                aria-invalid={!!formik.errors.title}
                            />
                            {formik.touched.title && formik.errors.title && (
                                <p id="title-error" className="text-xs text-red-500">
                                    {formik.errors.title}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="author" className="text-xs font-medium text-gray-600">
                                Author
                            </label>
                            <input
                                id="author"
                                name="author"
                                type="text"
                                className="form-input"
                                placeholder="Enter author name"
                                value={formik.values.author || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                aria-describedby={formik.errors.author ? 'author-error' : undefined}
                                aria-invalid={!!formik.errors.author}
                            />
                            {formik.touched.author && formik.errors.author && (
                                <p id="author-error" className="text-xs text-red-500">
                                    {formik.errors.author}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="genre" className="text-xs font-medium text-gray-600">
                                Genre
                            </label>
                            <input
                                id="genre"
                                name="genre"
                                type="text"
                                className="form-input"
                                placeholder="Enter genre"
                                value={formik.values.genre || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                aria-describedby={formik.errors.genre ? 'genre-error' : undefined}
                                aria-invalid={!!formik.errors.genre}
                            />
                            {formik.touched.genre && formik.errors.genre && (
                                <p id="genre-error" className="text-xs text-red-500">
                                    {formik.errors.genre}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="publishedYear" className="text-xs font-medium text-gray-600">
                                Published Year
                            </label>
                            <input
                                id="publishedYear"
                                name="publishedYear"
                                type="number"
                                min="0"
                                max={new Date().getFullYear()}
                                className="form-input"
                                placeholder="Enter year"
                                value={formik.values.publishedYear || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                aria-describedby={formik.errors.publishedYear ? 'year-error' : undefined}
                                aria-invalid={!!formik.errors.publishedYear}
                            />
                            {formik.touched.publishedYear && formik.errors.publishedYear && (
                                <p id="year-error" className="text-xs text-red-500">
                                    {formik.errors.publishedYear}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="available" className="text-xs font-medium text-gray-600">
                                Available
                            </label>
                            <select
                                id="available"
                                name="available"
                                className="form-input border border-gray-400 rounded-md focus:outline-none "
                                value={formik.values.available ? 'true' : 'false'}
                                onChange={(e) => formik.setFieldValue('available', e.target.value === 'true')}
                            >
                                <option value="true" className="hover:bg-gray-200">
                                    Available
                                </option>
                                <option value="false" className="hover:bg-gray-200">
                                    Issued
                                </option>
                            </select>
                        </div>

                        <div className="flex justify-end mt-4 gap-4">
                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={onClose}
                                disabled={updateBookMutation.isPending}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="add-btn"
                                disabled={updateBookMutation.isPending || !formik.isValid}
                            >
                                {updateBookMutation.isPending ? 'Saving...' : 'Save Book'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default EditBookModal;
