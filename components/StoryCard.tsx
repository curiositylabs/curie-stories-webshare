// deno-lint-ignore no-explicit-any
export default function StoryCard({ data, id }: { data: any; id: string }) {
  return (
    <div class="w-full flex flex-grow flex-col justify-center pt-32 items-center lg:mt-0 lg:items-center">
      <div
        class="w-11/12 backdrop-brightness-50 p-8 sm:w-1/2 px-10 py-9 justify-center flex flex-col items-center gap-8 bg-cover bg-center bg-no-repeat rounded-xl text-white"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(132, 108, 227, 1), rgba(104, 145, 225, 1))",
        }}
      >
        <img
          src={data.cover}
          alt="bordered image"
          class="object-cover border-4 border-white w-full h-auto sm:h-48 sm:w-48 md:h-56 md:w-56 lg:h-64 lg:w-64 xl:h-72 xl:w-72 rounded-[20px]"
        />
        <div class="space-y-4 text-center">
          <h1 class="text-2xl text-[#110056] sm:text-3xl inline-block font-bold">
            {data.title}
          </h1>
          <p class="text-lg text-[#1100567c] sm:text-base md:text-lg lg:text-xl max-w">
          A Story by {data.authors[0]}
          </p>
        </div>
        <div class="items-center">
          <a
            href={`/story/${id}/viewbook`}
            class="text-white cursor-pointer items-center group bg-black px-8 py-2 rounded-md font-bold hover:bg-gray-800 transition duration-300 ease-in-out flex justify-center gap-2"
          >
            Read
          </a>
        </div>
      </div>
    </div>
  );
}
