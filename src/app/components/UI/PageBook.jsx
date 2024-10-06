import React from "react";
const PageBook = React.forwardRef((props, ref) => {

    /* 
        El ref se usa implicitamente, es decir, cualquier contendor este actuara como un componente hijo, 
        del cual, el componente Padre podra acceder a sus atributos.
    */
    return (
        <div className="demoPage border-2 w-full h-full flex" ref={ref}>
            <div className="w-full h-full">{props.children}</div>
            {/* <p>Page number: {props.number}</p> */}
        </div>
    );
});

export default PageBook;