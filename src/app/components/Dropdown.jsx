const DropDown = ({isOpenDropdown, className, classOpen, classClose, children}) => {

    return (
        <>
            <div className={`${className} transition-all ease-out duration-300 absolute shadow-md shadow-gray-200
            ${isOpenDropdown ? `${classOpen}` : `${classClose}`}
            `}>
                {children}
            </div>
        </>
    )
}

export default DropDown