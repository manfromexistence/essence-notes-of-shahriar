const Impact = ({ pageContent, impactItems }) => {
  const impactData = pageContent?.impact || {};
  const items = impactItems || [];

  // Default impact items if none from backend
  const defaultItems = [
    { id: 1, title: "Innovation and Product Development" },
    { id: 2, title: "Research and Development (R&D)" },
    { id: 3, title: "Cybersecurity and Data Protection" },
    { id: 4, title: "Optimization of Processes" },
    { id: 5, title: "Leadership in Digital Transformation" },
    { id: 6, title: "User Experience (UX) Design" },
    { id: 7, title: "Education and Mentorship" },
    { id: 8, title: "Ethical and Social Contributions" },
  ];

  const displayItems = items.length > 0 ? items : defaultItems;

  return (
    <div
      className="py-10 w-full mx-auto"
      style={{
        backgroundImage: `url(/assets/about_me/corporate_journey.png)`,

        backgroundPosition: "center",
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 mb-20">
        <div className="lg:col-span-1">
          <div className="overflow-hidden w-[460px] h-[332px]">
            <img
              src={impactData.image_1 || "/assets/about_me/shahriar_khan4.png"}
              alt=""
              className="transition-transform duration-500 ease-in-out hover:scale-105  w-full h-full object-cover"
            />
          </div>

          <div className="-translate-y-28 transition-transform duration-500 hover:rotate-6 w-[460px] h-[332px]">
            <img
              src={impactData.image_2 || "/assets/about_me/shahriar_khan3.png"}
              alt=""
              className="transition-transform duration-500 hover:scale-110 w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-1 flex flex-col items-center justify-center">
          <h1 className="text-white font-semibold text-4xl lg:text-6xl mb-6">
            {impactData.entrepreneur_title || "Entrepreneur Impact"}
          </h1>
          <p className="font-light text-gray-300 text-lg text-center">
            {impactData.entrepreneur_description || "As a visionary entrepreneur, Shahriar Khan has pioneered multiple successful ventures including Nexkraft LTD, Nexfly, Mechanix, and NexAcademy. His leadership has driven innovation in event planning, education technology, and digital solutions, creating jobs and fostering economic growth in Bangladesh and beyond."}
          </p>
        </div>

        <div className="lg:col-span-1 ml-20">
          <div className="overflow-hidden w-[460px] h-[332px]">
            <img
              src={impactData.image_3 || "/assets/about_me/shahriar_khan2.png"}
              alt=""
              className="transition-transform duration-500 ease-in-out hover:scale-105 w-full h-full object-cover"
            />
          </div>

          <div className="-translate-y-28 transition-transform duration-500 hover:-rotate-6 w-[460px] h-[332px]">
            <img
              src={impactData.image_4 || "/assets/about_me/shahriar_khan1.png"}
              alt=""
              className="transition-transform duration-500 hover:scale-110 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="w-11/12 mx-auto lg:w-9/12 lg:ml-[20%]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          <div className="lg:col-span-1">
            <h1 className="text-4xl lg:text-6xl font-semibold text-white mb-6">
              {impactData.technology_title || "Technology Impact"}
            </h1>

            <p className="text-gray-300">
              {impactData.technology_description || "Shahriar Khan has been at the forefront of technological advancement, specializing in AI-driven solutions, cloud-based systems, and cybersecurity. His expertise spans research and development, user experience design, and digital transformation strategies that have revolutionized how businesses operate in the modern digital landscape."}
            </p>
          </div>

          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {displayItems.map((item) => (
                <div key={item.id}>
                  <div className="bg-slate-900 py-8 px-4 rounded-xl">
                    <p className="text-white text-center">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Impact;
