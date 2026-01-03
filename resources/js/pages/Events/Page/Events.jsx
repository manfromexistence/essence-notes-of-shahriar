import Activities from "../Components/Activities";
import AllEvents from "../Components/AllEvents";
import Banner from "../Components/Banner";
import Navbar from "@/components/Navbar";

const Events = ({ upcomingEvents, pastEvents, featuredEvents, settings }) => {
  return (
    <div>
      <Navbar />
      <Banner featuredEvents={featuredEvents} settings={settings} />
      <Activities upcomingEvents={upcomingEvents} settings={settings} />
      <AllEvents pastEvents={pastEvents} upcomingEvents={upcomingEvents} settings={settings} />
    </div>
  );
};

export default Events;
