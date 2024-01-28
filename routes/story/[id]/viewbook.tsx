import { FreshContext } from "$fresh/server.ts";
import Viewbook from "../../../components/Viewbook.tsx";

export default async function StoryData(_req: any, ctx: FreshContext) {
    let response = await fetch('https://curie-backend-pwxppjv6ha-uw.a.run.app/stories/any-profile-id/' + ctx.params.id);
    let data = await response.json();
    return Viewbook(data);
    // push to deno deploy
}