import { useState, useEffect } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

// Maximum number of statistics visible in the homepage banner
const STATISTICS_VISIBLE_LIMIT = 8;

const Banner = ({ hero, statistics, socialMediaLinks }) => {
  const [showSplash, setShowSplash] = useState(false);
  const [showAllStats, setShowAllStats] = useState(false);

  useEffect(() => {
    const hasSeenSplash = localStorage.getItem("hasSeenSplash");

    if (!hasSeenSplash) {
      setShowSplash(true);
      setTimeout(() => {
        setShowSplash(false);
        localStorage.setItem("hasSeenSplash", "true");
      }, 2000);
    }
  }, []);

  // Helper function to truncate text
  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Get font settings with defaults
  const getFontSize = (type) => {
    const defaults = {
      subtitle: 'text-4xl lg:text-6xl',
      tagline: 'text-3xl',
      description: 'text-4xl lg:text-6xl'
    };
    return hero?.font_settings?.[`${type}_size`] || defaults[type];
  };

  // Get icon for social platform - expanded to support more platforms
  const getSocialIcon = (platform) => {
    const icons = {
      linkedin: '/assets/home/linkedin.svg',
      dribbble: '/assets/home/dribble.svg',
      behance: '/assets/home/behance.svg',
      facebook: '/assets/home/facebook.svg',
      twitter: '/assets/home/twitter.svg',
      instagram: '/assets/home/instagram.svg',
      youtube: '/assets/home/youtube.svg',
      github: '/assets/home/github.svg',
    };
    return icons[platform] || '/assets/home/linkedin.svg';
  };

  return (
    <div className="w-full mx-auto h-screen relative">
      {showSplash && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white z-50 transition-opacity duration-1000">
          <h1 className="text-5xl font-bold text-black animate-bounce special-text">
            {hero?.title || "Shahriar Khan"}
          </h1>
        </div>
      )}

      {!showSplash && (<>
        <div className="w-full relative flex flex-col md:flex-row">
          <div className="md:w-2/3 h-full w-full">
            <div className="h-[400px] sm:h-[500px] md:h-[600px] lg:h-[80vh] relative">
              <img
                src={hero?.image_url || "/assets/home_banner.png"}
                alt="Home Banner"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 w-full h-full flex items-end justify-start text-white"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 41.23%, #000 99.94%)",
                }}
              >
                <p className={`${getFontSize('subtitle')} font-semibold p-4 sm:p-5 lg:p-20 wrap-break-word`}>
                  {truncateText(
                    hero?.subtitle || "Embrace the extraordinary. Live your fullest life.",
                    hero?.subtitle_max_length || 200
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="md:w-1/3 w-full h-auto min-h-[400px] sm:h-[500px] md:h-[600px] lg:h-[80vh] flex flex-col justify-center overflow-hidden py-8 md:py-0">
            <div className="flex items-center gap-3 sm:gap-4 px-4 sm:px-5 lg:px-20 mb-4 sm:mb-6 lg:mt-48">
              {(hero?.tagline && hero.tagline.length > 20) ? (
                <HoverCard openDelay={100} closeDelay={100}>
                  <HoverCardTrigger asChild>
                    <p className={`${getFontSize('tagline')} font-medium text-slate-900 wrap-break-word line-clamp-1 cursor-pointer hover:opacity-70 transition-opacity`}>
                      {hero?.tagline}
                    </p>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80 text-sm bg-card text-card-foreground shadow-lg border border-border z-50" side="bottom" align="start">
                    <p className="text-foreground">{hero?.tagline}</p>
                  </HoverCardContent>
                </HoverCard>
              ) : (
                <p className={`${getFontSize('tagline')} font-medium text-slate-900 wrap-break-word line-clamp-1`}>
                  {hero?.tagline || "Entrepreneur"}
                </p>
              )}
              <div className="w-20 h-1 bg-slate-900 shrink-0"></div>
            </div>
            {(hero?.description && hero.description.length > 30) ? (
              <HoverCard openDelay={100} closeDelay={100}>
                <HoverCardTrigger asChild>
                  <h1 className={`${getFontSize('description')} font-semibold text-slate-900 px-4 sm:px-5 lg:px-20 wrap-break-word line-clamp-3 sm:line-clamp-4 overflow-hidden cursor-pointer hover:opacity-70 transition-opacity`}>
                    {hero?.description}
                  </h1>
                </HoverCardTrigger>
                <HoverCardContent className="w-full max-w-[400px] max-h-80 overflow-y-auto text-sm sm:text-base bg-card text-card-foreground shadow-lg border border-border z-50" side="bottom" align="start">
                  <p className="text-foreground whitespace-pre-wrap">{hero?.description}</p>
                </HoverCardContent>
              </HoverCard>
            ) : (
              <h1 className={`${getFontSize('description')} font-semibold text-slate-900 px-4 sm:px-5 lg:px-20 wrap-break-word line-clamp-3 sm:line-clamp-4 overflow-hidden`}>
                {hero?.description || "Connecting brands & people through experiences."}
              </h1>
            )}
          </div>
        </div>

        <div className="w-full flex flex-col lg:flex-row min-h-36 lg:h-[20vh]">
          <div className="w-full lg:w-2/3 py-6 bg-[#3b3939d3] bg-opacity-10 backdrop-blur-sm min-h-full">
            <div className="w-11/12 mx-auto h-full flex items-center justify-center">
              {(() => {
                // Filter unique statistics by label
                const uniqueStats = statistics
                  ? statistics.filter((stat, index, self) => self.findIndex(s => s.label === stat.label) === index)
                  : [];

                // Apply visible limit unless "View all" is clicked
                const displayStats = showAllStats
                  ? uniqueStats
                  : uniqueStats.slice(0, STATISTICS_VISIBLE_LIMIT);

                const hasMoreStats = uniqueStats.length > STATISTICS_VISIBLE_LIMIT;

                return (
                  <div className="flex flex-col items-center gap-4">
                    <div className={`h-full grid ${displayStats.length > 6
                      ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8'
                      : displayStats.length > 4
                        ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5'
                        : 'grid-cols-2 lg:grid-cols-4'
                      } gap-4 lg:gap-6`}>
                      {displayStats.map((stat) => (
                        <div className="flex flex-col items-center justify-center px-2" key={stat.id}>
                          <h1 className="text-white font-semibold text-xl md:text-2xl mb-2 md:mb-3 text-center wrap-break-word">
                            {stat.value}
                          </h1>
                          <p className="text-sm md:text-base lg:text-lg text-slate-300 text-center wrap-break-word">
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </div>
                    {hasMoreStats && !showAllStats && (
                      <button
                        onClick={() => setShowAllStats(true)}
                        className="text-white text-sm md:text-base hover:underline transition-all duration-200 flex items-center gap-1"
                      >
                        View all ({uniqueStats.length} stats)
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    )}
                    {showAllStats && hasMoreStats && (
                      <button
                        onClick={() => setShowAllStats(false)}
                        className="text-white text-sm md:text-base hover:underline transition-all duration-200 flex items-center gap-1"
                      >
                        Show less
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      </button>
                    )}
                  </div>
                );
              })()}
            </div>
          </div>
          <div className="py-4 sm:py-6 lg:py-[46px] bg-slate-900 min-h-full w-full lg:w-1/3">
            <div className="h-full flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 lg:gap-6 flex-wrap px-4">
              <h1 className="text-sm sm:text-base lg:text-lg font-bold text-white w-full sm:w-auto text-center sm:text-left">Social Media:</h1>
              {socialMediaLinks && socialMediaLinks.length > 0 ? (
                <div className="flex items-center justify-center gap-3 sm:gap-4 lg:gap-6 flex-wrap">
                  {socialMediaLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                    >
                      <img
                        src={getSocialIcon(link.platform)}
                        alt={link.label}
                        className="w-4 h-4 sm:w-5 sm:h-5"
                      />
                      <span className="text-xs sm:text-sm md:text-base lg:text-lg text-white font-normal">
                        {link.label}
                      </span>
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-xs sm:text-sm text-muted-foreground">No social links available</p>
              )}
            </div>
          </div>
        </div>
      </>
      )}
    </div>
  );
};

export default Banner;
