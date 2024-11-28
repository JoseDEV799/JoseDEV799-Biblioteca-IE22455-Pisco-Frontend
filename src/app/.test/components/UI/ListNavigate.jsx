import { useNavigate } from 'react-router-dom'

const ListNavigate = ({className, text, link}) => {

    const navigate = useNavigate()

    const goingRoute = () => {
        navigate(link)
    }

    return (
        <>
            <li 
                onClick={goingRoute}
                className={`${className} transition-all duration-300 ease-in`}>
                {text}
            </li>
        </>
    )
}
export default ListNavigate