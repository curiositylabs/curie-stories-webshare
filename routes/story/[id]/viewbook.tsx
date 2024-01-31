import { FreshContext } from "$fresh/server.ts";
import Carousel from "../../../islands/Picturebook.tsx";
import Viewbook from "../../../components/Viewbook.tsx";

type CarouselProps = {
  showNavigation?: boolean;
  interval?: number;
  currentSlide?: number;
  automatic?: boolean;
  class?: string;
  data: BookData;
};

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

export default async function StoryData(_req: any, ctx: FreshContext) {
  const response = await fetch(
    "https://curie-backend-pwxppjv6ha-uw.a.run.app/stories/any-profile-id/" +
      ctx.params.id,
  );
  const data = await response.json();
  if (data.book_format == "Picture Books") {
    const carouselProps: CarouselProps = {
      showNavigation: true,
      interval: 3000,
      currentSlide: 0,
      automatic: false,
      class: "",
      data: data,
    };
    return (
      <>
        <Carousel {...carouselProps} />
      </>
    );
  } else {
    return Viewbook(data);
  }
  // push to deno deploy
}
