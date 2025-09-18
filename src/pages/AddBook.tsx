import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DashboardLayout from '../components/layout/DashboardLayout';
import SelectDropdown from '../components/SelectDropdown';
import { STATUS_DATA } from '../utils/data';
import type { Books } from '../utils/interface';
import API_URL from '../api/endpoint';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '../redux/store/hooks';
import { setBooks } from '../redux/store/slice/bookSlice';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddBook = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();
    const currentBooks = useAppSelector(state => state.book.books);

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        author: Yup.string().required('Author is required'),
        genre: Yup.string().required('Genre is required'),
        status: Yup.string().required('Status is required'),
        publishedYear: Yup.date()
            .required('Published Year is required')
            .max(new Date(), 'Published year cannot be in the future'),
        pages: Yup.number()
            .required('Number of pages is required')
            .min(1, 'Pages must be at least 1'),
        language: Yup.string().required('Language is required')
    });

    const addBookMutation = useMutation({
        mutationFn: async (payload: Partial<Books>) => {
            const response = await axios.post<Books>(API_URL, payload);
            return response.data;
        },
        onSuccess: (newBook) => {
            toast.success('Book added successfully');
            dispatch(setBooks([newBook, ...currentBooks]));
            queryClient.invalidateQueries({ queryKey: ['books'] });
            navigate('/');
        },
        onError: (err: any) => {
            toast.error('Failed to add book. Please try again.');
            console.error('Failed to add book:', err);
        },
    });

    return (
        <DashboardLayout activeMenu="Add Book">

            <div className="mt-14">
                <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
                    <div className="form-card col-span-3">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl md:text-xl font-medium dark:text-white">
                                Add Book
                            </h2>
                        </div>

                        <Formik
                            initialValues={{
                                title: "",
                                author: "",
                                genre: "",
                                publishedYear: "",
                                status: "Available",
                                pages: 1,
                                language: ""
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {
                                const payload = {
                                    ...values,
                                    publishedYear: Number(values.publishedYear),
                                    available: values.status === "Available",
                                };
                                addBookMutation.mutate(payload);
                            }}
                        >
                            {({ values, setFieldValue }) => (
                                <Form>
                                    <div className="mt-4">
                                        <label className="text-xs font-medium text-slate-600 dark:text-gray-400">
                                            Book Title
                                        </label>
                                        <Field
                                            name="title"
                                            placeholder="Enter book name"
                                            className="form-input"
                                        />
                                        <ErrorMessage
                                            name="title"
                                            component="div"
                                            className="text-red-500 text-xs mt-1"
                                        />
                                    </div>

                                    <div className="mt-3">
                                        <label className="text-xs font-medium text-slate-600 dark:text-gray-400">
                                            Author
                                        </label>
                                        <Field
                                            name="author"
                                            placeholder="Enter author name"
                                            className="form-input"
                                        />
                                        <ErrorMessage
                                            name="author"
                                            component="div"
                                            className="text-red-500 text-xs mt-1"
                                        />
                                    </div>

                                    <div className="grid grid-cols-8 gap-4 mt-2">
                                        <div className="col-span-4">
                                            <label className="text-xs font-medium text-slate-600 dark:text-gray-400">
                                                Genre
                                            </label>
                                            <Field
                                                name="genre"
                                                placeholder="Enter genre"
                                                className="form-input"
                                            />
                                            <ErrorMessage
                                                name="genre"
                                                component="div"
                                                className="text-red-500 text-xs mt-1"
                                            />
                                        </div>

                                        <div className="col-span-4">
                                            <label className="text-xs font-medium text-slate-600 dark:text-gray-400">
                                                Language
                                            </label>
                                            <Field
                                                name="language"
                                                type="text"
                                                placeholder="Enter language"
                                                className="form-input"
                                            />
                                            <ErrorMessage
                                                name="language"
                                                component="div"
                                                className="text-red-500 text-xs mt-1"
                                            />
                                        </div>
                                    </div>



                                    <div className="grid grid-cols-12 gap-4 mt-2">
                                        <div className="col-span-6 md:col-span-4">
                                            <label className="text-xs font-medium text-slate-600 ">
                                                Status
                                            </label>
                                            <SelectDropdown
                                                options={STATUS_DATA}
                                                value={values.status}
                                                onChange={(value) => setFieldValue("status", value)}
                                                placeholder="Select Availability"
                                            />
                                            <ErrorMessage
                                                name="status"
                                                component="div"
                                                className="text-red-500 text-xs mt-1"
                                            />
                                        </div>

                                        <div className="col-span-6 md:col-span-4">
                                            <label className="text-xs font-medium text-slate-600 ">
                                                Published Year
                                            </label>
                                            <Field
                                                name="publishedYear"
                                                type="number"
                                                min="1900"
                                                max={new Date().getFullYear()}
                                                placeholder="Enter year"
                                                className="form-input"
                                            />
                                            <ErrorMessage
                                                name="publishedYear"
                                                component="div"
                                                className="text-red-500 text-xs mt-1"
                                            />
                                        </div>

                                        <div className="col-span-12 md:col-span-3">
                                            <label className="text-xs font-medium text-slate-600 ">
                                                Pages
                                            </label>
                                            <Field
                                                name="pages"
                                                type="number"
                                                className="form-input"
                                            />
                                            <ErrorMessage
                                                name="pages"
                                                component="div"
                                                className="text-red-500 text-xs mt-1"
                                            />
                                        </div>
                                    </div>



                                    <div className="flex justify-end mt-7">
                                        <button
                                            className="add-btn"
                                            type="submit"
                                            disabled={addBookMutation.status === 'pending'}
                                        >
                                            {addBookMutation.status === 'pending' ? 'Adding...' : 'ADD BOOK'}
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>

        </DashboardLayout>
    );
};

export default AddBook;
