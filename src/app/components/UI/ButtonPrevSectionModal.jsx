import { GrLinkPrevious } from "react-icons/gr";

const ButtonPrevSectionModal = ({className, onClick, type = 'button'}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`absolute z-10 left-20 bottom-0 transition-all duration-300 ${className}`}>
            <GrLinkPrevious className="size-6" />
        </button>
    )
}

export default ButtonPrevSectionModal