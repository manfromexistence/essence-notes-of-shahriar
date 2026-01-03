import { Head, Link, router } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Associate {
    id: number;
    name: string;
    logo_image: string;
    logo_url?: string;
    url?: string;
    order: number;
    is_active: boolean;
}

interface Props {
    auth: { user: any };
    associates: Associate[];
}

export default function Index({ auth, associates }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this associate?')) {
            router.delete(`/admin/associates/${id}`, {
                onSuccess: () => toast.success("Associate deleted successfully"),
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
                <Head title="Associates" />

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-semibold">Associates</h2>
                                    <Link
                                        href="/admin/associates/create"
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                    >
                                        <PlusCircle className="w-5 h-5 mr-2" />
                                        Add New Associate
                                    </Link>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {associates.map((associate) => (
                                        <div key={associate.id} className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex justify-end mb-4 space-x-2">
                                                <Link
                                                    href={`/admin/associates/${associate.id}/edit`}
                                                    className="text-blue-600 hover:text-blue-900"
                                                >
                                                    <Edit className="w-5 h-5" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(associate.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>

                                            <div className="mb-4 flex items-center justify-center h-24">
                                                <img
                                                    src={associate.logo_url || associate.logo_image}
                                                    alt={associate.name}
                                                    className="max-h-full max-w-full object-contain"
                                                />
                                            </div>

                                            <h3 className="text-lg font-semibold text-center mb-2">{associate.name}</h3>

                                            {associate.url && (
                                                <a
                                                    href={associate.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm text-blue-600 hover:underline text-center block mb-2"
                                                >
                                                    Visit Website
                                                </a>
                                            )}

                                            <div className="flex items-center justify-between text-sm mt-4">
                                                <span className="text-gray-500">Order: {associate.order}</span>
                                                <span className={`px-2 py-1 rounded-full text-xs ${associate.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                    {associate.is_active ? 'Active' : 'Inactive'}
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
