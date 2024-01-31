import { asset } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import { useEffect, useRef } from "preact/hooks";
import IconCircleChevronsRight from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/circle-chevrons-right.tsx";
import IconCircleChevronsLeft from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/circle-chevrons-left.tsx";

type BookData = {
  authors: string[];
  book_format: string;
  cover: string;
  created_at: string;
  for_ages: number[];
  genre: string;
  hash: null | string;
  is_read: boolean;
  is_saved: boolean;
  pages: { content: string; image_url: null | string; title: null | string }[];
  profile_id: string;
  read_count: number;
  saved_count: number;
  status: string;
  thread_id: string;
  title: string;
  visibility: string;
};

type CarouselProps = {
  showNavigation?: boolean;
  interval?: number;
  currentSlide?: number;
  automatic?: boolean;
  class?: string;
  data: BookData;
};

const Carousel = (props: CarouselProps) => {
  const SLIDE_DATA = props.data.pages.map((page) => {
    return {
      color: "bg-white",
      text: page.content,
      url: page.image_url ? page.image_url : asset("images/placeholder.png"),
    };
  });

  type SlideProps = {
    class?: string;
    key?: number;
    data: {
      color: string;
      text: string;
      url: string;
    };
  };

  const Slide = (props: SlideProps) => {
    const { key, data } = props;
    const { color, text, url } = data;
    if (props.class === undefined) props.class = "";
    return (
      <div
        key={key}
        class={`${props.class} ${color} h-screen w-auto flex-row text-center text-black p-3`}
      >
        <img
          src={url}
          alt={text}
          class="w-full rounded-lg h-auto object-scale-down "
        />
        <div>
          <p class="p-4 mt-6">{text}</p>
        </div>
        <div class="inset-x-0 bottom-0 flex flex-col-2 justify-center items-start">
          <button
            class={`col-span-1 ${CHEVRON_STYLE}`}
            onClick={() => chevronClick(previousSlide)}
          >
            <IconCircleChevronsLeft class="w-10 h-10" aria-hidden="true" />
            {/* <span class="sr-only">Previous slide</span> */}
          </button>
          <button
            class={`col-span-1 ${CHEVRON_STYLE}`}
            onClick={() => chevronClick(nextSlide)}
          >
            <IconCircleChevronsRight class="w-10 h-10" aria-hidden="true" />
            {/* <span class="sr-only">Next slide</span> */}
          </button>
        </div>
        <div>
          {SHOW_NAVIGATION &&
            <DotsNavigation />}
        </div>
      </div>
    );
  };

  const NAVIGATION_COLOR = `hover:text-gray-300 text-[#110056]`;
  const CHEVRON_STYLE = `z-30 w-10 h-10 ${NAVIGATION_COLOR} cursor-pointer`;
  const SHOW_NAVIGATION = props.showNavigation === false ? false : true;
  const SLIDE_INTERVAL = props.interval ? props.interval : 3500;
  const currentSlide = useSignal(props.currentSlide ? props.currentSlide : 0);
  const automatic = useSignal(props.automatic === false ? false : true);
  const slideshowRef = useRef<HTMLDivElement>(null);

  const slideClasses = (idx = 0) => {
    let outgoingSlide = currentSlide.value - 1;
    let incomingSlide = currentSlide.value + 1;
    if (outgoingSlide === -1) outgoingSlide = SLIDE_DATA.length - 1;
    if (incomingSlide === SLIDE_DATA.length) incomingSlide = 0;
    const TRANSITION_CLASS = () => {
      if (currentSlide.value === idx) return "translate-x-0 z-20";
      if (incomingSlide === idx) return "translate-x-full z-10";
      if (outgoingSlide === idx) return "-translate-x-full z-10";
      return "translate-x-full";
    };
    return `slide absolute top-0 left-0 transition-all ease-in-out duration-700 transform ${TRANSITION_CLASS()}`;
  };

  const nextSlide = () => {
    if (SLIDE_DATA.length === currentSlide.value + 1) {
      currentSlide.value = 0;
    } else {
      currentSlide.value++;
    }
  };

  const previousSlide = () => {
    if (currentSlide.value === 0) {
      currentSlide.value = SLIDE_DATA.length - 1;
    } else {
      currentSlide.value--;
    }
  };

  const chevronClick = (doCallback = () => {}) => {
    if (automatic.value) automatic.value = false;
    return doCallback();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (automatic.value) nextSlide();
    }, SLIDE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const ArrowKeyNavigation = () => {
    const keydownHandler = (event: KeyboardEvent) => {
      if (automatic.value) automatic.value = false;
      switch (event.code) {
        case "ArrowLeft":
          event.preventDefault();
          previousSlide();
          break;
        case "ArrowRight":
          event.preventDefault();
          nextSlide();
          break;
        default:
          break;
      }
    };
    slideshowRef.current?.addEventListener("keydown", keydownHandler);
    return () =>
      slideshowRef.current?.removeEventListener("keydown", keydownHandler);
  };
  useEffect(ArrowKeyNavigation, []);

  const goToSlide = (slide_index = 0) => {
    if (automatic.value) automatic.value = false;
    currentSlide.value = slide_index;
  };

  const DotsNavigation = () => (
    <div class={"slide_nav z-30 w-full bottom-0 flex justify-center"}>
      {SLIDE_DATA.map((_item, idx) => {
        return (
          <button
            class={`px-1 ${NAVIGATION_COLOR}`}
            onClick={() => {
              goToSlide(idx);
            }}
            key={idx}
          >
            <span class="sr-only">Go to slide {idx}</span>
            {idx === currentSlide.value
              ? <span class="not-sr-only">●</span>
              : <span class="not-sr-only">○</span>}
          </button>
        );
      })}
    </div>
  );
  console.log(SLIDE_DATA);
  return (
    <div
      ref={slideshowRef}
      class={`slideshow relative flex-1 p-4 h-screen overflow-hidden ${
        props.class !== undefined ? props.class : ""
      }`}
      tabIndex={0}
    >
      {SLIDE_DATA.map((item, idx) => (
        <Slide
          data={item}
          key={idx}
          class={slideClasses(idx)}
        />
      ))}

      <Slide
        data={SLIDE_DATA[0]}
        class="opacity-0 pointer-events-none"
      />
    </div>
  );
};

export default Carousel;

//   return (
//     <div class="sm:grid sm:grid-cols-3 gap-4 p-4 m-4 items-start justify-center">
//       <div class="p-2 sm:col-span-2">
//         <h1 class="text-2xl md:text-3xl text-[#110056] text-center font-bold mb-2 md:text-left">
//           {data.title}
//         </h1>
//         <h2 class="text-lg text-[#1100567c] text-center mb-4 md:text-left">
//           - A Story by {data.authors.join(", ")}
//         </h2>
//         {data.pages.map((page, index) => (
//           <div key={index} class="mb-4">
//             <img
//               class="w-full rounded-lg shadow-2xl h-auto object-scale-down mb-6 md:mb-0 md:w-full lg:w-full md:col-span-1"
//               src={page.image_url}
//               alt="Image of a page in the book"
//             />
//             {page.title && <h3 className="font-semibold mb-2">{page.title}</h3>}
//             <p className="text-md">{page.content}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
