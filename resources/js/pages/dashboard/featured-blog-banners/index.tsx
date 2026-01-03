import { Head, Link, router } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface FeaturedBlogBanner {
    id: number;
    title: string;
    image: string;
    image_url?: string;
    date: string;
    read_time: string;
    size: string;
    order: number;
    is_active: boolean;
}

interface Props {
    auth: { user: any };
    banners: FeaturedBlogBanner[];
}

export default function Index({ auth, banners }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this banner?')) {
            router.delete(`/admin/featured-blog-banners/${id}`, {
                onSuccess: () => toast.success('Banner deleted successfully'),
            });
        }
    };

    return (
        <SidebarProvider
            style={
                {
                    '--sidebar-width': 'calc(var(--spacing) * 72)',
                    '--header-height': 'calc(var(--spacing) * 12)',
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="sidebar" />
            <SidebarInset>
                <SiteHeader />
                <Head title="Featured Blog Banners" />

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-semibold">Featured Blog Banners</h2>
                                    <Link
                                        href="/admin/featured-blog-banners/create"
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                    >
                                        <PlusCircle className="w-5 h-5 mr-2" />
                                        Add New Banner
                                    </Link>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {banners.map((banner) => (
                                        <div key={banner.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                            <div className="relative">
                                                <img
                                                    src={banner.image_url || banner.image}
                                                    alt={banner.title}
                                                    className="w-full h-48 object-cover"
                                                />
                                                <div className="absolute top-2 right-2 flex space-x-2">
                                                    <Link
                                                        href={`/admin/featured-blog-banners/${banner.id}/edit`}
                                                        className="bg-white p-2 rounded-full shadow-md text-blue-600 hover:text-blue-900"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(banner.id)}
                                                        className="bg-white p-2 rounded-full shadow-md text-red-600 hover:text-red-900"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <div className="absolute top-2 left-2">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${banner.size === 'large' ? 'bg-purple-500 text-white' :
                                                            banner.size === 'medium' ? 'bg-blue-500 text-white' :
                                                                'bg-gray-500 text-white'
                                                        }`}>
                                                        {banner.size}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="p-4">
                                                <h3 className="text-lg font-semibold mb-2">{banner.title}</h3>

                                                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                                                    <span>{new Date(banner.date).toLocaleDateString()}</span>
                                                    <span>{banner.read_time}</span>
                                                </div>

                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-gray-500">Order: {banner.order}</span>
                                                    <span className={`px-2 py-1 rounded-full text-xs ${banner.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                        {banner.is_active ? 'Active' : 'Inactive'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
