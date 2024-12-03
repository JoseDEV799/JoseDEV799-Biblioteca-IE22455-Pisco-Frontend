const ImageModalPortada = ({ src, alt, className}) => {

    return (
        <img
            src={src}
            alt={alt}
            className={`flex flex-shrink-0 my-10 max-h-full object-contain w-auto h-auto max-w-full ${className}`} />
    )
}

export default ImageModalPortada