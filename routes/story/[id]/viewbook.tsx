import { FreshContext } from "$fresh/server.ts";
import Viewbook from "../../../components/Viewbook.tsx";
import Carousel from "../../../islands/Carousel.tsx";

export default async function StoryData(_req: any, ctx: FreshContext) {
  const response = await fetch(
    "https://curie-backend-pwxppjv6ha-uw.a.run.app/stories/any-profile-id/" +
      ctx.params.id
  );
  const data = await response.json();
  if (data.book_format == "Text Only Books") {
    return <Viewbook data={data} />
  } else {

    const carouselData = data.pages.map((page: any) => {
      return {
        text: page.content,
        image: page.image_url,
      };
    });

    return (
      <div className="min-h-screen flex items-center justify-center">
        <Carousel data={carouselData} title={data.title} />
      </div>
    );
  }
}
