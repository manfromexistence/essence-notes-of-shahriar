const Banner = ({ pageSettings }) => {
  // Truncate text to max characters for display
  const truncateText = (text, maxLength) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  return (
    <div className="bg-background w-full mx-auto p-2 lg:p-6 pt-0 lg:pt-0 relative overflow-hidden">
      <div
        style={{
          backgroundImage: `url(${pageSettings?.banner_image || '/assets/technology/technology_banner.png'})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "800px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingLeft: "10%",
          borderRadius: "20px",
        }}
      >
        <div className="flex flex-col items-start text-left max-w-4xl">
          <div className="flex items-center gap-4 text-white">
            <div className="w-16 h-1 bg-white"></div>
            <h4 className="text-3xl font-medium truncate max-w-xs">{truncateText(pageSettings?.banner_title, 30) || 'Technology'}</h4>
          </div>
          <h1 className="text-xl lg:text-5xl font-semibold mt-2 leading-relaxed text-white line-clamp-3 overflow-hidden">
            {truncateText(pageSettings?.banner_subtitle, 150) || '"I stay updated with the latest technology trends, focusing on emerging fields like AI-driven design, cloud-based collaboration tools, and responsive design for diverse devices."'}
          </h1>
        </div>
      </div>

      <p className="text-slate-900 font-semibold text-2xl text-center lg:w-6/12 lg:mx-auto py-18 line-clamp-4 overflow-hidden">
        {truncateText(pageSettings?.banner_description, 200) || 'Living an extraordinary life means shaping it on your terms, filled with deep meaning and significant impact. Fueled by the quest for excellence and a strong sense of purpose, Shahriar Khan has motivated millions to dream boldly and strive for greater heights.'}
      </p>
    </div>
  );
};

export default Banner;
