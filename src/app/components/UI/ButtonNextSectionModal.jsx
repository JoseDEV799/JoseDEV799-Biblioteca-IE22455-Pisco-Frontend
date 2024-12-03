import { GrLinkNext } from "react-icons/gr";

const ButtonNextSectionModal = ({className, onClick, type = 'button'}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`absolute z-10 right-20 bottom-0  transition-all duration-300 ${className}`}>
            <GrLinkNext className="size-6" />
        </button>
    )
}

export default ButtonNextSectionModal