const Label = ({text, className}) => {

    return (
        <>
            <label className={`${className}`}>
                {text}
            </label>
        </>
    )
}

export default Label