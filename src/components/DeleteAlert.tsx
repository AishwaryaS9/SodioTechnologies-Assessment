import { X } from "lucide-react";

interface DeleteAlertProps {
    content: string;
    isOpen: boolean;
    onDelete: () => void;
    onClose: () => void;
}

const DeleteAlert = ({ content, isOpen, onDelete, onClose }: DeleteAlertProps) => {
    if (!isOpen) return;
    return (
        <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center
        w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden bg-black/20 bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Delete Book</h3>
                        <button type='button' onClick={onClose}
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center
                             cursor-pointer">
                            <X color='#212121' className="cursor-pointer" />
                        </button>
                    </div>
                    <div className="p-4 md:p-5 space-y-4">
                        <div>
                            <p className="text-sm">
                                {content}
                            </p>
                            <div className="flex justify-end mt-6">
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 mx-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button className='flex items-center justify-center gap-1.5 text-xs md:text-sm font-medium text-rose-500 whitespace-nowrap
                bg-rose-50 border border-rose-100 rounded-lg px-4 py-2 cursor-pointer'
                                    type='button'
                                    onClick={onDelete}>
                                    Delete
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteAlert
