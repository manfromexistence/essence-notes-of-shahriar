import { Link } from "@inertiajs/react";

const Banner = ({ pageContent, featuredBanners, pageSettings, blogs = [] }) => {
  const bannerData = pageContent?.banner || {};
  
  // If featuredBanners exist and have items, use them
  // Otherwise, use the latest blogs from the database
  const useFeaturedBanners = featuredBanners && featuredBanners.length > 0;
  
  // Transform blogs to banner format if needed
  const blogsAsBanners = blogs.slice(0, 5).map((blog, index) => ({
    id: blog.id,
    slug: blog.slug,
    title: blog.title,
    image: blog.featured_image,
    image_url: blog.featured_image,
    date: blog.published_at,
    read_time: blog.read_time ? `${blog.read_time} Min Read` : '5 Min Read',
    size: index === 0 ? 'large' : 'medium',
  }));
  
  const banners = useFeaturedBanners ? featuredBanners : blogsAsBanners;
  
  // Organize banners by size
  const largeBanner = banners.find(b => b.size === 'large') || banners[0];
  const mediumBanners = banners.filter(b => b.size === 'medium').slice(0, 4);
  
  // If using blogs as banners and we have more than 1, take index 1-4 as medium
  const displayMediumBanners = useFeaturedBanners 
    ? mediumBanners 
    : blogsAsBanners.slice(1, 5);
  
  return (
    <div className="bg-slate-100 pt-48 pb-16 relative">
      <div className="absolute top-0 right-0 hidden lg:block">
        <img src={pageSettings?.banner_vector_right || "/assets/blogs/vector_right.svg"} alt="" />
      </div>

      <div className="absolute bottom-0 left-0 hidden lg:block">
        <img src={pageSettings?.banner_vector_left || "/assets/blogs/vector_left.svg"} alt="" />
      </div>

      <h1 className="text-slate-950 text-5xl font-semibold text-center mb-8">
        {pageSettings?.banner_title || "Latest Blogs & Insights"}
      </h1>

      <div className="w-11/12 lg:w-9/12 mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:grid-rows-2">
          {largeBanner && (
            <Link 
              href={`/blogs/${largeBanner.slug}`}
              className="lg:col-span-2 lg:row-span-2 cursor-pointer hover:shadow-lg transition-shadow duration-300 block rounded-2xl overflow-hidden bg-white"
            >
              <div>
                <div>
                  <img className="rounded-t-2xl w-full" src={largeBanner.image_url || largeBanner.image} alt={largeBanner.title} />
                </div>

                <div className="p-4 lg:p-8">
                  <h1 className="text-2xl lg:text-4xl font-semibold text-slate-950 mb-4">
                    {largeBanner.title}
                  </h1>

                  <div className="flex items-center gap-8 text-gray-600">
                    <p>{new Date(largeBanner.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    <p>{largeBanner.read_time}</p>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {displayMediumBanners.map((banner, index) => (
            <Link 
              key={banner.id || index} 
              href={`/blogs/${banner.slug}`}
              className="lg:col-span-1 lg:row-span-1 cursor-pointer hover:shadow-lg transition-shadow duration-300 block rounded-2xl overflow-hidden bg-white"
            >
              <div>
                <div className="w-full">
                  <img className="rounded-t-2xl w-full" src={banner.image_url || banner.image} alt={banner.title} />
                </div>

                <div className="p-4">
                  <h1 className="text-xl font-semibold text-slate-950 mb-2">
                    {banner.title}
                  </h1>

                  <div className="flex items-center gap-8 text-gray-600">
                    <p>{new Date(banner.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    <p>{banner.read_time}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
