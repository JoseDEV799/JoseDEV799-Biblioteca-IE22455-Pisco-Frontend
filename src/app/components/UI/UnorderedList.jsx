const UnorderedList = ({className, children}) =>{
    return (
        <>
            <ul className={`${className}`}>
                {children}
            </ul>
        </>
    )
}

export default UnorderedList