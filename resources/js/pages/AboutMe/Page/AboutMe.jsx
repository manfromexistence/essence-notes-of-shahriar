import Banner from "../Components/Banner";
import Report from "../Components/Report";
import Awards from "../Components/Awards";
import Story from "../Components/Story";
import Impact from "../Components/Impact";
import Travel from "../Components/Travel";
import Corporate from "../Components/Corporate";
import Associate from "../Components/Associate";
import Navbar from "@/components/Navbar";

const Aboutus = ({ sections, awards, pageContent, corporateJourney, associates, travelCountries, impactItems }) => {
  const storySection = sections?.story?.[0];
  const impactSection = sections?.impact?.[0];
  const travelSection = sections?.travel?.[0];

  return (
    <div>
      <Navbar />
      <Banner pageContent={pageContent} />
      <Report pageContent={pageContent} />
      <Awards awards={awards} />
      <Story section={storySection} />
      <Impact pageContent={pageContent} impactItems={impactItems} />
      <Travel pageContent={pageContent} travelCountries={travelCountries} />
      <Corporate pageContent={pageContent} corporateJourney={corporateJourney} />
      <Associate pageContent={pageContent} associates={associates} />
    </div>
  );
};

export default Aboutus;
