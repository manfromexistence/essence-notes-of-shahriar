import Banner from "../Components/Banner";
import Blogs from "../Components/Blogs";
import Certificates from "../Components/Certificates";
import CyberSecurity from "../Components/CyberSecurity";
import TechnologyField from "../Components/TechnologyField";
import Navbar from "@/components/Navbar";

const Technology = ({ technologies, certificates, cyberSecurity, pageSettings, blogs }) => {
  return (
    <div>
      <Navbar />
      <Banner pageSettings={pageSettings} />
      <CyberSecurity items={cyberSecurity} pageSettings={pageSettings} />
      <TechnologyField technologies={technologies} pageSettings={pageSettings} />
      <Certificates certificates={certificates} pageSettings={pageSettings} />
      <Blogs pageSettings={pageSettings} blogs={blogs} />
    </div>
  );
};

export default Technology;
