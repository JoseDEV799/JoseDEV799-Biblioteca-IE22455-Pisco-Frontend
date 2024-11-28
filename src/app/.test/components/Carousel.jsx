import { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { Button } from './UI';

const Carousel = ({ children, lengthList = 0, }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [countItems, setCountItems] = useState(window.innerWidth > 1024 ? 50 : 100);

  useEffect(() => {
    const resize = () => {
      setCountItems(window.innerWidth > 1024 ? 50 : 100)
    }
    resize()
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % lengthList);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + lengthList) % lengthList);
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div className={`flex transition-transform duration-500`}
        style={{ transform: `translateX(-${currentIndex * countItems}%)` }}> {/* Formula de carousel */}
        {children}
      </div>
      <Button className={`rounded-full absolute left-0 top-1/2 transition-transform active:scale-105 duration-500 -translate-y-1/2 bg-gray-800 text-white p-2
        ${currentIndex == 0 ? '-translate-x-96' : 'translate-x-0'}`}
        onClick={prevSlide}>
        <ChevronLeftIcon className='size-5 md:size-4 max-md:size-3 fill-white' />
      </Button>
      <Button className={`rounded-full absolute right-0 top-1/2 transition-transform active:scale-105 duration-500 -translate-y-1/2 bg-gray-800 text-white p-2
        ${currentIndex == lengthList - 2 && countItems == 50 ? 'translate-x-96' : 'translate-x-0'}
        ${currentIndex == lengthList - 1 && countItems == 100 ? 'translate-x-96' : 'translate-x-0'}
        `} onClick={nextSlide}>
        <ChevronRightIcon className='size-5 md:size-4 max-md:size-3 fill-white' />
      </Button>
    </div>
  );
};

export default Carousel;