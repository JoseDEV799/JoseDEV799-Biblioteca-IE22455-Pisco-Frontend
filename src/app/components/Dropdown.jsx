const Dropdown = ({ state = false, className, width, height, children }) => {

    return (
        <div
            className={`
                transition-all duration-500 ease-out absolute rounded-md z-10
                ${className}
                ${state ? 'opacity-100 pointer-events-auto ' : 'opacity-0 pointer-events-none'}
            `}

            style={{
                width: `${width}px`,
                height: `${height}px`,
            }}
        >
            {children}
        </div>
    )
}

export default Dropdown