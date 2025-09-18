import React from 'react'

export const BookCardSkeleton = () => {
    return (
        <div className="border border-gray-200 rounded-lg p-4 animate-pulse">
            <div className="h-40 bg-gray-100 rounded mb-4"></div>
            <div className="h-4 bg-gray-100 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-100 rounded w-1/2 mb-2"></div>
            <div className="h-6 bg-gray-100 rounded w-1/4 mt-4"></div>
        </div>
    )
}

export const PaginationSkeleton = () => {
    return (
        <div className="flex justify-center items-center mt-6 space-x-2">
            {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
            ))}
        </div>
    );
};