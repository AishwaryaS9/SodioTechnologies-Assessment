import { GrTrash } from "react-icons/gr";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineCalendarMonth } from "react-icons/md";
import type { Books } from "../utils/interface";

interface BookCardProps {
  book: Books;
  onEdit: (book: Books) => void;
  onDelete?: (bookId: string) => void;
}

const BookCard = ({ book, onEdit, onDelete }: BookCardProps) => {
  const getStatusTagColor = () => {
    switch (String(book.available)) {
      case "true":
        return "text-cyan-600 bg-cyan-50 border border-cyan-200";
      case "false":
        return "text-red-600 bg-red-50 border border-red-200";
      default:
        return "text-violet-600 bg-violet-50 border border-violet-200";
    }
  };

  return (
    <article
      className="group relative bg-white rounded-2xl p-4 sm:p-5 shadow-md shadow-gray-100 border border-gray-200"
      aria-labelledby={`book-title-${book._id}`}
      tabIndex={0}
    >
      <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
        <span
          className={`text-[10px] sm:text-[11px] font-medium ${getStatusTagColor()} px-2 sm:px-3 py-0.5 sm:py-1 rounded-full`}
          aria-label={`Book is ${book.available ? "Available" : "Issued"}`}
        >
          {book.available ? "Available" : "Issued"}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <h3
          id={`book-title-${book._id}`}
          className="text-sm sm:text-md font-medium text-gray-800 leading-tight line-clamp-2"
        >
          {book.title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 line-clamp-1 leading-6">
          {book.author}
        </p>
        {book.genre && (
          <span
            className="inline-block w-fit mt-1 text-[10px] sm:text-[11px] font-medium text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full"
            aria-label={`Genre: ${book.genre}`}
          >
            {book.genre}
          </span>
        )}
      </div>

      <hr className="border-t border-gray-100 my-3 sm:my-4" />

      <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-gray-700">
        <div className="flex items-center gap-1 sm:gap-2">
          <MdOutlineCalendarMonth
            size={14}
            className="text-gray-500"
            aria-hidden="true"
          />
          <span>Year:</span>
          <span className="font-medium">{book.publishedYear}</span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 text-gray-500">
          <button
            type="button"
            onClick={() => onEdit(book)}
            aria-label={`Edit book: ${book.title}`}
            className="hover:scale-110 transition-transform"
          >
            <FaRegEdit title="Edit Book" size={14} className="cursor-pointer" />
          </button>
          <button
            type="button"
            onClick={() => onDelete?.(book._id)}
            aria-label={`Delete book: ${book.title}`}
            className="hover:scale-110 transition-transform"
          >
            <GrTrash
              title="Delete book"
              size={14}
              color="red"
              className="cursor-pointer"
            />
          </button>
        </div>
      </div>
    </article>
  );
};

export default BookCard;
