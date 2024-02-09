import { FreshContext } from "$fresh/server.ts";
import Showcase from "../../components/Showcase.tsx";

export default async function StoryData(_req: any, ctx: FreshContext) {
  let id = ctx.params.id;
  let response = await fetch(
    "https://curie-backend-pwxppjv6ha-uw.a.run.app/stories/any-profile-id/" +
      id,
  );
  let data = await response.json();
  return (
    <html>
      <head>
        <meta property="og:type" content="website" />
        <meta property="og:title" content={data.title} />
        <meta
          property="og:image"
          content="https://i.ibb.co/9ZRL24y/small-size.png"
        />
      </head>
      <body>
        {Showcase(data, id)}
      </body>
    </html>
  );
  // push to deno deploy
}
