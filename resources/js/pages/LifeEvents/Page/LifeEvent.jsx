import Banner from "../Components/Banner";
import Category from "../Components/Category";
import Navbar from "@/components/Navbar";

const LifeEvent = ({ lifeEvents, categories, settings }) => {
  return (
    <div>
      <Navbar />
      <Banner settings={settings} />
      <Category lifeEvents={lifeEvents} categories={categories} settings={settings} />
    </div>
  );
};

export default LifeEvent;
