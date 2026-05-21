import { useEffect, useRef, useState } from "preact/hooks";
import IconCircleChevronsRight from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/chevron-right.tsx";
import IconCircleChevronsLeft from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/chevron-left.tsx";
import IconBook from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/book.tsx";
import IconShare from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/share.tsx";

interface CarouselProps {
  data: { text: string; image?: string }[];
  id: string;
}

const Carousel = ({ data, id }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [flipClass, setFlipClass] = useState("");
  const startXRef = useRef(0);
  const touchRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    if (animating || currentIndex === data.length) {
      return;
    }

    setFlipClass("page-flip");
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === data.length ? 0 : prevIndex + 1
      );
      setFlipClass("");
    }, 300);
    setTimeout(() => {
      setAnimating(false);
    }, 400);
  };

  const prevSlide = () => {
    if (animating) {
      return;
    }

    if (currentIndex === 0) {
      globalThis.location.href = `/story/${id}`;
      return;
    }

    setFlipClass("page-flip-back");
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? data.length : prevIndex - 1
      );
      setFlipClass("");
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
  const renderPageText = (text: string) => (
    <p className="text-left text-md md:text-lg">
      <span className="text-3xl font-bold leading-none text-[#110056] md:text-4xl">
        {text.charAt(0)}
      </span>
      {text.slice(1)}
    </p>
  );

  return (
    <div
      ref={touchRef}
      className="w-full height-webkit-fill mx-auto box-border overflow-hidden relative pt-12 md:pt-0 text-[#110056] container-flip"
    >
      <div
        className={`h-full min-h-0 overflow-hidden flex items-center justify-center flip ${flipClass} transition-opacity ${
          animating ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="w-full min-h-0 h-full overflow-hidden relative px-0 py-0 md:px-24 md:pt-24 md:pb-8 flex items-center justify-center transition-transform duration-500 ease-in-out transform">
          {currentIndex < data.length
            ? (
              <div className="w-full h-full min-h-0 bg-[#f8f6ff] border border-[#d8cffd]">
                <div className="h-full min-h-0 overflow-hidden md:pt-0">
                  {currentSlide.image && currentSlide.text
                    ? (
                      <div className="flex flex-col md:grid md:grid-cols-2 items-stretch md:items-center justify-start md:justify-center w-full h-full min-h-0 overflow-hidden">
                        <div className="relative h-[66%] shrink-0 md:shrink md:min-w-0 px-0 pb-2 md:pb-0 order-1 md:order-1 flex items-center justify-center w-full md:max-h-full min-h-0 md:h-full overflow-hidden md:border-r md:border-[#d8cffd]">
                          <img
                            src={currentSlide.image}
                            alt={currentSlide.text}
                            className="w-full h-full max-w-full max-h-full object-cover md:object-cover"
                          />
                          <div className="absolute bottom-4 left-4 hidden rounded-full bg-black/25 px-3 py-1 text-sm text-white shadow-sm md:block">
                            {currentIndex + 1}
                          </div>
                        </div>
                        <div className="shrink md:min-w-0 px-4 pt-2 pb-24 md:px-10 md:pt-0 md:pb-20 order-2 md:order-2 text-center md:text-left overflow-y-auto max-h-full min-h-0">
                          {renderPageText(currentSlide.text)}
                        </div>
                      </div>
                    )
                    : (
                      <div className="flex items-center justify-center w-full h-full min-h-0 overflow-hidden md:px-12">
                        {currentSlide.image
                          ? (
                            <img
                              src={currentSlide.image}
                              alt={currentSlide.text}
                              className="w-full h-full max-h-full max-w-full object-cover"
                            />
                          )
                          : (
                            <div className="h-full overflow-y-auto px-4 pt-4 pb-24 md:pb-20">
                              {renderPageText(currentSlide.text)}
                            </div>
                          )}
                      </div>
                    )}
                </div>
              </div>
            )
            : (
              <div className="w-full h-full min-h-0 bg-[#f8f6ff] border border-[#d8cffd]">
                <div className="grid h-full min-h-0 grid-rows-[minmax(0,1fr)_auto] overflow-hidden px-6 py-8 md:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] md:grid-rows-1 md:px-10 md:py-0">
                  <div className="flex min-h-0 flex-col items-center justify-center gap-6 text-center">
                    <h1 className="text-5xl font-bold text-[#110056]">
                      THE END
                    </h1>
                    <div className="max-w-[456px] bg-[#efeaff] border border-[#d8cffd] rounded-[14px] px-6 py-4 text-sm leading-[21px] text-[#110056]">
                      Love this story? Turn it into a real book. Makes a perfect
                      bedtime storybook, keepsake, or gift for kids.
                    </div>
                  </div>
                  <div className="hidden h-full bg-[#d8cffd] md:block" />
                  <div className="flex min-h-0 items-center justify-center pt-6 md:pt-0">
                    <div className="flex flex-col items-center gap-4 w-[21rem] max-w-full">
                      <a
                        href={`https://curie-backend-388092980975.us-west1.run.app/stories/print/orders/start?story_id=${id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full px-6 py-3 bg-[#110056] text-white rounded-md shadow-md hover:bg-[#130175] transition font-bold flex items-center justify-center gap-2"
                      >
                        <IconBook class="w-5 h-5" aria-hidden="true" />
                        Make it a Book
                      </a>
                      <button
                        onClick={() => {
                          globalThis.location.href = `/story/${id}`;
                        }}
                        className="w-full px-6 py-3 bg-white border border-[#d8cffd] text-[#110056] rounded-md shadow-md hover:bg-[#f8f6ff] transition font-bold flex items-center justify-center gap-2"
                      >
                        Read again
                      </button>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(
                            globalThis.location.href.replace("/viewbook", ""),
                          )
                            .then(() => alert("Link copied to clipboard!"))
                            .catch(() => alert("Failed to copy the link."));
                        }}
                        className="w-full px-6 py-3 bg-white border border-[#d8cffd] text-[#110056] rounded-md shadow-md hover:bg-[#f8f6ff] transition font-bold flex items-center justify-center gap-2"
                      >
                        <IconShare class="w-5 h-5" aria-hidden="true" />
                        Share
                      </button>
                      <div className="mt-2 text-sm text-gray-500">
                        © {new Date().getFullYear()} Curiosity Labs
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-[#110056] shadow-lg">
        <button
          className={`flex h-8 w-8 items-center justify-center rounded-full transition ${
            animating
              ? "cursor-not-allowed text-[#110056]/35"
              : "cursor-pointer text-[#110056] hover:bg-[#efeaff]"
          }`}
          onClick={prevSlide}
          aria-label="Previous slide"
          disabled={animating}
        >
          <IconCircleChevronsLeft
            color={animating ? "rgba(17,0,86,0.35)" : "#110056"}
            class="w-7 h-7"
            aria-hidden="true"
          />
        </button>
        <span className="whitespace-nowrap px-1 text-sm text-[#110056]">
          Page {currentIndex + 1} of {data.length + 1}
        </span>
        <button
          className={`flex h-8 w-8 items-center justify-center rounded-full transition ${
            currentIndex === data.length || animating
              ? "cursor-not-allowed text-[#110056]/35"
              : "cursor-pointer text-[#110056] hover:bg-[#efeaff]"
          }`}
          onClick={nextSlide}
          aria-label="Next slide"
          disabled={animating || currentIndex === data.length}
        >
          <IconCircleChevronsRight
            color={currentIndex === data.length || animating
              ? "rgba(17,0,86,0.35)"
              : "#110056"}
            class="w-7 h-7"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
