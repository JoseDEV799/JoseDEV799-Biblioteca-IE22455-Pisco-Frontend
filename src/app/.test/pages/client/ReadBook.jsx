import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { Button, SliderBook, BookControl } from '../../components/UI/index';
import { ArrowUturnLeftIcon, } from '@heroicons/react/24/solid';
import '../../components/Styles/Scrollbar.css'
import pdf from '../../assets/pdf/hola.pdf'

// Configuracion del motor, no modificar, salvo si hay actualizacion del servidor para PDFJS
// Info: https://www.npmjs.com/package/react-pdf -  Use external CDN
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

function FlipBook() {

    const navigate = useNavigate()

    // Control PDF
    const [numPages, setNumPages] = useState(null) //Total de paginas
    const [pageNumber, setPageNumber] = useState(1) //Pagina actual

    //Verify Number Pages
    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages)
    }

    //Control Size PDF
    const [size, setSize] = useState(1)
    useEffect(() => {
        const updateSize = () => {
            if (window.innerWidth > 1536) {
                setSize(1);
            } else if (window.innerWidth < 1536 && window.innerWidth > 1280) {
                setSize(1.5);
            } else if (window.innerWidth < 1280 && window.innerWidth > 1024) {
                setSize(1.5);
            } else if (window.innerWidth < 1024 && window.innerWidth > 768) {
                setSize(0.8);
            } else if (window.innerWidth < 768 && window.innerWidth > 425) {
                setSize(0.6);
            } else if (window.innerWidth < 425) {
                setSize(0.5)
            }
            console.log(window.innerWidth);
        };
        updateSize();
        window.addEventListener('resize', updateSize);

        // Cleanup al desmontar el componente
        return () => {
            window.removeEventListener('resize', updateSize);
        };
    }, [])

    //Control Caroussel
    const previousPage = () => {
        if (pageNumber - 1 > 0) {
            setPageNumber(pageNumber - 1)
        }

    }

    const nextPage = () => {
        if (pageNumber + 1 < numPages + 1) {
            setPageNumber(pageNumber + 1)
        }

    }

    //Mover las paginas con las flechas del teclado
    useEffect(() => {
        const handleKey = (event) => {
            if (event.key === 'ArrowRight') {
                nextPage()
            }
            if (event.key === 'ArrowLeft') {
                previousPage()
            }
        }
        window.addEventListener('keydown', handleKey);
        return () => {
            window.removeEventListener('keydown', handleKey);
        };
    }, [pageNumber, numPages])

    // Cambiar de tamaño el pdf. Afecta en la resolucion
    const handleSize = (e) => {
        setSize(e.target.value)
    }


    //TODO Control de la ventana del PDF
    // Manipalar el DOM de la ventana del PDF
    const containerRef = useRef(null);

    // Verificar el arrastre de la ventana
    const [isDragging, setIsDragging] = useState(false)

    // Para guardar la posicion del mouse en relacion al contenedor
    const [startX, setStartX] = useState(0) //En X 
    const [startY, setStartY] = useState(0) //En Y

    // Guardar la posicion del scroll en el momento
    const [scrollLeft, setScrollLeft] = useState(0)
    const [scrollTop, setScrollTop] = useState(0)

    // Funcion para cuando se haga click del mouse
    const handleMouseDown = (e) => {
        setIsDragging(true)
        setStartX(e.pageX - containerRef.current.offsetLeft)
        setStartY(e.pageY - containerRef.current.offsetTop)
        setScrollLeft(containerRef.current.scrollLeft)
        setScrollTop(containerRef.current.scrollTop)
        containerRef.current.style.cursor = 'grabbing' // Cambia el cursor a "manito cerrada"
    }

    // Funcion para cuando se comience a mover el mouse
    const handleMouseMove = (e) => {
        if (!isDragging) return // Solo mover si está haciendo drag
        const x = e.pageX - containerRef.current.offsetLeft
        const y = e.pageY - containerRef.current.offsetTop
        const walkX = (x - startX) * 1.5 // Ajusta la velocidad de desplazamiento
        const walkY = (y - startY) * 1.5
        containerRef.current.scrollLeft = scrollLeft - walkX
        containerRef.current.scrollTop = scrollTop - walkY
    }

    // Funcion para cuando se suelte el click del mouse
    const handleMouseUp = () => {
        setIsDragging(false) // Termina el arrastre
        containerRef.current.style.cursor = 'grab' // Cambia el cursor de nuevo a "manito abierta"
    }

    // useEffect(() => {
    //     document.addEventListener('mouseup', handleMouseUp);

    //     return () => {
    //         document.removeEventListener('mouseup', handleMouseUp);
    //     };
    // }, []);


    return (
        <>
            <div className='flex w-full items-center justify-start'>
                <button
                    onClick={() => navigate('../principal')}
                    className='flex items-center justify-center transition-all duration-300 hover:scale-105 ml-4 mt-2 py-1 px-5 
                        bg-gradient-to-r from-yellow-400 to-orange-500 dark:from-yellow-300 dark:to-orange-500 
                        font-nunito md:text-xl text-sm  dark:text-white text-gray-800
                        shadow-md shadow-gray-300 dark:shadow-gray-600 rounded-lg'>
                    <ArrowUturnLeftIcon className='size-5 mr-1' />
                    Volver
                </button>
            </div>
            <span className='flex w-full justify-center font-bold text-xl xl:text-3xl dark:text-white uppercase'>
                Titulo del libro
            </span>

            <div className='flex w-full h-full relative overflow-x-hidden overflow-auto'>

                <BookControl
                    value={size}
                    handleValue={handleSize}
                    nextPage={nextPage}
                    previousPage={previousPage}
                    numPages={numPages}
                    pageNumber={pageNumber}
                />

                <div className='flex justify-center w-full'>
                    <div
                        ref={containerRef}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        className='flex overflow-y-auto scrollbar-hide'
                    // style={{
                    //     boxShadow: '0px 0px 6px  rgba(0, 0, 0, 0.1)'
                    // }}
                    >
                        <Document
                            file={pdf}
                            onLoadSuccess={onDocumentLoadSuccess}>
                            <Page
                                pageNumber={pageNumber}
                                renderTextLayer={false}
                                scale={size}
                                className={'shadow-md shadow-gray-300 dark:shadow-gray-900 mx-2'}
                            />
                        </Document>
                    </div>

                </div>

            </div>

        </>
    )
}

export default FlipBook;
