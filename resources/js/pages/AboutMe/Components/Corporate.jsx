import React from "react";

const Corporate = ({ pageContent, corporateJourney }) => {
  const journeyData = pageContent?.corporate_journey || {};
  const items = corporateJourney || [];
  
  return (
    <div className="bg-slate-950 py-16">
      <h1 className="text-4xl lg:text-6xl font-semibold text-white lg:ml-[10%] mb-8">
        {journeyData.title || "Corporate Journey"}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-5">
        {items.map((item) => (
          <div key={item.id} className="lg:col-span-1 border border-gray-700">
            <div className="p-8 space-y-6 mb-20">
              <div className="rounded-full border-4 border-gray-500 w-12 h-12 flex items-center justify-center">
                <p className="text-gray-500 text-xl">{item.step_number}</p>
              </div>
              <h1 className="text-4xl font-semibold text-white">{item.title}</h1>
              <p className="text-2xl text-white">{item.company}</p>
              <p className="text-lg font-normal text-white">
                {item.description}
              </p>
            </div>

            <div className="mb-4">
              <img src={item.icon_url || item.icon_image} alt={item.title} />
            </div>
          </div>
        ))}
      </div>

      <div
        className="w-full mx-auto"
        style={{
          backgroundImage: `url(${journeyData.background_image || '/assets/about_me/corporate_journey.png'})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-11/12 lg:w-9/12 mx-auto py-16 relative">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-50">
            <div className="lg:pt-48">
              <h3 className="text-3xl font-semibold text-white mb-6">
                {journeyData.logic_theory_title || "Logic Theory"}
              </h3>

              <p className="text-white mb-6">
                {journeyData.logic_theory_content_1 || "Innovation drives progress. By combining cutting-edge technology with strategic business insights, we can solve complex problems and create sustainable value for our clients and communities."}
              </p>
              <p className="text-white mb-6">
                {journeyData.logic_theory_content_2 || "Collaboration and continuous learning are essential. Building strong partnerships and staying ahead of technological trends ensures long-term success in the rapidly evolving digital landscape."}
              </p>
            </div>

            <div className="w-fit h-fit">
              <img
                className="w-fit h-fit rounded-b-full"
                src={journeyData.philosophy_image || "/assets/about_me/shahriar_khan_philosophy.png"}
                alt="Philosophy"
              />
            </div>

            <div>
              <h1 className="text-5xl lg:text-7xl font-semibold text-white mb-6 lg:mb-48">
                {journeyData.philosophy_title || "My Philosophy"}
              </h1>

              <p className="text-3xl font-semibold text-white mb-6">{journeyData.logic_1_title || "Logic #1"}</p>
              <p className="text-white mb-6">
                {journeyData.logic_1_content || "Technology should serve humanity. Every innovation we develop is guided by the principle of creating positive impact and ethical advancement in our society."}
              </p>
            </div>
          </div>
          <div className="absolute top-64 right-10 z-20 hidden lg:block">
            <img src={journeyData.line_image || "/assets/about_me/line.png"} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Corporate;
