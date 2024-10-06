const ListItem = ({children, className}) => {

    return (
        <>
            <li className={`${className} flex w-full transition-colors duration-300 ease-in`}>
                {children}
            </li>
        </>
    )
}
export default ListItem