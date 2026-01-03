import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, MapPin } from "lucide-react";

const Activities = ({ upcomingEvents = [], settings }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Get first 4 events for the grid
  const events = upcomingEvents.slice(0, 4);
  
  // Default images from settings or fallback
  const defaultImages = [
    settings?.activities_image_1 || "/assets/events/event_activites_1.png",
    settings?.activities_image_2 || "/assets/events/event_activities_2.png",
    settings?.activities_image_3 || "/assets/events/event_activites_3.png",
    settings?.activities_image_4 || "/assets/events/event_activites_4.png"
  ];
  
  // Create default events for when there are no actual events
  const defaultEvents = [
    {
      id: 'default-1',
      title: "Tech Conference 2024",
      image: defaultImages[0],
      event_date: "2024-06-15",
      location: "San Francisco, CA",
      description: "A premier technology conference featuring industry leaders and innovative solutions.",
      is_past: false
    },
    {
      id: 'default-2', 
      title: "Innovation Summit",
      image: defaultImages[1],
      event_date: "2024-07-20",
      location: "New York, NY",
      description: "Exploring the latest innovations in technology and entrepreneurship.",
      is_past: false
    },
    {
      id: 'default-3',
      title: "Startup Workshop",
      image: defaultImages[2], 
      event_date: "2024-08-10",
      location: "Austin, TX",
      description: "Hands-on workshop for aspiring entrepreneurs and startup founders.",
      is_past: false
    },
    {
      id: 'default-4',
      title: "Networking Event",
      image: defaultImages[3],
      event_date: "2024-09-05", 
      location: "Seattle, WA",
      description: "Connect with fellow professionals and build valuable business relationships.",
      is_past: false
    }
  ];

  // Create display events: use actual events first, then fill with defaults
  const displayEvents = [
    events[0] || defaultEvents[0],
    events[1] || defaultEvents[1], 
    events[2] || defaultEvents[2],
    events[3] || defaultEvents[3]
  ];

  // Handle event click
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };

  return (
    <div className="w-11/12 lg:w-9/12 mx-auto py-18">
      <div className="grid grid-cols-1 lg:grid-cols-3 place-items-center gap-12 ">
        <div className="lg:col-span-1">
          <h1 className="text-5xl text-slate-900 font-semibold mb-6">
            {settings?.activities_section_title || "Last Events Activities"}
          </h1>
          <p className="text-slate-900">
            {settings?.activities_section_description || "Explore the highlights from my recent events and activities, where I've engaged with communities, shared insights, and collaborated on innovative projects. These moments capture the essence of networking, learning, and growth in the entrepreneurial and tech space, showcasing the dynamic experiences that shape my journey."}
          </p>
        </div>

        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-6 mb-6">
            <div className="w-full lg:col-span-2 lg:row-span-2">
                <div 
                  className="w-full h-72 cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => handleEventClick(displayEvents[0])}
                >
                  <img
                    className="w-full h-full object-cover rounded-xl"
                    src={displayEvents[0].image}
                    alt={displayEvents[0].title}
                  />
                </div>
            </div>
            <div className="w-full lg:col-span-1 lg:row-span-1"></div>
            <div className="w-full lg:col-span-1 lg:row-span-1 ">
              <div 
                className="w-full h-36 cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => handleEventClick(displayEvents[1])}
              >
                <img
                  className="w-full h-full object-cover rounded-xl"
                  src={displayEvents[1].image}
                  alt={displayEvents[1].title}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-6">
            <div className="w-full lg:col-span-1 lg:row-span-1">
              <div 
                className="w-full h-36 cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => handleEventClick(displayEvents[2])}
              >
                <img
                  className="w-full h-full object-cover rounded-xl"
                  src={displayEvents[2].image}
                  alt={displayEvents[2].title}
                />
              </div>
            </div>
            <div className="w-full lg:col-span-2 lg:row-span-2">
              <div 
                className="w-full h-72 cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => handleEventClick(displayEvents[3])}
              >
                <img
                  className="w-full h-full object-cover rounded-xl"
                  src={displayEvents[3].image}
                  alt={displayEvents[3].title}
                />
              </div>
            </div>
          </div>
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

export default Activities;
