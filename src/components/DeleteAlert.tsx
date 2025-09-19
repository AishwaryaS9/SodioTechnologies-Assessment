import { RiCloseLargeLine } from "react-icons/ri";
import type { DeleteAlertProps } from "../utils/interface";

const DeleteAlert = ({ content, isOpen, onDelete, onClose }: DeleteAlertProps) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex justify-center items-center
               w-full h-screen bg-black/20 bg-opacity-50 overflow-y-auto"
            role="presentation"
            aria-hidden={!isOpen}
            onClick={onClose}
        >
            <div
                className="relative p-4 w-full max-w-2xl max-h-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="delete-dialog-title"
                aria-describedby="delete-dialog-description"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative bg-white rounded-lg shadow-sm">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                        <h3
                            id="delete-dialog-title"
                            className="text-lg font-medium text-gray-900 dark:text-white"
                        >
                            Delete Book
                        </h3>
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close delete confirmation dialog"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center cursor-pointer"
                        >
                            <RiCloseLargeLine size={15} color="#212121" aria-hidden="true" className="cursor-pointer" />
                        </button>
                    </div>

                    <div className="p-4 md:p-5 space-y-4">
                        <div>
                            <p
                                id="delete-dialog-description"
                                className="text-sm text-gray-700 dark:text-gray-300"
                            >
                                {content}
                            </p>

                            <div className="flex justify-end mt-6">
                                <button
                                    onClick={onClose}
                                    type="button"
                                    aria-label="Cancel delete action"
                                    className="px-4 py-2 mx-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={onDelete}
                                    type="button"
                                    aria-label="Confirm delete action"
                                    className="flex items-center justify-center gap-1.5 text-xs md:text-sm font-medium text-rose-500 hover:bg-rose-100 whitespace-nowrap
                                    bg-rose-50 border border-rose-100 rounded-lg px-4 py-2 cursor-pointer focus:outline-none"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteAlert;
