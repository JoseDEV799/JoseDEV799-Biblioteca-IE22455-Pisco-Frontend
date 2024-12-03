import { FaSave } from "react-icons/fa";

const ButtonUpdate = ({ onClick }) => {

    return (
        <>
            <button
                type="submit"
                className="flex items-center justify-center whitespace-nowrap p-2 rounded-lg shadow-md transition-all duration-300
                text-base text-white
                bg-yellow-500 hover:bg-yellow-400
                active:scale-105"
                onClick={onClick}>
                <FaSave className="size-5 mr-1"/>
                Guardar
            </button>
        </>
    )
}

export default ButtonUpdate