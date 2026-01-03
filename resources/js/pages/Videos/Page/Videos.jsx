import Banner from "../Components/Banner";
import AllVideos from "../Components/AllVideos";
import ShortVideos from "../Components/ShortVideos";
import Navbar from "@/components/Navbar";

const Videos = ({ videos, shortVideos, settings }) => {
  return (
    <div>
      <Navbar />
      <Banner videos={settings?.banner_videos || videos.slice(0, 3)} settings={settings} />
      <AllVideos videos={videos} settings={settings} />
      <ShortVideos videos={shortVideos} settings={settings} />
    </div>
  );
};

export default Videos;
