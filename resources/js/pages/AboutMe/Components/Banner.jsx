import { useState } from "react";

const Banner = ({ pageContent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const bannerData = pageContent?.banner || {};

  // Truncate text to max characters for display
  const truncateText = (text, maxLength) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  return (
    <div className="bg-white w-full mx-auto p-2 lg:p-6">
      <div className="bg-[#0035F9] rounded-2xl">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:justify-between lg:px-20">
          <div className="lg:px-20 px-5 pt-24 lg:pt-0 lg:py-16">
            <div className="mb-6">
              <img
                className="cursor-pointer"
                src={bannerData.video_thumbnail || "/assets/about_me/video_img.png"}
                onClick={() => setIsOpen(true)}
                alt="Video thumbnail"
              />
              {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50">
                  <div className="relative bg-white p-4 rounded-lg shadow-lg w-[90%] max-w-3xl">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="absolute top-4 right-6 text-white cursor-pointer text-2xl z-50"
                    >
                      ✖
                    </button>
                    <div className="relative w-full h-[80vh]">
                      <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={bannerData.video_url || "https://www.youtube.com/embed/UGrFGCf5NWY?si=YCA7UJNOqxa3mvCU"}
                        title="YouTube video player"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-1 bg-white"></div>
              <p className="text-3xl font-medium text-white truncate max-w-xs">
                {truncateText(bannerData.label, 20) || "About Me"}
              </p>
            </div>
            <h1 className="text-4xl lg:text-6xl font-semibold text-white line-clamp-2 overflow-hidden">
              {truncateText(bannerData.title, 60) || "Remarkable lives respond to a greater purpose."}
            </h1>
          </div>

          <img className="" src={bannerData.banner_image || "/assets/about_me/about_me_banner.png"} alt="Banner" />

          {/* <div
            className="w-full lg:w-1/2 h-[300px] lg:h-full bg-cover bg-right"
            style={{
              backgroundImage: 
              `linear-gradient(to left, rgba(17, 24, 39, 0.9), rgba(17, 24, 39, 0.3), rgba(0, 0, 0, 0)), 
              url(${bannerData.banner_image || "/assets/about_me/about_me_banner.png"})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div> */}
        </div>
      </div>
    </div>
  );
};

export default Banner;
