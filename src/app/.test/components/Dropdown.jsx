const DropDown = ({isOpenDropdown, className, classOpen, classClose, children, onBlur, onFocus}) => {

    return (
        <>
            <div className={`${className} transition-all ease-out duration-300 absolute shadow-md shadow-gray-200
            ${isOpenDropdown ? `${classOpen}` : `${classClose}`}
            `}
            onBlur={onBlur} onFocus={onFocus}>
                {children}
            </div>
        </>
    )
}

export default DropDown