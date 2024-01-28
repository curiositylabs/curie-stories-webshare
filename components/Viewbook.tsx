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
  
  export default function Viewbook(data: BookData) {
    return (
      <div class="p-4 m-4 items-center justify-center">
        <img class="w-full rounded-lg shadow-2xl h-full object-scale-down mb-6" src={data.cover} alt={data.title} />
        <h1 class="text-2xl text-[#110056] text-center font-bold mb-2">{data.title}</h1>
        <h2 class="text-lg text-[#110056] brightness-50 text-center mb-4">By {data.authors.join(", ")}</h2>
        {data.pages.map((page, index) => (
          <div key={index} class="mb-4">
            {page.title && <h3 class="font-semibold mb-2">{page.title}</h3>}
            <p class="text-md">{page.content}</p>
          </div>
        ))}
      </div>
    );
  }