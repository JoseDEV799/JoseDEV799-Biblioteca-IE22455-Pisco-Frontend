import { MdDelete } from "react-icons/md";

const ButtonDelete = ({ onClick, type = 'button' }) => {

    return (
        <>
            <button
                type={type}
                className="flex items-center justify-center whitespace-nowrap p-2 rounded-lg shadow-md transition-all duration-300
                text-base text-white 
                bg-red-600 hover:bg-red-500
                active:scale-105"
                onClick={onClick}>
                <MdDelete className="size-5 mr-1"/>
                Eliminar
            </button>
        </>
    )
}

export default ButtonDelete