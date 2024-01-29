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
      <div className="sm:grid sm:grid-cols-3 gap-4 p-4 m-4 items-start justify-center">
        <img className="w-full rounded-lg shadow-2xl h-auto object-scale-down mb-6 md:mb-0 md:w-full lg:w-full md:col-span-1" src={data.cover} alt={data.title} />
        <div class="p-2 sm:col-span-2">
          <h1 className="text-2xl md:text-3xl text-[#110056] text-center font-bold mb-2 md:text-left">{data.title}</h1>
          <h2 className="text-lg text-[#1100567c] text-center mb-4 md:text-left">- A Story by {data.authors.join(", ")}</h2>
          {data.pages.map((page, index) => (
            <div key={index} className="mb-4">
              {page.title && <h3 className="font-semibold mb-2">{page.title}</h3>}
              <p className="text-md">{page.content}</p>
            </div>
          ))}
        </div>
      </div>
    );
}