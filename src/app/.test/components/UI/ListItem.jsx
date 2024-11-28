const ListItem = ({children, className, text}) => {

    return (
        <>
            <li className={`${className} flex w-full transition-colors duration-300 ease-in`}>
                {children}
                {text}
            </li>
        </>
    )
}
export default ListItem