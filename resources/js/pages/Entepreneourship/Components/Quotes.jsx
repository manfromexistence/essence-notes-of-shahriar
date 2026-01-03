const Quotes = ({ quotes = [], settings }) => {
  // Use quotes from settings if available, otherwise use the passed quotes array
  const quotesData = settings?.quotes || quotes;
  
  // Get the featured quote or the first quote
  const displayQuote = quotesData.find(quote => quote.is_featured) || quotesData[0] || {
    content: settings?.quotes_section_title || "Living an extraordinary life means shaping it on your terms, filled with deep meaning and significant impact. Fueled by the quest for excellence and a strong sense of purpose, Shahriar Khan has motivated millions to dream boldly and strive for greater heights."
  };
  
  return (
    <div className="bg-slate-950 py-16">
      <div className="w-11/12 lg:w-6/12 mx-auto">
        {displayQuote.image && (
          <div className="flex justify-center mb-8">
            <img
              src={displayQuote.image}
              alt={displayQuote.author || "Quote"}
              className="w-24 h-24 rounded-full object-cover border-4 border-white"
            />
          </div>
        )}
        <p className="text-center text-2xl font-semibold text-white">
          {displayQuote.content || displayQuote.quote || displayQuote.title}
        </p>
        {displayQuote.author && (
          <p className="text-center text-lg text-gray-400 mt-4">
            - {displayQuote.author}
          </p>
        )}
      </div>
    </div>
  );
};

export default Quotes;
