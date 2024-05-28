import { FreshContext } from "$fresh/server.ts";
import Viewbook from "../../../components/Viewbook.tsx";
import Carousel from "../../../islands/Carousel.tsx";

export default async function StoryData(_req: any, ctx: FreshContext) {
  const response = await fetch(
    "https://curie-backend-pwxppjv6ha-uw.a.run.app/stories/any-profile-id/" +
      ctx.params.id
  );
  const data = await response.json();
  let renderElement;
  if (data.book_format == "Text Only Books") {
    renderElement = <Viewbook data={data} />;
  } else {
    const carouselData = data.pages.map((page: any) => {
      return {
        text: page.content,
        image: page.image_url,
      };
    });

    renderElement = (
      <div className="height-webkit-fill flex items-center justify-center">
        <Carousel data={carouselData} title={data.title} />
      </div>
    );
  }

  const share_image_url = data.cover;
  const newUrl = share_image_url.replace(/(\/upload\/)/, "$1c_fill,h_200,w_200/");

  return (
    <>
      <head>
        <meta property="og:type" content="website" />
        <meta property="og:title" content={data.title} />
        <meta property="og:image" content={newUrl} />

        <title>{data.title}</title>
      </head>
      {renderElement}
    </>
  );
}
