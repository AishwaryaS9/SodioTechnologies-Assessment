
const BookCard = ({ book }) => {
    const getStatusTagColor = () => {
        switch (String(book.available)) { 
            case "true":
                return "text-cyan-500 bg-cyan-50 border border-cyan-500/10";
            case "false":
                return "text-red-500 bg-red-50 border border-red-500/20";
            default:
                return "text-violet-500 bg-violet-50 border border-violet-500/10";
        }
    };

    return (
        <div className="relative bg-white rounded-xl py-4 shadow-md shadow-gray-100 border border-gray-200/50 cursor-pointer">
            <div className="flex items-end gap-3 px-4">
                <div className={`text-[11px] font-medium ${getStatusTagColor()} px-4 py-0.5 rounded`}>
                    {book.available ? "Available" : "Out of Stock"}
                </div>
            </div>

            <div className="px-4 border-l-[3px] border-gray-200">
                <p className="text-sm font-medium text-gray-800 mt-4 line-clamp-2">
                    {book.title}
                </p>
                <p className="text-xs text-gray-500 mt-1.5 line-clamp-2 leading-[18px]">
                    {book.author}
                </p>
            </div>

            <div className="px-4">
                <div className="flex items-center justify-between my-1">
                    <div>
                        <label className="text-xs text-gray-500">Published Year</label>
                        <p className="text-[13px] font-medium text-gray-900">
                            {book.publishedDate}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookCard;
