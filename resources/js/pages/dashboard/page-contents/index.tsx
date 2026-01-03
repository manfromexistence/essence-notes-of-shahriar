import { Head, Link, router } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface PageContent {
    id: number;
    page: string;
    section: string;
    key: string;
    value: string;
    type: string;
    is_active: boolean;
}

interface Props {
    auth: { user: any };
    pageContents: Record<string, Record<string, PageContent[]>>;
    pages: string[];
    selectedPage: string;
}

export default function Index({ auth, pageContents, pages, selectedPage }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this content?')) {
            router.delete(`/admin/page-contents/${id}`, {
                onSuccess: () => toast.success('Content deleted successfully'),
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
                <Head title="Page Contents" />

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-semibold">Page Contents</h2>
                                    <Link
                                        href="/admin/page-contents/create"
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                    >
                                        <PlusCircle className="w-5 h-5 mr-2" />
                                        Add New Content
                                    </Link>
                                </div>

                                {/* Page Filter */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Filter by Page
                                    </label>
                                    <select
                                        value={selectedPage}
                                        onChange={(e) => router.get('/admin/page-contents', { page: e.target.value })}
                                        className="w-full md:w-64 rounded-md border-gray-300 shadow-sm"
                                    >
                                        <option value="all">All Pages</option>
                                        {pages.map((page) => (
                                            <option key={page} value={page}>
                                                {page.charAt(0).toUpperCase() + page.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Contents by Page and Section */}
                                {Object.entries(pageContents).map(([pageName, sections]) => (
                                    <div key={pageName} className="mb-8">
                                        <h3 className="text-xl font-semibold mb-4 capitalize">
                                            {pageName} Page
                                        </h3>

                                        {Object.entries(sections as Record<string, PageContent[]>).map(([sectionName, contents]) => (
                                            <div key={sectionName} className="mb-6 ml-4">
                                                <h4 className="text-lg font-medium mb-3 text-gray-700 capitalize">
                                                    {sectionName} Section
                                                </h4>

                                                <div className="overflow-x-auto">
                                                    <table className="min-w-full divide-y divide-gray-200">
                                                        <thead className="bg-gray-50">
                                                            <tr>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Key</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="bg-white divide-y divide-gray-200">
                                                            {contents.map((content) => (
                                                                <tr key={content.id}>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                                        {content.key}
                                                                    </td>
                                                                    <td className="px-6 py-4 text-sm text-gray-500">
                                                                        {content.type === 'image' || content.type === 'url' ? (
                                                                            <a href={content.value} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                                                {content.value.length > 50 ? content.value.substring(0, 50) + '...' : content.value}
                                                                            </a>
                                                                        ) : (
                                                                            <span>{content.value.length > 50 ? content.value.substring(0, 50) + '...' : content.value}</span>
                                                                        )}
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100">
                                                                            {content.type}
                                                                        </span>
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                        <span className={`px-2 py-1 text-xs rounded-full ${content.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                                            {content.is_active ? 'Active' : 'Inactive'}
                                                                        </span>
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                        <Link
                                                                            href={`/admin/page-contents/${content.id}/edit`}
                                                                            className="text-blue-600 hover:text-blue-900 mr-3"
                                                                        >
                                                                            <Edit className="w-4 h-4 inline" />
                                                                        </Link>
                                                                        <button
                                                                            onClick={() => handleDelete(content.id)}
                                                                            className="text-red-600 hover:text-red-900"
                                                                        >
                                                                            <Trash2 className="w-4 h-4 inline" />
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
