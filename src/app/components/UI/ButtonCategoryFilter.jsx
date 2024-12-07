const ButtonCategoryFilter = ({ title, onClick, keyApi = 'Default', isSelect }) => {
    return (
        <button key={keyApi}
            type="button" onClick={onClick}
            className={`flex flex-shrink-0 border py-2 px-4 rounded-full transition-all duration-300 text-sm shadow-sm
            ${isSelect ? 'bg-amber-400 text-white font-semibold' : 'text-black bg-white hover:bg-gray-100'}`}>
            {title}
        </button>
    )
}

export default ButtonCategoryFilter