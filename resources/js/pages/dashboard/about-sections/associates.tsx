import { Head, Link, router } from "@inertiajs/react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

interface Associate {
    id: number;
    name: string;
    logo_image: string | null;
    order: number;
    is_active: boolean;
}

interface Props {
    associates: Associate[];
}

export default function AboutSectionsAssociates({ associates }: Props) {
    const handleDeleteAssociate = (id: number) => {
        if (confirm('Are you sure you want to delete this associate?')) {
            router.delete(`/admin/associates/${id}`, {
                onSuccess: () => toast.success("Associate deleted successfully"),
            });
        }
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SiteHeader />
                <Head title="About - Associates" />

                <div className="container mx-auto py-8 px-4 max-w-6xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-foreground">Associates</h1>
                        <p className="text-muted-foreground mt-2">Manage associate logos</p>
                    </div>

                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Associates List</CardTitle>
                                    <CardDescription>Add, edit, or delete associate logos</CardDescription>
                                </div>
                                <Link href="/admin/associates/create">
                                    <Button>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Associate
                                    </Button>
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Logo</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Order</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {associates.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                                No associates found. Create your first one!
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        associates.map((associate) => (
                                            <TableRow key={associate.id}>
                                                <TableCell>
                                                    {associate.logo_image && (
                                                        <img
                                                            src={associate.logo_image}
                                                            alt={associate.name}
                                                            className="h-8 w-auto object-contain"
                                                        />
                                                    )}
                                                </TableCell>
                                                <TableCell className="font-medium">{associate.name}</TableCell>
                                                <TableCell>{associate.order}</TableCell>
                                                <TableCell>
                                                    <Badge variant={associate.is_active ? "default" : "secondary"}>
                                                        {associate.is_active ? "Active" : "Inactive"}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem asChild>
                                                                <Link href={`/admin/associates/${associate.id}/edit`}>
                                                                    <Pencil className="mr-2 h-4 w-4" />
                                                                    Edit
                                                                </Link>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={() => handleDeleteAssociate(associate.id)}
                                                                className="text-destructive"
                                                            >
                                                                <Trash2 className="mr-2 h-4 w-4" />
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
