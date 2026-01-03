import AllBlog from "../Components/AllBlog";
import Banner from "../Components/Banner";
import Navbar from "@/components/Navbar";

const Blogs = ({ blogs, pageContent, featuredBanners, pageSettings }) => {
  return (
    <div>
      <Navbar />
      <Banner 
        pageContent={pageContent} 
        featuredBanners={featuredBanners} 
        pageSettings={pageSettings} 
        blogs={blogs}
      />
      <AllBlog blogs={blogs} pageSettings={pageSettings} />
    </div>
  );
};

export default Blogs;
