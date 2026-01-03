import Navbar from "@/components/Navbar";
import Banner from "../Components/Banner";

const Home = ({ hero, statistics, socialMediaLinks }: { hero: any; statistics: any; socialMediaLinks: any }) => {
  return (
    <div className="relative flex flex-col">
      <div className="w-full absolute top-0 left-0 z-50 bg-transparent">
        <Navbar />
      </div>{" "}
      <Banner hero={hero} statistics={statistics} socialMediaLinks={socialMediaLinks} />
    </div>
  );
};

export default Home;