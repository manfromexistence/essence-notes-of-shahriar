import { Head, Link, router } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface CorporateJourneyItem {
    id: number;
    step_number: number;
    title: string;
    company: string;
    description: string;
    icon_image?: string;
    icon_url?: string;
    order: number;
    is_active: boolean;
}

interface Props {
    auth: { user: any };
    items: CorporateJourneyItem[];
}

export default function Index({ auth, items }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this item?')) {
            router.delete(`/admin/corporate-journey/${id}`, {
                onSuccess: () => toast.success('Corporate journey item deleted successfully'),
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
                <Head title="Corporate Journey" />

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-semibold">Corporate Journey Items</h2>
                                    <Link
                                        href="/admin/corporate-journey/create"
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                    >
                                        <PlusCircle className="w-5 h-5 mr-2" />
                                        Add New Item
                                    </Link>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {items.map((item) => (
                                        <div key={item.id} className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-400">
                                                    <span className="text-xl font-bold text-gray-600">{item.step_number}</span>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <Link
                                                        href={`/admin/corporate-journey/${item.id}/edit`}
                                                        className="text-blue-600 hover:text-blue-900"
                                                    >
                                                        <Edit className="w-5 h-5" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>

                                            {item.icon_image && (
                                                <div className="mb-4">
                                                    <img
                                                        src={item.icon_url || item.icon_image}
                                                        alt={item.title}
                                                        className="h-20 object-contain mx-auto"
                                                    />
                                                </div>
                                            )}

                                            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                            <p className="text-lg text-gray-700 mb-2">{item.company}</p>
                                            <p className="text-sm text-gray-600 mb-4">{item.description}</p>

                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-500">Order: {item.order}</span>
                                                <span className={`px-2 py-1 rounded-full text-xs ${item.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                    {item.is_active ? 'Active' : 'Inactive'}
                                                </span>
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
