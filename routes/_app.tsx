import { type PageProps } from "$fresh/server.ts";
import InstallBanner from "../islands/InstallBanner.tsx";

export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Story</title>
        <link rel="stylesheet" href="/styles.css" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className='bg-gray-100'>
        <InstallBanner />
        <Component />
      </body>
    </html>
  );
}
