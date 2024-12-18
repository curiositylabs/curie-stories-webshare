import { useState } from "preact/hooks";

const InstallBanner = () => {
  const [isVisible] = useState(true);

  // useEffect(() => {
  //   const bannerDismissed = false //localStorage.getItem('bannerDismissed') === 'true';

  //   if (!bannerDismissed) {
  //     checkIfAppInstalled()
  //       .then((installed) => {
  //         if (!installed) {
  //           setIsVisible(true);
  //         }
  //       });
  //   }
  // }, []);

  // const checkIfAppInstalled = () => {
  //   return new Promise((resolve) => {
  //     const handleVisibilityChange = () => {
  //       if (document.hidden) {
  //         resolve(true); // App is installed
  //       } else {
  //         resolve(false); // App is not installed
  //       }
  //       document.removeEventListener(
  //         "visibilitychange",
  //         handleVisibilityChange
  //       );
  //     };

  //     document.addEventListener("visibilitychange", handleVisibilityChange);

  //     // Attempt to open the app using the custom URL scheme
  //     // const start = Date.now();
  //     // const timeout = setTimeout(() => {
  //     //   const now = Date.now();
  //     //   if (now - start < 2000) {
  //     //     resolve(false);
  //     //   }
  //     // }, 1500);
  //     setIsVisible(true)

  //     window.location.href = "curie://";
  //   });
  // };

  // const handleClose = () => {
  //   setIsVisible(false);
  //   localStorage.setItem("bannerDismissed", "true");
  // };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full bg-gray-100 text-black p-2 z-50 flex items-center justify-between shadow-md">
      <div className="flex items-center">
        {/* <button onClick={handleClose} className="text-gray-500 text-lg mr-4">
          &times;
        </button> */}
        {/* <img src="/curie-logo.svg" alt="App Icon" className="w-12 h-12 mr-4" /> */}
        <img src="https://storage.googleapis.com/curiosity-labs-email-assets/logos/cure-text-logo.png" alt="App Icon" className="h-10" />
        {/* <div>
          <div className="font-bold">Ask Curie</div>
          <div className="text-xs text-gray-500">Curiosity Labs</div>
          <div className="text-xs text-gray-500 md:hidden">
            Best AI sidekick for kids
          </div>
          <div className="text-xs text-gray-500 hidden md:block">
            Get the app and unleash your kids’ imagination and creativity to
            create stories and more with their AI sidekick
          </div>
        </div> */}
      </div>
      <div className="flex items-center">
        <a
          href="https://apps.apple.com/app/id6470493763"
          target="_blank"
          className="text-blue-500 font-bold ml-4"
        >
          Install
        </a>
      </div>
    </div>
  );
};

export default InstallBanner;
