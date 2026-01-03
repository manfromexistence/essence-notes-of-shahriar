import { Calendar, MapPin } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Banner = ({ featuredEvents = [], settings }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Default events if none provided
  const defaultEvents = [
    {
      image: "/assets/entepreneourship/slider_1.jpeg",
      title: "Tech Innovations Conference 2024",
      event_date: "2024-06-10",
      location: "San Francisco, CA"
    },
    {
      image: "/assets/entepreneourship/slider_3.jpeg",
      title: "Tech Innovations Conference 2024",
      event_date: "2024-06-10",
      location: "San Francisco, CA"
    },
    {
      image: "/assets/entepreneourship/slider_4.jpeg",
      title: "Tech Innovations Conference 2024",
      event_date: "2024-06-10",
      location: "San Francisco, CA"
    },
    {
      image: "/assets/entepreneourship/slider_2.jpeg",
      title: "Tech Innovations Conference 2024",
      event_date: "2024-06-10",
      location: "San Francisco, CA"
    }
  ];

  const displayEvents = featuredEvents.length >= 4 ? featuredEvents.slice(0, 4) : defaultEvents;

  // Handle event click
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };

  return (
    <div className="bg-slate-50 relative min-h-screen">
      {/* Background Patterns */}
      <div className="absolute right-0 p-1 hidden lg:block">
        <img src={settings?.banner_vector_image || "/assets/events/banner_vector.png"} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="absolute left-0 bottom-0 hidden lg:block">
        <img src={settings?.banner_bottom_vector || "/assets/events/bottom_vector.png"} alt="" />
      </div>

      <div className="pt-24">
        <h1 className="text-slate-950 text-5xl text-center font-semibold mb-16">
          {settings?.banner_title || "Active Events"}
        </h1>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
          {[
            {
              lgRotate: "lg:rotate-2",
              lgTranslateX: "lg:translate-x-0",
              lgTranslateY: "lg:translate-y-10",
            },
            {
              lgRotate: "lg:-rotate-4",
              lgTranslateX: "lg:-translate-x-10",
              lgTranslateY: "lg:translate-y-0",
            },
            {
              lgRotate: "lg:-rotate-6",
              lgTranslateX: "lg:-translate-x-16",
              lgTranslateY: "lg:translate-y-4",
            },
            {
              lgRotate: "lg:rotate-3",
              lgTranslateX: "lg:-translate-x-32",
              lgTranslateY: "lg:translate-y-12",
            },
          ].map((style, index) => {
            const event = displayEvents[index];
            return (
              <div
                key={event?.id || index}
                className={`group w-88 h-[500px] relative rounded-2xl overflow-hidden transition-all duration-500 ease-in-out cursor-pointer
                ${style.lgRotate} ${style.lgTranslateX} ${style.lgTranslateY}
                lg:hover:rotate-0 lg:hover:translate-x-0 lg:hover:translate-y-0 lg:hover:scale-105 lg:group-hover:z-10`}
                onClick={() => handleEventClick(event)}
              >
                {/* Image */}
                <img
                  className="w-full h-full object-cover rounded-2xl"
                  src={event?.image || "/assets/events/default.png"}
                  alt={event?.title || "Event"}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black to-transparent"></div>
                {/* Text Overlay */}
                <div className="absolute inset-0 flex flex-col items-start justify-end text-white p-4">
                  <h1 className="text-3xl font-semibold mb-6">
                    {event?.title || "Tech Innovations Conference 2024"}
                  </h1>
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-slate-300">
                      <Calendar size={24} />
                    </p>
                    <p className="text-slate-300">
                      {event?.event_date ? new Date(event.event_date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      }) : 'June 10, 2024'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-slate-300">
                      <MapPin size={24} />
                    </p>
                    <p className="text-slate-300">{event?.location || "San Francisco, CA"}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Event Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{selectedEvent?.title}</DialogTitle>
          </DialogHeader>
          
          {selectedEvent && (
            <div className="space-y-4">
              {/* Event Image */}
              <div className="w-full h-64 rounded-lg overflow-hidden">
                <img
                  src={selectedEvent.image || "/assets/events/default.png"}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Event Details */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={20} />
                  <span>
                    {selectedEvent.event_date 
                      ? new Date(selectedEvent.event_date).toLocaleDateString('en-US', { 
                          weekday: 'long',
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        }) 
                      : 'Date TBA'
                    }
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={20} />
                  <span>{selectedEvent.location || 'Location TBA'}</span>
                </div>

                {/* Event Description if available */}
                {selectedEvent.description && (
                  <div className="mt-4">
                    <h3 className="font-semibold text-lg mb-2">About This Event</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedEvent.description}</p>
                  </div>
                )}

                {/* Event Status */}
                <div className="mt-4 pt-4 border-t">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    selectedEvent.is_past 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {selectedEvent.is_past ? 'Past Event' : 'Upcoming Event'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Banner;
