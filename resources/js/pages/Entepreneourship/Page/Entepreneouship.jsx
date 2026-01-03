import Banner from "../Components/Banner";
import Blogs from "../Components/Blogs";
import Events from "../Components/Events";
import Innovation from "../Components/Innovation";
import Quotes from "../Components/Quotes";
import Navbar from "@/components/Navbar";

const Entepreneouship = ({ blogs, quotes, events, innovations, settings }) => {
  return (
    <div>
      <Navbar />
      <Banner settings={settings} />
      <Quotes quotes={quotes} settings={settings} />
      <Innovation innovations={innovations} settings={settings} />
      <Events events={events} settings={settings} />
      <Blogs blogs={blogs} settings={settings} />
    </div>
  );
};

export default Entepreneouship;
