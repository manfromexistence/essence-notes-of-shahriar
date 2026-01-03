import Banner from "../Components/Banner";
import DonationList from "../Components/DonationList";
import Navbar from "@/components/Navbar";

const Donations = ({ donations, pageSettings }) => {
  return (
    <div>
      <Navbar />
      <Banner pageSettings={pageSettings} />
      <DonationList donations={donations} pageSettings={pageSettings} />
    </div>
  );
};

export default Donations;
