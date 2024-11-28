const BookDetails = ({id,title, author, year, category, portada}) => {

    return (
        <>
            <div>
                <span>{id}</span>
                <span>{title}</span>
                <span>{author}</span>
                <span>{year}</span>
                <span>{category}</span>
                <span>{portada}</span>
            </div>
        </>
    )
}

export default BookDetails