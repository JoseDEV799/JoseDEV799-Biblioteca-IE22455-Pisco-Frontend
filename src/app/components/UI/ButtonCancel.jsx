import { MdOutlineClose } from "react-icons/md";


const ButtonCancel = ({ onClick }) => {

    return (
        <>
            <button
                type="button"
                className="flex items-center justify-center whitespace-nowrap p-2 rounded-lg shadow-md transition-all duration-300
                text-base border-2 
                text-gray-600 hover:text-gray-700
                border-gray-400 hover:border-gray-500
                bg-white hover:bg-gray-50
                active:scale-105"
                onClick={() => onClick()}>
                <MdOutlineClose className="size-5 mr-1 fill-gray-600 hover:fill-gray-500"/>
                Cancelar
            </button>
        </>
    )
}

export default ButtonCancel