const CarouselCategories = ({ children }) => {
    return (
        <div className="flex w-full flex-shrink-0 bg-gray-50 h-14 border-y border-white shadow-sm overflow-x-auto items-center px-4 space-x-2"
            style={{ scrollbarWidth: 'none'}}>
            {children}
        </div>
    )
}

export default CarouselCategories