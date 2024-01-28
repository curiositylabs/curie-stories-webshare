export default function Showcase(data: any, id: string) {
  return (
    <div class="h-screen flex justify-center items-start mt-6 lg:mt-0 lg:items-center">
    <div
      class="w-11/12 backdrop-brightness-50 p-8 sm:w-1/2 px-10 py-9 justify-center flex flex-col items-center gap-8 bg-cover bg-center bg-no-repeat bg-gray-100 rounded-xl text-white"
      style={{backgroundImage: "linear-gradient(to bottom, rgba(132, 108, 227, 1), rgba(104, 145, 225, 1))"}}
    >
      <img 
        src={data.cover} 
        alt="bordered image" 
        class="object-cover border-4 border-white w-full h-auto sm:h-48 sm:w-48 md:h-56 md:w-56 lg:h-64 lg:w-64 xl:h-72 xl:w-72" 
      />
      <div class="space-y-4 text-center text-black">
        <h1 class="text-2xl sm:text-3xl inline-block font-bold">{data.title}</h1>
        <p class="text-sm sm:text-base md:text-lg lg:text-xl max-w text-black">
          - A Story by {data.authors[0]}
        </p>
      </div>
      <div class="items-center">
        <a
          href={`/story/${id}/viewbook`}
          class="text-white cursor-pointer items-center group bg-black px-8 py-2 rounded-md font-bold hover:bg-gray-800 transition duration-300 ease-in-out flex justify-center gap-2"
        >
          View Book{" "}
        </a>
      </div>
    </div>
    </div>
  );
}