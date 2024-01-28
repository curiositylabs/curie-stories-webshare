import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export function Button(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class="text-white cursor-pointer items-center group bg-black px-8 py-2 rounded-md font-bold hover:bg-gray-800 transition duration-300 ease-in-out flex justify-center gap-2"
    />
  );
}
