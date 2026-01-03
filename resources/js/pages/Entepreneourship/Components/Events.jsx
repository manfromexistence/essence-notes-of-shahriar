import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight, Calendar, MapPin, Clock, User, Tag, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const NextArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 right-[-20px] transform -translate-y-1/2 bg-gray-100 text-slate-950 rounded-full p-3 cursor-pointer shadow-lg z-10"
    onClick={onClick}
  >
    <ChevronRight size={24} />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 left-[-20px] transform -translate-y-1/2 bg-gray-100 text-slate-950 rounded-full p-3 cursor-pointer shadow-lg z-10"
    onClick={onClick}
  >
    <ChevronLeft size={24} />
  </div>
);

const Events = ({ events = [], settings: pageSettings }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Default events if none provided
  const defaultEvents = [
    {
      id: 1,
      featured_image: "/assets/entepreneourship/slider_1.jpeg",
      title: "Tech Innovations Conference 2024",
      event_date: "2024-06-10",
      location: "San Francisco, CA",
    },
    {
      id: 2,
      featured_image: "/assets/entepreneourship/slider_2.jpeg",
      title: "Tech Innovations Conference 2024",
      event_date: "2024-06-10",
      location: "San Francisco, CA",
    },
    {
      id: 3,
      featured_image: "/assets/entepreneourship/slider_3.jpeg",
      title: "Tech Innovations Conference 2024",
      event_date: "2024-06-10",
      location: "San Francisco, CA",
    },
    {
      id: 4,
      featured_image: "/assets/entepreneourship/slider_4.jpeg",
      title: "Tech Innovations Conference 2024",
      event_date: "2024-06-10",
      location: "San Francisco, CA",
    },
    {
      id: 5,
      featured_image: "/assets/entepreneourship/slider_5.jpeg",
      title: "Tech Innovations Conference 2024",
      event_date: "2024-06-10",
      location: "San Francisco, CA",
    },
  ];

  const displayEvents = events.length > 0 ? events : defaultEvents;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(4, displayEvents.length),
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: Math.min(2, displayEvents.length) } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };

  return (
    <div className="bg-[#2E5AFF] py-18">
      <div className="w-11/12 lg:w-9/12 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-5xl text-white font-semibold">{pageSettings?.events_section_title || 'Events'}</h1>
          <a href="/events">
            <button className="bg-white text-slate-900 font-semibold px-4 py-2 border-none rounded-md transition duration-300 ease-in-out hover:bg-slate-900 hover:text-white active:scale-95 focus:ring-2 focus:ring-slate-500">
              {pageSettings?.events_button_text || 'All Events'}
            </button>
          </a>
        </div>

        {displayEvents.length > 0 && (
          <Slider {...settings}>
            {displayEvents.map((event) => (
              <div key={event.id} className="px-2">
                <div 
                  className="w-full h-[500px] relative rounded-2xl overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
                  onClick={() => handleEventClick(event)}
                >
                  {/* Image */}
                  <img
                    className="w-full h-full object-cover rounded-2xl"
                    src={event.featured_image || event.image || "/assets/entepreneourship/default.jpeg"}
                    alt={event.title}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

                  {/* Text Overlay */}
                  <div className="absolute inset-0 flex flex-col items-start justify-end text-white p-4">
                    <h1 className="text-3xl font-semibold mb-6">{event.title}</h1>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-slate-300">
                        <Calendar size={24} />
                      </p>
                      <p className="text-slate-300">
                        {event.event_date 
                          ? new Date(event.event_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                          : 'Date TBA'}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-slate-300">
                        <MapPin size={24} />
                      </p>
                      <p className="text-slate-300">{event.location || 'Location TBA'}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>

      {/* Event Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{selectedEvent.title}</DialogTitle>
                {selectedEvent.category && (
                  <Badge variant="secondary" className="w-fit mt-2">
                    {selectedEvent.category}
                  </Badge>
                )}
              </DialogHeader>
              
              <div className="space-y-4">
                {/* Event Image */}
                <div className="w-full h-64 rounded-lg overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={selectedEvent.featured_image || selectedEvent.image || "/assets/entepreneourship/default.jpeg"}
                    alt={selectedEvent.title}
                  />
                </div>

                {/* Event Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Calendar size={20} className="text-blue-500" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Date</p>
                      <p>
                        {selectedEvent.event_date 
                          ? new Date(selectedEvent.event_date).toLocaleDateString('en-US', { 
                              weekday: 'long',
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })
                          : 'Date TBA'}
                      </p>
                    </div>
                  </div>

                  {selectedEvent.event_time && (
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Clock size={20} className="text-blue-500" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Time</p>
                        <p>{selectedEvent.event_time}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin size={20} className="text-blue-500" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Location</p>
                      <p>{selectedEvent.location || 'Location TBA'}</p>
                    </div>
                  </div>

                  {selectedEvent.organizer && (
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <User size={20} className="text-blue-500" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Organizer</p>
                        <p>{selectedEvent.organizer}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Event Description */}
                {selectedEvent.description && (
                  <div className="pt-4 border-t">
                    <h3 className="font-semibold mb-2">About this Event</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedEvent.description}
                    </p>
                  </div>
                )}

                {/* Status Badges */}
                <div className="flex gap-2 pt-2">
                  {selectedEvent.is_featured && (
                    <Badge variant="default">Featured</Badge>
                  )}
                  {selectedEvent.is_past && (
                    <Badge variant="outline">Past Event</Badge>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Events;
