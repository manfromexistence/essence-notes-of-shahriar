const Banner = ({ pageSettings }) => {
  // Truncate text to max characters for display
  const truncateText = (text, maxLength) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  return (
    <div className="bg-background w-full mx-auto p-2 lg:p-6 pt-0 lg:pt-0 relative overflow-hidden">
      <div className="absolute right-4 hidden lg:block w-[560px]">
        <img src="/assets/donation/pattern_bg.png" alt="" className="w-full" />
      </div>

      <div className="bg-[#0035F9] rounded-2xl p-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:justify-between lg:px-20">
          <div className="lg:w-1/2">
            <div className="flex items-center gap-4 justify-center lg:justify-start mt-24 lg:mt-0">
              <div className="w-16 h-1 bg-white"></div>
              <h4 className="text-2xl lg:text-3xl font-medium text-white truncate max-w-xs">
                {truncateText(pageSettings?.banner_subtitle, 30) || 'Make a Difference'}
              </h4>
            </div>
            <h1 className="text-3xl lg:text-5xl text-white font-semibold mt-4 leading-relaxed">
              <strong className="line-clamp-2 overflow-hidden block">{truncateText(pageSettings?.page_title, 40) || '"Every Contribution Counts"'}</strong> – <br />
              <span className="font-light line-clamp-2 overflow-hidden block">
                {truncateText(pageSettings?.banner_quote, 80) || 'Help us make a positive impact in the world.'}
              </span>
            </h1>
          </div>

          <div className="lg:w-1/2 relative h-full">
            <img
              src={pageSettings?.banner_default_image || "/assets/donation/donation_banner.png"}
              alt="Donation Banner" className="w-full object-cover" />

          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
