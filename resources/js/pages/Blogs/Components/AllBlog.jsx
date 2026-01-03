import { Search } from "lucide-react";
import { useState, useMemo } from "react";
import { Link } from "@inertiajs/react";
import { Calendar, Clock, Tag } from "lucide-react";

const AllBlog = ({ blogs = [], pageSettings }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Enhanced search functionality - search across multiple fields
  const filteredBlogs = useMemo(() => {
    if (!searchQuery.trim()) return blogs;

    const query = searchQuery.toLowerCase().trim();
    
    return blogs.filter((blog) => {
      // Search in title
      if (blog.title?.toLowerCase().includes(query)) return true;
      
      // Search in excerpt
      if (blog.excerpt?.toLowerCase().includes(query)) return true;
      
      // Search in content (strip HTML tags for better search)
      if (blog.content) {
        const plainContent = blog.content.replace(/<[^>]*>/g, '').toLowerCase();
        if (plainContent.includes(query)) return true;
      }
      
      // Search in category
      if (blog.category?.toLowerCase().includes(query)) return true;
      
      // Search in tags
      if (blog.tags) {
        const tags = blog.tags.split(',').map(tag => tag.trim().toLowerCase());
        if (tags.some(tag => tag.includes(query))) return true;
      }
      
      return false;
    });
  }, [blogs, searchQuery]);

  return (
    <div className="w-11/12 lg:w-9/12 mx-auto py-18">
      <div className="flex items-center justify-between py-12">
        <h1 className="text-4xl font-semibold text-slate-950">
          {pageSettings?.all_blogs_section_title || "All Blogs"}
        </h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search by title, content, category, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-lg px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-md shadow-md"
          />

          <div className="absolute top-3 left-4 text-lg">
            <Search className="text-gray-500" />
          </div>
        </div>
      </div>

      {/* Search Results Info */}
      {searchQuery.trim() && (
        <div className="mb-6 text-gray-600">
          <p>
            Found {filteredBlogs.length} blog{filteredBlogs.length !== 1 ? 's' : ''} 
            {filteredBlogs.length !== blogs.length && ` out of ${blogs.length} total`}
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {filteredBlogs.map((blog) => (
          <Link 
            key={blog.id}
            href={`/blogs/${blog.slug}`}
            className="block cursor-pointer hover:shadow-lg transition-shadow duration-300 rounded-2xl overflow-hidden bg-white"
          >
            <div>
              <div className="w-full">
                <img 
                  className="rounded-t-2xl w-full h-48 object-cover" 
                  src={blog.featured_image || '/assets/blogs/default.png'} 
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
            </div>
          </Link>
        ))}
      </div>

      {filteredBlogs.length === 0 && (
        <div className="text-center py-12">
          {searchQuery.trim() ? (
            <div>
              <p className="text-gray-500 text-lg mb-2">No blog posts found for "{searchQuery}"</p>
              <p className="text-gray-400 text-sm">Try searching with different keywords or check your spelling</p>
            </div>
          ) : (
            <p className="text-gray-500 text-lg">No blog posts found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AllBlog;
