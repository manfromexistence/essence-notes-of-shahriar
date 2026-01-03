import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Innovation = ({ innovations = [], settings }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedInnovation, setSelectedInnovation] = useState(null);

  // Use innovations from settings if available, otherwise use the passed innovations array
  const innovationsData = settings?.innovations || innovations;
  
  // Default innovations if none provided
  const defaultInnovations = [
    {
      id: 1,
      title: "NexKraft",
      description: "Spotlighting the next generation of technological advancements.",
      long_description: "NexKraft is an innovative startup focused on transforming the digital world through cutting-edge solutions.",
      image: "/assets/entepreneourship/nexkraft.png"
    },
    {
      id: 2,
      title: "Mechani",
      image: "/assets/entepreneourship/mechani.png"
    },
    {
      id: 3,
      title: "Huistle",
      image: "/assets/entepreneourship/huistle.png"
    },
    {
      id: 4,
      title: "Mindshaper",
      image: "/assets/entepreneourship/mindshaper.png"
    }
  ];

  const displayInnovations = innovationsData.length > 0 ? innovationsData : defaultInnovations;
  const mainInnovation = displayInnovations[0];
  const otherInnovations = displayInnovations.slice(1, 4);

  const handleOpenDialog = (innovation) => {
    setSelectedInnovation(innovation);
    setIsDialogOpen(true);
  };

  return (
    <div className="bg-white w-11/12 lg:w-9/12 mx-auto py-18">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h1 className="text-3xl lg:text-5xl font-semibold text-slate-900 lg:w-3/4 mb-6">
            {settings?.innovation_section_title || 'Igniting Innovation: A Startup Journey'}
          </h1>
          <p className="text-slate-900">
            {settings?.innovation_section_subtitle || 'Embarking on a journey of innovation, I\'ve founded and nurtured several startups that push the boundaries of technology and creativity. From NexKraft\'s focus on next-generation technological advancements to Mechani\'s engineering solutions, Huistle\'s innovative platforms, and Mindshaper\'s transformative ideas, each venture represents a step towards transforming bold concepts into impactful realities. This entrepreneurial path has been about more than just building companies—it\'s about fostering a culture of innovation that drives progress and creates lasting value in the digital world.'}
          </p>
        </div>

        <div
          className="w-full cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => handleOpenDialog(mainInnovation)}
        >
          <img 
            className="w-full object-cover" 
            src={mainInnovation?.image || mainInnovation?.featured_image || "/assets/entepreneourship/nexkraft.png"} 
            alt={mainInnovation?.title || "Innovation"} 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-24">
        {otherInnovations.map((innovation) => (
          <div 
            key={innovation.id} 
            className="w-full h-96 cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => handleOpenDialog(innovation)}
          >
            <img
              className="w-full h-full object-cover rounded-2xl"
              src={innovation.image || innovation.featured_image || "/assets/entepreneourship/default.png"}
              alt={innovation.title}
            />
          </div>
        ))}
      </div>

      {/* Innovation Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-[#2E5AFF] text-white border-none">
          {selectedInnovation && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold text-white">
                  "{selectedInnovation.title}"
                </DialogTitle>
                {selectedInnovation.description && (
                  <p className="text-xl text-white/90 mt-2">
                    {selectedInnovation.description}
                  </p>
                )}
              </DialogHeader>
              
              <div className="space-y-4">
                {/* Innovation Image */}
                <div className="w-full rounded-lg overflow-hidden">
                  <img
                    className="w-full object-cover"
                    src={selectedInnovation.image || selectedInnovation.featured_image || "/assets/entepreneourship/default.png"}
                    alt={selectedInnovation.title}
                  />
                </div>

                {/* Innovation Details */}
                {(selectedInnovation.long_description || selectedInnovation.content) && (
                  <p className="text-white/90 leading-relaxed">
                    {selectedInnovation.long_description || selectedInnovation.content}
                  </p>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Innovation;
