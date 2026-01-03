import { Head, Link } from "@inertiajs/react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Calendar, 
  Clock, 
  Eye, 
  Tag, 
  ArrowLeft, 
  Share2, 
  BookOpen,
  ChevronRight 
} from "lucide-react";

const BlogDetail = ({ blog, similarBlogs = [], pageSettings }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled or failed');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Draft';
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const tags = blog.tags ? blog.tags.split(',').map(tag => tag.trim()) : [];

  return (
    <>
      <Head title={blog.title} />
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        
        {/* Hero Section with Featured Image */}
        <div className="relative pt-32 pb-16 bg-linear-to-b from-slate-100 to-slate-50">
          <div className="absolute top-0 right-0 hidden lg:block opacity-50">
            <img src={pageSettings?.banner_vector_right || "/assets/blogs/vector_right.svg"} alt="" />
          </div>
          
          <div className="w-11/12 lg:w-8/12 mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
              <Link href="/blogs" className="hover:text-blue-600 transition-colors flex items-center gap-1">
                <ArrowLeft size={16} />
                <span>Back to Blogs</span>
              </Link>
              <ChevronRight size={14} />
              <span className="text-gray-400 truncate max-w-xs">{blog.title}</span>
            </nav>

            {/* Category Badge */}
            {blog.category && (
              <Badge variant="secondary" className="mb-4 text-sm px-4 py-1">
                {blog.category}
              </Badge>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              {blog.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-gray-600 mb-8">
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{formatDate(blog.published_at)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>{blog.read_time} min read</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye size={18} />
                <span>{blog.views || 0} views</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-8">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 size={16} className="mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-11/12 lg:w-8/12 mx-auto py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Blog Content */}
            <div className="lg:col-span-2">
              {/* Featured Image */}
              <Card className="overflow-hidden mb-8 p-0!">
                <div className="aspect-video w-full">
                  <img
                    src={blog.featured_image || "/assets/blogs/default.png"}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Card>

              {/* Excerpt */}
              {blog.excerpt && (
                <Card className="mb-8">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <BookOpen className="text-blue-600 mt-1 shrink-0" size={20} />
                      <p className="text-lg text-gray-700 italic leading-relaxed">
                        {blog.excerpt}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Main Content */}
              <Card>
                <CardContent className="pt-6">
                  <div 
                    className="prose prose-lg max-w-none prose-headings:text-slate-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-slate-900 prose-img:rounded-lg"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />
                </CardContent>
              </Card>

              {/* Tags */}
              {tags.length > 0 && (
                <Card className="mt-8">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-slate-900">
                      <Tag size={18} />
                      <h3 className="font-semibold">Tags</h3>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="px-3 py-1">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Similar Blogs */}
              {similarBlogs.length > 0 && (
                <Card className="sticky top-24">
                  <CardHeader>
                    <h3 className="text-lg font-semibold text-slate-900">Similar Articles</h3>
                    <p className="text-sm text-gray-500">You might also like these</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {similarBlogs.map((similarBlog) => (
                        <Link
                          key={similarBlog.id}
                          href={`/blogs/${similarBlog.slug}`}
                          className="block group"
                        >
                          <div className="flex gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                            <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden">
                              <img
                                src={similarBlog.featured_image || '/assets/blogs/default.png'}
                                alt={similarBlog.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                {similarBlog.title}
                              </h4>
                              <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                <span>{similarBlog.read_time} min</span>
                                <span>•</span>
                                <span>{similarBlog.views || 0} views</span>
                              </div>
                              {similarBlog.category && (
                                <Badge variant="secondary" className="text-xs mt-1">
                                  {similarBlog.category}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <Link href="/blogs">
                      <Button variant="ghost" className="w-full">
                        View All Blogs
                        <ChevronRight size={16} className="ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}

              {/* Back to Blogs Card (shown when no similar blogs) */}
              {similarBlogs.length === 0 && (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <p className="text-gray-600 mb-4">Explore more articles</p>
                    <Link href="/blogs">
                      <Button>
                        <ArrowLeft size={16} className="mr-2" />
                        Back to Blogs
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="w-11/12 lg:w-8/12 mx-auto py-8 border-t">
          <div className="flex justify-center">
            <Link href="/blogs">
              <Button variant="outline" size="lg">
                <ArrowLeft size={18} className="mr-2" />
                Back to All Blogs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetail;
