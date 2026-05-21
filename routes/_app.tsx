import { type PageProps } from "$fresh/server.ts";
import InstallBanner from "../islands/InstallBanner.tsx";

const gaMeasurementId = "G-4X8NTYKBR9";

export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Story</title>
        <link rel="stylesheet" href="/styles.css" />
        <link rel="icon" href="/favicon.ico" />
        {gaMeasurementId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
            >
            </script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaMeasurementId}');
                `,
              }}
            >
            </script>
          </>
        )}
      </head>
      <body className="bg-gray-100">
        <InstallBanner />
        <Component />
      </body>
    </html>
  );
}
