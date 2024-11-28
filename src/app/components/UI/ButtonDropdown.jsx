import { FaChevronDown } from "react-icons/fa6";

const ButtonDropdown = ({ stateDropdown }) => {

    return (
        <button className="flex"
            onClick={() => stateDropdown()}>
            <FaChevronDown className="size-3 fill-white" />
        </button>
    )
}

export default ButtonDropdown