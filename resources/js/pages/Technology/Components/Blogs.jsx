import { useState } from "react";
import { Link } from "@inertiajs/react";

const Blogs = ({ blogs = [], pageSettings }) => {
  // Use provided blogs or fallback to default images
  const defaultImages = [
    { 
      id: 1,
      slug: "future-of-ai-bangladeshi-businesses",
      featured_image: "/assets/blogs/img6.png", 
      title: "The Future of AI in Bangladeshi Businesses",
      published_at: "2023-08-20",
      read_time: 10,
      category: "AI & Technology",
    },
    { 
      id: 2,
      slug: "cybersecurity-best-practices-smes",
      featured_image: "/assets/blogs/img2.png", 
      title: "Cybersecurity Best Practices for SMEs",
      published_at: "2023-08-15",
      read_time: 8,
      category: "Cybersecurity",
    },
    { 
      id: 3,
      slug: "digital-transformation-strategies",
      featured_image: "/assets/blogs/img3.png", 
      title: "Digital Transformation Strategies",
      published_at: "2023-08-10",
      read_time: 12,
      category: "Digital Transformation",
    },
    { 
      id: 4,
      slug: "cloud-computing-trends-2024",
      featured_image: "/assets/blogs/img4.png", 
      title: "Cloud Computing Trends in 2024",
      published_at: "2023-08-05",
      read_time: 9,
      category: "Cloud Computing",
    },
    { 
      id: 5,
      slug: "building-scalable-tech-startups",
      featured_image: "/assets/blogs/img5.png", 
      title: "Building Scalable Tech Startups",
      published_at: "2023-07-30",
      read_time: 15,
      category: "Startups",
    },
    { 
      id: 6,
      slug: "impact-of-5g-business-innovation",
      featured_image: "/assets/blogs/img6.png", 
      title: "The Impact of 5G on Business Innovation",
      published_at: "2023-07-25",
      read_time: 11,
      category: "5G & Connectivity",
    },
    { 
      id: 7,
      slug: "data-analytics-competitive-advantage",
      featured_image: "/assets/blogs/img7.png", 
      title: "Data Analytics for Competitive Advantage",
      published_at: "2023-07-20",
      read_time: 13,
      category: "Data Analytics",
    },
    { 
      id: 8,
      slug: "sustainable-technology-solutions",
      featured_image: "/assets/blogs/img8.png", 
      title: "Sustainable Technology Solutions",
      published_at: "2023-07-15",
      read_time: 10,
      category: "Sustainability",
    },
    { 
      id: 9,
      slug: "blockchain-applications-finance",
      featured_image: "/assets/blogs/img9.png", 
      title: "Blockchain Applications in Finance",
      published_at: "2023-07-10",
      read_time: 14,
      category: "Blockchain",
    },
    { 
      id: 10,
      slug: "ux-design-principles-tech-products",
      featured_image: "/assets/blogs/img10.png", 
      title: "UX Design Principles for Tech Products",
      published_at: "2023-07-05",
      read_time: 12,
      category: "UX Design",
    },
  ];

  const displayBlogs = blogs.length > 0 ? blogs : defaultImages;

  const [visibleCount, setVisibleCount] = useState(4);
  const isAllVisible = visibleCount === displayBlogs.length;

  return (
    <div className="bg-white py-18">
      <div className="w-11/12 lg:w-9/12 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-5xl text-slate-900 font-semibold">{pageSettings?.blogs_title || 'All Blog'}</h1>
          <button
            onClick={() => setVisibleCount(isAllVisible ? 4 : displayBlogs.length)}
            className="bg-[#0035F9] text-white font-semibold px-4 py-2 border-none rounded-md transition duration-300 ease-in-out hover:bg-slate-900 hover:text-white active:scale-95 focus:ring-2 focus:ring-slate-500"
          >
            {isAllVisible ? "Show Less" : "All Blogs"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {displayBlogs.slice(0, visibleCount).map((blog) => (
            <Link 
              key={blog.id}
              href={`/blogs/${blog.slug}`}
              className="block cursor-pointer hover:shadow-lg transition-shadow duration-300 rounded-2xl overflow-hidden bg-white"
            >
              <div className="w-full">
                <img 
                  className="rounded-t-2xl w-full h-48 object-cover" 
                  src={blog.featured_image || blog.img || "/assets/blogs/default.png"} 
                  alt={blog.title} 
                />
              </div>

              <div className="p-4">
                <h1 className="text-xl font-semibold text-slate-950 mb-4">
                  {blog.title}
                </h1>

                <div className="flex items-center gap-8 text-gray-600">
                  <p>{blog.published_at ? new Date(blog.published_at).toLocaleDateString() : 'Draft'}</p>
                  <p>{blog.read_time} Min Read</p>
                </div>

                {blog.category && (
                  <div className="mt-2">
                    <span className="inline-block px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                      {blog.category}
                    </span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
