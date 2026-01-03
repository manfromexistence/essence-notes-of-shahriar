const Highlights = ({ books = [], settings }) => {
  const highlights = books.filter(book => book.highlights).slice(0, 2);

  const defaultHighlights = [
    {
      cover_image: settings?.highlight_book_1_image || "/assets/books/company_award_book.png",
      title: settings?.highlight_book_1_title || "Best-Selling Technology Book Award",
      highlights: settings?.highlight_book_1_text || "\"Chat GPT: Risk or Opportunity?\" has been recognized as a pioneering work in exploring the implications of AI technology for businesses and society in Bangladesh."
    },
    {
      cover_image: settings?.highlight_book_2_image || "/assets/books/uddokta_book.png",
      title: settings?.highlight_book_2_title || "Innovation in Business Literature Award",
      highlights: settings?.highlight_book_2_text || "Honored for breaking new ground in business literature by addressing contemporary challenges of AI adoption and digital transformation in emerging markets."
    }
  ];

  const displayHighlights = highlights.length > 0 ? highlights : defaultHighlights;

  return (
    <div className="py-8" style={{ backgroundColor: settings?.highlights_bg_color || '#1E293B' }}>
      <div className="w-11/12 lg:w-9/12 mx-auto">
        {settings?.highlights_section_title && (
          <h2 className="text-3xl font-semibold text-white text-center mb-8">
            {settings.highlights_section_title}
          </h2>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {displayHighlights.map((book, index) => (
            <div key={book.id || index} className="text-white flex items-center gap-6">
              <div>
                <div className="w-24">
                  <img className="w-full" src={book.cover_image || "/assets/books/default.png"} alt={book.title} />
                </div>
              </div>

              <div className="flex-1">
                <p className="text-lg font-semibold mb-4">
                  {book.title}
                </p>
                <p className={index === 0 ? "w-3/4" : "lg:w-3/4"}>
                  {book.highlights}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Highlights;
