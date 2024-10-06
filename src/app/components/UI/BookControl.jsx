import { SliderBook, Button } from "./index"
import {
    ArrowRightIcon,
    ArrowLeftIcon,
    MagnifyingGlassPlusIcon,
    MagnifyingGlassMinusIcon
} from '@heroicons/react/24/solid';
const BookControl = ({ value, handleValue, previousPage, nextPage, pageNumber, numPages, progress = false }) => {

    return (
        <>
            <div className='absolute bottom-0 space-x-1 left-0 right-0 w-full flex justify-center items-center size-10 text-2xl z-10'>
                <div className='flex justify-center items-center border px-5 rounded-lg bg-slate-200 dark:bg-slate-800 space-x-5'>
                    <div className="flex items-center">
                        <Button
                            onClick={previousPage}
                            className={`group z-10 duration-300 ${pageNumber == 1 ? 'scale-0' : 'scale-100'}`}>
                            <ArrowLeftIcon className='group group:duration-500 group-hover:scale-110  size-4 sm:size-5 active:fill-slate-900 fill-slate-700 dark:fill-white' />
                        </Button>
                        {/* <span className='font-nunito text-slate-400 text-xs sm:text-base md:text-xl'>{currentIndex + 1 < 10 ? `0${currentIndex + 1}` : `${currentIndex + 1}`} / {numPages}</span> */}
                        <span className='font-nunito text-slate-700 dark:text-white text-base sm:text-base md:text-xl mx-1 whitespace-nowrap'>{pageNumber < 10 ? `0${pageNumber}` : `${pageNumber}`} / {numPages}</span>
                        <Button
                            onClick={nextPage}
                            className={`group z-10 duration-300 ${pageNumber == numPages ? 'scale-0' : 'scale-100'}`}>
                            <ArrowRightIcon className='group group:duration-500 group-hover:scale-110 active:fill-slate-900 size-4 sm:size-5 fill-slate-700 dark:fill-white' />
                        </Button>
                    </div>

                    {progress && (
                        <span
                            className='relative flex items-center sm:w-96 w-48 h-2 bg-gradient-to-r rounded-full border-2'
                            style={{
                                background: `linear-gradient(to right, 
                                #FDC367 ${(pageNumber / (numPages - 1)) * 100}%, 
                                white ${((pageNumber + 1) / (numPages - 1)) * 100}%, 
                                white 100%)`
                            }}>
                        </span>
                    )}
                    <div className="flex items-center">
                        <MagnifyingGlassMinusIcon className='size-4 sm:size-5 fill-slate-700 dark:fill-white' />
                        <SliderBook
                            min={0.5}
                            max={4}
                            step={0.1}
                            value={value}
                            onChange={handleValue}
                            
                        />
                        <MagnifyingGlassPlusIcon className='size-4 sm:size-5 fill-slate-700 dark:fill-white' />
                    </div>

                </div>
            </div>
        </>
    )
}
export default BookControl