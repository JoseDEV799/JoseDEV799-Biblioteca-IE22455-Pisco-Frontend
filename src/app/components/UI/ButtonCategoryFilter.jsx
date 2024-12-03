const ButtonCategoryFilter = ({ title, onClick, keyApi = 'Default', isSelect }) => {
    return (
        <button key={keyApi}
            type="button" onClick={onClick}
            className={`flex flex-shrink-0 border-2 p-2 rounded-full transition-all duration-300 text-sm
            ${isSelect ? 'bg-amber-400 text-white' : 'text-black bg-white hover:bg-gray-100'}`}>
            {title}
        </button>
    )
}

export default ButtonCategoryFilter