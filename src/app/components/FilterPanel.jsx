const FilterPanel = ({ children, className, isOpenFilter, classOpen, classClose }) => {

    return (
        <>
            {/* <div className={`${className} flex flex-col w-full rounded-md max-h-[calc(100vh-10rem)] transition-all duration-300 ease-out */}
            <div className={`${className} flex flex-col w-full rounded-md transition-all duration-100 ease-out
            ${isOpenFilter ? `${classOpen}` : `${classClose}`}
            `}>
                {children}
            </div>
        </>
    )
}

export default FilterPanel