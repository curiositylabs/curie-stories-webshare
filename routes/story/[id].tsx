import { FreshContext } from "$fresh/server.ts";
import StoryCard from "../../components/StoryCard.tsx";

export default async function StoryData(_req: any, ctx: FreshContext) {
  const id = ctx.params.id;
  const response = await fetch(
    "https://curie-backend-pwxppjv6ha-uw.a.run.app/stories/any-profile-id/" +
      id,
  );
  const data = await response.json();
  const share_image_url = data.cover;
  const newUrl = share_image_url.replace(/(\/upload\/)/, "$1c_fill,h_200,w_200/");
  return (
    <html>
      <head>
        <meta property="og:type" content="website" />
        <meta property="og:title" content={data.title} />
        <meta property="og:image" content={newUrl} />

        <title>{data.title}</title>
      </head>
      <body>
        <StoryCard data={data} id={id} />
      </body>
    </html>
  );
}
