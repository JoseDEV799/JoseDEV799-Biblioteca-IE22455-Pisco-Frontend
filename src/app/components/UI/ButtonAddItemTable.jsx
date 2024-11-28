import { FaPlus } from "react-icons/fa";

const ButtonAddItemTable = ({ text, onClick }) => {

    return (
        <button
            className="flex items-center whitespace-nowrap p-2 rounded-lg shadow-md transition-all duration-300
                text-base text-white 
                bg-green-500 hover:bg-green-400
                active:scale-105"
            onClick={()=>onClick()}>
                {text}
                <FaPlus className="size-4 ml-2 fill-white"/>
        </button>
    )
}

export default ButtonAddItemTable