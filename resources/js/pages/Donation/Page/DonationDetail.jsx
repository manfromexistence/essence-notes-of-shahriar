import Proceed from "../Components/Proceed";
import Navbar from "@/components/Navbar";

const DonationDetail = ({ donation, pageSettings }) => {
  return (
    <div>
      <Navbar />
      <Proceed donation={donation} pageSettings={pageSettings} />
    </div>
  );
};

export default DonationDetail;
