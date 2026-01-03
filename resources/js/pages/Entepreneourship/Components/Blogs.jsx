import { useState } from "react";
import { Link } from "@inertiajs/react";

const Blogs = ({ blogs = [], settings }) => {
  const [visibleCount, setVisibleCount] = useState(4);

  // Default blogs if none provided
  const defaultBlogs = Array(10).fill(null).map((_, index) => ({
    id: index + 1,
    slug: `enterprise-software-development-tip-${index + 1}`,
    featured_image: `/assets/blogs/img${index + 1}.png`,
    title: "7 Tips for Custom Enterprise Software Development in 2023",
    published_at: "2023-08-20",
    read_time: 10
  }));

  const displayBlogs = blogs.length > 0 ? blogs : defaultBlogs;
  const isAllVisible = visibleCount === displayBlogs.length;

  return (
    <div className="bg-white py-18">
      <div className="w-11/12 lg:w-9/12 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-5xl text-slate-900 font-semibold">{settings?.blogs_section_title || 'All Blog'}</h1>
          <button
            onClick={() => setVisibleCount(isAllVisible ? 4 : displayBlogs.length)}
            className="bg-[#0035F9] text-white font-semibold px-4 py-2 border-none rounded-md transition duration-300 ease-in-out hover:bg-slate-900 hover:text-white active:scale-95 focus:ring-2 focus:ring-slate-500"
          >
            {isAllVisible ? (settings?.blogs_show_less_text || 'Show Less') : (settings?.blogs_button_text || 'All Blogs')}
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
                  src={blog.featured_image || blog.image || "/assets/blogs/default.png"} 
                  alt={blog.title} 
                />
              </div>

              <div className="p-4">
                <h1 className="text-xl font-semibold text-slate-950 mb-4">
                  {blog.title}
                </h1>

                <div className="flex items-center gap-8 text-gray-600">
                  <p>
                    {blog.published_at 
                      ? new Date(blog.published_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
                      : '20 Aug 2023'}
                  </p>
                  <p>{blog.read_time || 10} Min Read</p>
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
