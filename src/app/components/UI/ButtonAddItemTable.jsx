import { FaPlus } from "react-icons/fa";

const ButtonAddItemTable = ({ text, onClick }) => {

    return (
        <button
            className="flex items-center whitespace-nowrap p-2 rounded-lg shadow-md transition-all duration-300
                text-white 
                bg-green-500 hover:bg-green-400
                active:scale-105
                desktop:text-lg
                laptop-standar:text-md
                tablet:text-sm
                max-tablet:text-xs
                "
            onClick={()=>onClick()}>
                {text}
                <FaPlus className="size-4 ml-2 fill-white"/>
        </button>
    )
}

export default ButtonAddItemTable