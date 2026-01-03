import { FormEvent, useState } from "react";
import { Head, Link, useForm, router } from "@inertiajs/react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { MoreHorizontal, Pencil, Trash2, Plus, GripVertical } from "lucide-react";
import { toast } from "sonner";

interface AboutSection {
    id: number;
    section_type: string;
    title: string;
    content: string;
    image: string | null;
    order: number;
    is_active: boolean;
}

interface Props {
    storySections: AboutSection[];
}

export default function AboutSectionsStory({ storySections }: Props) {
    const handleDeleteSection = (id: number) => {
        if (confirm('Are you sure you want to delete this section?')) {
            router.delete(`/admin/about-sections/${id}`, {
                onSuccess: () => toast.success("Section deleted successfully"),
            });
        }
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SiteHeader />
                <Head title="About - Story Sections" />

                <div className="container mx-auto py-8 px-4 max-w-6xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-foreground">Story Sections</h1>
                        <p className="text-muted-foreground mt-2">Manage story sections (typically 3 sections: The Start, The Secret, The Purpose)</p>
                    </div>

                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Story Sections List</CardTitle>
                                    <CardDescription>Edit or reorder story sections. Each section appears in order on the About Me page.</CardDescription>
                                </div>
                                <Link href="/admin/about-sections/create?type=story">
                                    <Button>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Story Section
                                    </Button>
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-12"></TableHead>
                                        <TableHead>Image</TableHead>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Content Preview</TableHead>
                                        <TableHead>Order</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {storySections.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                                No story sections found. Create your first one!
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        storySections.map((section) => (
                                            <TableRow key={section.id}>
                                                <TableCell>
                                                    <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                                                </TableCell>
                                                <TableCell>
                                                    {section.image && (
                                                        <img 
                                                            src={section.image} 
                                                            alt={section.title}
                                                            className="h-12 w-16 object-cover rounded"
                                                        />
                                                    )}
                                                </TableCell>
                                                <TableCell className="font-medium">{section.title}</TableCell>
                                                <TableCell className="max-w-xs truncate text-muted-foreground">
                                                    {section.content?.substring(0, 80)}...
                                                </TableCell>
                                                <TableCell>{section.order}</TableCell>
                                                <TableCell>
                                                    <Badge variant={section.is_active ? "default" : "secondary"}>
                                                        {section.is_active ? "Active" : "Inactive"}
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
                                                                <Link href={`/admin/about-sections/${section.id}/edit`}>
                                                                    <Pencil className="mr-2 h-4 w-4" />
                                                                    Edit
                                                                </Link>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={() => handleDeleteSection(section.id)}
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
