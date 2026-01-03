import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Book, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

// Custom Left Arrow
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      className="absolute left-0 z-10 text-slate-900 bg-white p-4 rounded-full shadow-md hover:bg-gray-200 -translate-y-1/2 top-1/2"
      onClick={onClick}
    >
      <ChevronLeft size={20} />
    </button>
  );
};

// Custom Right Arrow
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      className="absolute right-0 z-10 text-slate-900 bg-white p-4 rounded-full shadow-md hover:bg-gray-200 -translate-y-1/2 top-1/2"
      onClick={onClick}
    >
      <ChevronRight size={20} />
    </button>
  );
};

const Banner = ({ books = [], settings, carouselSlides = [] }) => {
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  // Use database carousel slides if available, otherwise use defaults
  const displaySlides = carouselSlides.length > 0 ? carouselSlides : null;

  return (
    <div className="w-full mx-auto py-24 bg-slate-100 relative overflow-hidden">
      <div className="absolute right-4 hidden lg:block w-[700px]">
        <img src={settings?.banner_pattern_image || "/assets/books/pattern_bg.png"} alt="" className="w-full" />
      </div>
      <div className="w-11/12 lg:w-9/12 mx-auto">
        <Slider {...sliderSettings}>
          {displaySlides ? (
            displaySlides.map((slide, index) => (
              <div key={slide.id || index}>
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 p-4">
                  <div className="flex-1">
                    <div>
                      <img src={slide.book_image || settings?.banner_book_image || "/assets/books/book.png"} alt={slide.title} />
                    </div>
                    {slide.button_text && (
                      <p className="flex items-center justify-center gap-4 text-lg px-4 py-2 rounded-xl border border-[#2E5AFF] text-[#2E5AFF] font-semibold mt-4 lg:w-1/3 mx-auto text-center">
                        {slide.button_text} <Book />
                      </p>
                    )}
                  </div>

                  <div className="flex-1">
                    <h1 className="text-4xl font-semibold text-slate-900 mb-4">
                      {slide.title}
                    </h1>
                    {slide.description && (
                      <p className="text-slate-900 mb-4 lg:w-3/4">
                        {slide.description}
                      </p>
                    )}
                    {slide.price_text && (
                      <p className="text-slate-900 font-semibold text-xl mb-8">
                        {slide.price_text}
                      </p>
                    )}

                    <div className="relative w-24 h-24 rounded-full flex items-center justify-center bg-[#2E5AFF]">
                      <div className="absolute w-full h-full animate-spin-slow">
                        {Array.from({ length: 1 }).map((_, index) => (
                          <span
                            key={index}
                            className="absolute text-white font-bold text-sm p-[6px]"
                            style={{
                              transform: `rotate(${index * 30}deg) rotate(-${index * 30}deg)`,
                              transformOrigin: "0 50%",
                              whiteSpace: "nowrap",
                            }}
                          >
                            <img src={settings?.banner_rotating_button_image || "/assets/books/TextFlex_ Buy Now _ Buy Now _ Buy Now _.png"} alt="" />
                          </span>
                        ))}
                      </div>
                      <ExternalLink size={28} className="text-white relative" />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Fallback to original hardcoded slides
            <>
              <div>
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 p-4">
                  <div className="flex-1">
                    <div>
                      <img src={settings?.banner_book_image || "/assets/books/book.png"} alt="Book" />
                    </div>
                    <p className="flex items-center justify-center gap-4 text-lg px-4 py-2 rounded-xl border border-[#2E5AFF] text-[#2E5AFF] font-semibold mt-4 lg:w-1/3 mx-auto text-center">
                      {settings?.banner_button_text || "Read a Little"} <Book />
                    </p>
                  </div>

                  <div className="flex-1">
                    <h1 className="text-4xl font-semibold text-slate-900 mb-4">
                      {settings?.banner_title || "Chat GPT: Risk or Opportunity?"}
                    </h1>
                    <p className="text-slate-900 mb-4 lg:w-3/4">
                      {settings?.banner_description || "Living an extraordinary life means shaping it on your terms, filled with deep meaning and significant impact. Fueled by the quest for excellence and a strong sense of purpose, Shahriar Khan has motivated millions to dream boldly and strive for greater heights."}
                    </p>
                    <p className="text-slate-900 font-semibold text-xl mb-8">
                      {settings?.banner_price || "Price: 240 BDT"}
                    </p>

                    <div className="relative w-24 h-24 rounded-full flex items-center justify-center bg-[#2E5AFF]">
                      <div className="absolute w-full h-full animate-spin-slow">
                        {Array.from({ length: 1 }).map((_, index) => (
                          <span
                            key={index}
                            className="absolute text-white font-bold text-sm p-[6px]"
                            style={{
                              transform: `rotate(${index * 30}deg) rotate(-${index * 30}deg)`,
                              transformOrigin: "0 50%",
                              whiteSpace: "nowrap",
                            }}
                          >
                            <img src={settings?.banner_rotating_button_image || "/assets/books/TextFlex_ Buy Now _ Buy Now _ Buy Now _.png"} alt="" />
                          </span>
                        ))}
                      </div>
                      <ExternalLink size={28} className="text-white relative" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Static Slide */}
              <div className="h-full w-full flex items-cener justify-center mt-56">
                <h2 className="text-3xl font-bold text-center">
                  Thanks for coming here!
                </h2>
                <p className="text-center mt-4">
                  More contents are coming soon...
                </p>
              </div>
            </>
          )}
        </Slider>
      </div>
    </div>
  );
};

export default Banner;
