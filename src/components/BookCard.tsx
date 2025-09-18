import { Calendar, Edit, Trash } from "lucide-react";
import type { Books } from "../utils/interface";

interface BookCardProps {
  book: Books;
  onEdit: (book: Books) => void;
  onDelete?: (bookId: string) => void;
}

const BookCard = ({ book, onEdit, onDelete }: BookCardProps) => {
  console.log('test', book)

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
    <div className="group relative bg-white rounded-2xl p-5 shadow-md shadow-gray-100 border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
      <div className="absolute top-4 right-4">
        <span className={`text-[11px] font-medium ${getStatusTagColor()} px-3 py-1 rounded-full`}>
          {book.available ? "Available" : "Not Available"}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-lg font-semibold text-gray-900 leading-tight line-clamp-2">
          {book.title}
        </p>
        <p className="text-sm text-gray-500 line-clamp-1">{book.author}</p>
        {book.genre && (
          <span className="inline-block w-fit mt-1 text-[11px] font-medium text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full">
            {book.genre}
          </span>
        )}
      </div>

      <div className="border-t border-gray-100 my-4" />
      <div className="flex items-center justify-between text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <Calendar size={14} className="text-gray-400" />
          <span className="font-medium">{book.publishedYear}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-500 ">
          <Edit size={14} className="cursor-pointer" onClick={() => onEdit(book)} />
          <Trash size={14} color="red" className="cursor-pointer" onClick={() => onDelete?.(book._id)} />
        </div>

      </div>

    </div>
  );
};

export default BookCard;
