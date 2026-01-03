import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight, Calendar, MapPin, X } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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

const AllEvents = ({ pastEvents = [], upcomingEvents = [], settings }) => {
  const [selectedYear, setSelectedYear] = useState("All Years");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Combine all events
  const allEvents = [...upcomingEvents, ...pastEvents];
  
  // Default fallback events with images from settings
  const defaultEvents = [
    {
      image: settings?.default_event_image_1 || "/assets/entepreneourship/slider_1.jpeg",
      title: "Tech Innovations Conference 2024",
      event_date: "2024-06-10",
      location: "San Francisco, CA",
    },
    {
      image: settings?.default_event_image_2 || "/assets/entepreneourship/slider_2.jpeg",
      title: "Tech Innovations Conference 2024",
      event_date: "2024-06-10",
      location: "San Francisco, CA",
    },
    {
      image: settings?.default_event_image_3 || "/assets/entepreneourship/slider_3.jpeg",
      title: "Tech Innovations Conference 2024",
      event_date: "2024-06-10",
      location: "San Francisco, CA",
    },
    {
      image: settings?.default_event_image_4 || "/assets/entepreneourship/slider_4.jpeg",
      title: "Tech Innovations Conference 2024",
      event_date: "2024-06-10",
      location: "San Francisco, CA",
    },
    {
      image: settings?.default_event_image_5 || "/assets/entepreneourship/slider_5.jpeg",
      title: "Tech Innovations Conference 2024",
      event_date: "2024-06-10",
      location: "San Francisco, CA",
    },
  ];

  // Filter events by selected year
  const filteredEvents = selectedYear === "All Years" 
    ? allEvents 
    : allEvents.filter(event => {
        const eventYear = new Date(event.event_date).getFullYear().toString();
        return eventYear === selectedYear;
      });

  const displayEvents = filteredEvents.length > 0 ? filteredEvents : defaultEvents;

  const sliderSettings = {
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

  // Get unique years from events
  const years = [...new Set(allEvents.map(event => 
    new Date(event.event_date).getFullYear()
  ))].sort((a, b) => b - a);

  // Combine settings years with actual event years
  const availableYears = [...new Set([
    ...(settings?.year_filter_options || []),
    ...years.map(y => y.toString())
  ])].sort((a, b) => b - a);

  // Handle event click
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };

  return (
    <div className="bg-[#2E5AFF] py-18">
      <div className="w-11/12 lg:w-9/12 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-5xl text-white font-semibold">{settings?.events_section_title || "Events"}</h1>

          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="block max-w-sm bg-white text-slate-900 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option>All Years</option>
            {availableYears.map(year => (
              <option key={year}>{year}</option>
            ))}
            {availableYears.length === 0 && (
              <>
                <option>2024</option>
                <option>2023</option>
                <option>2022</option>
                <option>2021</option>
              </>
            )}
          </select>
        </div>

        {displayEvents.length > 0 && (
          <Slider {...sliderSettings}>
            {displayEvents.map((event, index) => (
              <div key={event.id || index} className="px-2">
                <div 
                  className="w-full h-[500px] relative rounded-2xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => handleEventClick(event)}
                >
                  {/* Image */}
                  <img
                    className="w-full h-full object-cover rounded-2xl"
                    src={event.image || "/assets/events/default.png"}
                    alt={event.title}
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black to-transparent"></div>

                  {/* Text Overlay */}
                  <div className="absolute inset-0 flex flex-col items-start justify-end text-white p-4">
                    <h1 className="text-3xl font-semibold mb-6">{event.title}</h1>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-slate-300">
                        <Calendar size={24} />
                      </p>
                      <p className="text-slate-300">
                        {event.event_date ? new Date(event.event_date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        }) : 'Date TBA'}
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

export default AllEvents;
