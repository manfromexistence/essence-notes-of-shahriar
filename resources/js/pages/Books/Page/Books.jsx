import Banner from "../Components/Banner";
import Highlights from "../Components/Highlights";
import Summary from "../Components/Summary";
import Review from "../Components/Review";
import RecommendedBooks from "../Components/RecommendedBooks";
import Navbar from "@/components/Navbar";

const Books = ({ recommendedBooks, allBooks, settings, carouselSlides }) => {
  return (
    <div>
      <Navbar />
      <Banner books={allBooks} settings={settings} carouselSlides={carouselSlides} />
      <Highlights books={allBooks} settings={settings} />
      <Summary books={allBooks} settings={settings} />
      <Review books={allBooks} settings={settings} />
      <RecommendedBooks books={recommendedBooks} settings={settings} />
    </div>
  );
};

export default Books;
