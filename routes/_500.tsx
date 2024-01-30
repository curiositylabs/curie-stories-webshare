import { Head } from "$fresh/runtime.ts";

export default function Error404() {
  return (
    <>
      <Head>
        <title>404 - Page not found</title>
      </Head>
      <div class="px-4 py-8 mx-auto bg-[#17082e] text-white">
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
          <img
            class="my-6"
            src="/logo.svg"
            width="128"
            height="128"
            alt="Curiosity Labs"
          />
          <h1 class="text-4xl font-bold">500 - Page not found</h1>
          <p class="my-4">
            Check the storyID you have entered. It might be wrong.
          </p>
          <a href="https://curiositylabs.ai/" class="underline">
            Curiosity Labs
          </a>
        </div>
      </div>
    </>
  );
}
