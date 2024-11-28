import { IoCheckmark } from "react-icons/io5";

const ButtonAccept = ({ onClick, type, text = 'Agregar' }) => {

    return (
        <>
            <button
                className="flex items-center justify-center whitespace-nowrap p-2 rounded-lg shadow-md transition-all duration-300
                text-base text-white 
                bg-green-600 hover:bg-green-500
                active:scale-105"
                type={type}
                onClick={onClick}>
                <IoCheckmark className="size-5 mr-1 stroke-3"/>
                {text}
            </button>
        </>
    )
}

export default ButtonAccept