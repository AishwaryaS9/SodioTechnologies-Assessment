import { useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import API_URL from '../api/endpoint';
import type { Books } from '../utils/interface';
import { X } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface EditBookModalProps {
    isOpen: boolean;
    onClose: () => void;
    bookId: string;
    onSuccess: () => void;
}

const EditBookModal = ({ isOpen, onClose, bookId, onSuccess }: EditBookModalProps) => {
    const queryClient = useQueryClient();

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

    if (!isOpen) return null;

    return (
        <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center
                        w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden bg-black/20 bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow-sm">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-200 rounded-t">
                        <h3 className="text-lg font-medium text-gray-900">
                            Edit Book
                        </h3>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
                        >
                            <X color='#212121' className="cursor-pointer" />
                        </button>
                    </div>

                    {isBookLoading ? (
                        <div className="p-4 text-center text-gray-500">Loading book details...</div>
                    ) : isBookError ? (
                        <div className="p-4 text-center text-red-500">
                            Failed to load book data.
                        </div>
                    ) : (
                        <form onSubmit={formik.handleSubmit} className="p-4 md:p-5 space-y-4">
                            <div>
                                <label className="text-xs font-medium text-gray-600">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    className="form-input"
                                    placeholder="Enter book title"
                                    value={formik.values.title || ''}
                                    onChange={formik.handleChange}
                                />
                                {formik.touched.title && formik.errors.title && (
                                    <p className="text-xs text-red-500">{formik.errors.title}</p>
                                )}
                            </div>

                            <div>
                                <label className="text-xs font-medium text-gray-600">Author</label>
                                <input
                                    type="text"
                                    name="author"
                                    className="form-input"
                                    placeholder="Enter author name"
                                    value={formik.values.author || ''}
                                    onChange={formik.handleChange}
                                />
                                {formik.touched.author && formik.errors.author && (
                                    <p className="text-xs text-red-500">{formik.errors.author}</p>
                                )}
                            </div>

                            <div>
                                <label className="text-xs font-medium text-gray-600">Genre</label>
                                <input
                                    type="text"
                                    name="genre"
                                    className="form-input"
                                    placeholder="Enter genre"
                                    value={formik.values.genre || ''}
                                    onChange={formik.handleChange}
                                />
                                {formik.touched.genre && formik.errors.genre && (
                                    <p className="text-xs text-red-500">{formik.errors.genre}</p>
                                )}
                            </div>

                            <div>
                                <label className="text-xs font-medium text-gray-600">Published Year</label>
                                <input
                                    type="number"
                                    name="publishedYear"
                                    min="0"
                                    max={new Date().getFullYear()}
                                    className="form-input"
                                    placeholder="Enter year"
                                    value={formik.values.publishedYear || ''}
                                    onChange={formik.handleChange}
                                />
                                {formik.touched.publishedYear && formik.errors.publishedYear && (
                                    <p className="text-xs text-red-500">{formik.errors.publishedYear}</p>
                                )}
                            </div>

                            <div>
                                <label className="text-xs font-medium text-gray-600">Available</label>
                                <select
                                    name="available"
                                    className="form-input"
                                    value={formik.values.available ? 'true' : 'false'}
                                    onChange={(e) =>
                                        formik.setFieldValue('available', e.target.value === 'true')
                                    }
                                >
                                    <option value="true">Available</option>
                                    <option value="false">Issued</option>
                                </select>
                            </div>

                            <div className="flex justify-end mt-4">
                                <button
                                    className="cancel-btn"
                                    onClick={onClose}
                                    type="button"
                                    disabled={updateBookMutation.isPending}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="add-btn ml-4"
                                    type="submit"
                                    disabled={updateBookMutation.isPending || !formik.isValid}
                                >
                                    {updateBookMutation.isPending ? 'Saving...' : 'Save Book'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditBookModal;
