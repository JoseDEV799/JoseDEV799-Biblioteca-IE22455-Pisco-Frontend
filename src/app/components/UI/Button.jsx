const Button = ({type, text, className, onClick, children, justify='center'}) => {

    return (
        <>
            <button type={type} onClick={onClick}
            className={`${className} font-nunito flex justify-${justify} items-center transition-all`}>
                {text}
                {children}
            </button>
        </>
    )
}

export default Button