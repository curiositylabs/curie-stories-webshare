import IconBook from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/book.tsx";

// deno-lint-ignore no-explicit-any
export default function StoryCard({ data, id }: { data: any; id: string }) {
  return (
    <div class="w-full flex flex-grow flex-col justify-center md:justify-start pt-24 pb-8 items-center lg:mt-0 lg:items-center">
      <div
        class="w-11/12 backdrop-brightness-50 p-8 sm:w-1/2 px-10 py-9 justify-center flex flex-col items-center gap-8 lg:gap-5 bg-cover bg-center bg-no-repeat rounded-xl text-white"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(132, 108, 227, 1), rgba(104, 145, 225, 1))",
        }}
      >
        <img
          src={data.cover}
          alt="bordered image"
          class="object-cover border-4 border-white w-full h-auto sm:h-48 sm:w-48 md:h-[48vh] md:w-[48vh] md:max-h-[520px] md:max-w-[520px] rounded-[20px]"
        />
        <div class="space-y-4 text-center">
          <h1 class="text-2xl text-[#110056] sm:text-3xl inline-block font-bold">
            {data.title}
          </h1>
          <p class="text-lg text-[#1100567c] sm:text-base md:text-lg lg:text-xl max-w">
            A story by {data.authors[0]}
          </p>
        </div>
        <div class="flex flex-col items-center justify-center gap-3">
          <a
            href={`/story/${id}/viewbook`}
            class="text-white cursor-pointer items-center group bg-black w-48 px-8 py-3 rounded-md font-bold hover:bg-gray-800 transition duration-300 ease-in-out flex justify-center gap-2 text-sm leading-5 whitespace-nowrap"
          >
            Read
          </a>
          <a
            href={`https://curie-backend-388092980975.us-west1.run.app/stories/print/orders/start?story_id=${id}`}
            target="_blank"
            rel="noopener noreferrer"
            class="text-[#110056] cursor-pointer items-center group bg-white border border-[#d8cffd] w-48 px-6 py-3 rounded-md font-bold hover:bg-[#f8f6ff] transition duration-300 ease-in-out flex justify-center gap-2 text-sm leading-5 whitespace-nowrap"
          >
            <IconBook class="w-4 h-4" aria-hidden="true" />
            Make it a Book
          </a>
        </div>
      </div>
    </div>
  );
}
