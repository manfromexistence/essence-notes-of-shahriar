const Travel = ({ pageContent, travelCountries }) => {
  const travelData = pageContent?.travel || {};
  const countries = travelCountries || [];

  // Support both old (section_title/section_subtitle) and new (title/description) field names
  const sectionTitle = travelData.title || travelData.section_title || "Travel countries for business purposes";
  const sectionDescription = travelData.description || travelData.section_subtitle || "As a global entrepreneur and technology leader, Shahriar Khan has traveled extensively for business purposes, establishing partnerships and exploring opportunities in Turkey, Canada, China, and the United States. These journeys have enriched his perspective and strengthened international collaborations.";

  // Default countries if none from backend
  const defaultCountries = [
    { id: 1, name: 'Turkey', flag_url: '/assets/about_me/turkey.svg' },
    { id: 2, name: 'Canada', flag_url: '/assets/about_me/canada.svg' },
    { id: 3, name: 'China', flag_url: '/assets/about_me/china.svg' },
    { id: 4, name: 'USA', flag_url: '/assets/about_me/usa.svg' },
  ];

  const displayCountries = countries.length > 0 ? countries : defaultCountries;

  return (
    <div className="pt-16 bg-[#2E5AFF]">
      <h1 className="text-center font-semibold text-4xl lg:text-6xl text-white mb-6">
        {sectionTitle}
      </h1>
      <p className="text-gray-300 text-center w-11/12 lg:w-6/12 mx-auto">
        {sectionDescription}
      </p>

      <div className="relative">
        <div className="w-full lg:-mt-56">
          <img className="w-full h-full object-cover" src={travelData.map_image || "/assets/about_me/world_map.png"} alt="World Map" />
        </div>

        {/* <div className="absolute right-32 bottom-12 hidden lg:block">
          <h1 className="text-xl font-semibold text-white mb-4">
            Country Name
          </h1>
          {displayCountries.map((country) => (
            <div key={country.id} className="flex items-center gap-2 mb-3">
              <div>
                <img src={country.flag_url || country.flag_image} alt={country.name} />
              </div>
              <h2 className="text-white font-semibold text-lg">{country.name}</h2>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default Travel;
