import { useEffect, useRef, useState } from "preact/hooks";
import IconCircleChevronsRight from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/chevron-right.tsx";
import IconCircleChevronsLeft from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/chevron-left.tsx";

interface CarouselProps {
  data: { text: string; image?: string }[];
  title: string;
};

const Carousel = ({ data, title }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [flipClass, setFlipClass] = useState('');
  const startXRef = useRef(0);
  const touchRef = useRef<HTMLDivElement>(null);
  
  const nextSlide = () => {
    setFlipClass('page-flip');
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === data.length - 1 ? 0 : prevIndex + 1
      );
      setFlipClass('');
    }, 300);
    setTimeout(() => {
      setAnimating(false);
    }, 400);
  };

  const prevSlide = () => {
    setFlipClass('page-flip-back');
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? data.length - 1 : prevIndex - 1
      );
      setFlipClass('');
    }, 300);
    setTimeout(() => {
      setAnimating(false);
    }, 400);
  };

  const handleTouchStart = (e: TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!animating) {
      const endX = e.touches[0].clientX;
      const deltaX = startXRef.current - endX;

      if (deltaX > 50) {
        nextSlide();
      } else if (deltaX < -50) {
        prevSlide();
      }
    }
  };

  useEffect(() => {
    const touchElement = touchRef.current;
    if (touchElement) {
      touchElement.addEventListener("touchstart", handleTouchStart);
      touchElement.addEventListener("touchmove", handleTouchMove);

      return () => {
        touchElement.removeEventListener("touchstart", handleTouchStart);
        touchElement.removeEventListener("touchmove", handleTouchMove);
      };
    }
  }, [animating]);

  const currentSlide = data[currentIndex];

  return (
    <div ref={touchRef} className="w-full height-webkit-fill mx-auto overflow-hidden flex flex-col justify-between text-[#110056] container-flip">
      <div className="text-center p-4 pt-24 md:pt-20 text-[#110056]">
        <h1 className="text-2xl md:text-3xl text-center font-bold">{title}</h1>
      </div>
      <div
        className={`flex-grow flex items-center justify-center flip ${flipClass} transition-opacity ${
          animating ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="w-full absolute p-4 md:px-24 h-full flex flex-grow items-center justify-center transition-transform duration-500 ease-in-out transform">
          {currentSlide.image && currentSlide.text ? (
            <div className="flex flex-col md:px-10 md:flex-row items-center justify-center w-full h-full">
              <div className="flex-1 px-4 pb-4 md:pb-0 order-1 md:order-1 flex items-center justify-center w-full max-h-full h-full">
                <img
                  src={currentSlide.image}
                  alt={currentSlide.text}
                  className="rounded-xl w-auto max-h-full object-contain"
                />
              </div>
              <div className="flex-1 px-4 order-2 md:order-2 text-center md:text-left overflow-auto max-h-full">
                <div className="overflow-auto text-left text-md md:text-lg">
                  {currentSlide.text}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-full md:px-12">
              {currentSlide.image ? (
                <img
                  src={currentSlide.image}
                  alt={currentSlide.text}
                  className="rounded-xl h-full object-contain"
                />
              ) : (
                <div className="text-left text-md md:text-lg overflow-auto max-h-full">
                  {currentSlide.text}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="bottom-0 left-0 right-0 p-2 flex items-center justify-center w-full">
        <button
          className={`text-xl pr-2 ${currentIndex === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-[#110056] cursor-pointer'}`}
          onClick={prevSlide}
          aria-label="Previous slide"
          disabled={animating || currentIndex === 0}
        >
          <IconCircleChevronsLeft
            color={currentIndex === 0 ? "#cccccc" : "#110056"}
            class="w-8 h-8"
            aria-hidden="true"
          />
        </button>
        <span className="text-sm text-[#110056]">
          {currentIndex + 1} of {data.length}
        </span>
        <button
          className={`text-xl pl-2 ${currentIndex === data.length - 1 ? 'text-gray-400 cursor-not-allowed' : 'text-[#110056] cursor-pointer'}`}
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <IconCircleChevronsRight
            color={currentIndex === data.length - 1 ? "#cccccc" : "#110056"}
            class="w-8 h-8"
            aria-hidden="true"
            disabled={animating || currentIndex === data.length - 1}
          />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
