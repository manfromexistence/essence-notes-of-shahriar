import { FormEvent, useState } from "react";
import { Head, Link, useForm, router } from "@inertiajs/react";
import { toast } from "sonner";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Badge } from "@/components/ui/badge";

interface ImpactItem {
    id: number;
    title: string;
    order: number;
    is_active: boolean;
}

interface AboutMePageSetting {
    impact: {
        entrepreneur_title: string;
        entrepreneur_description: string;
        technology_title: string;
        technology_description: string;
        image_1: string;
        image_2: string;
        image_3: string;
        image_4: string;
    };
}

interface Props {
    settings: AboutMePageSetting;
    impactItems: ImpactItem[];
}

export default function AboutSectionsImpact({ settings, impactItems }: Props) {
    const [imagePreviews, setImagePreviews] = useState<{ [key: string]: string | null }>({});

    const { data, setData, post, processing } = useForm({
        entrepreneur_title: settings?.impact?.entrepreneur_title || "",
        entrepreneur_description: settings?.impact?.entrepreneur_description || "",
        technology_title: settings?.impact?.technology_title || "",
        technology_description: settings?.impact?.technology_description || "",
        image_1: null as File | null,
        image_2: null as File | null,
        image_3: null as File | null,
        image_4: null as File | null,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post("/admin/about-me-page-settings/update-impact", {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setImagePreviews({});
                toast.success("Impact settings updated successfully");
            },
        });
    };

    const handleImageChange = (key: string, file: File | undefined) => {
        if (file) {
            setData(key as any, file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreviews(prev => ({ ...prev, [key]: reader.result as string }));
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteItem = (id: number) => {
        if (confirm('Are you sure you want to delete this impact item?')) {
            router.delete(`/admin/impact-items/${id}`, {
                onSuccess: () => toast.success("Impact item deleted successfully"),
            });
        }
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SiteHeader />
                <Head title="About - Impact Section" />

                <div className="container mx-auto py-8 px-4 max-w-6xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-foreground">Impact Section</h1>
                        <p className="text-muted-foreground mt-2">Manage impact section settings and items</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 mb-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Entrepreneur Impact</CardTitle>
                                <CardDescription>Configure the entrepreneur impact section</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="entrepreneur_title">Title</Label>
                                    <Input
                                        id="entrepreneur_title"
                                        value={data.entrepreneur_title}
                                        onChange={(e) => setData("entrepreneur_title", e.target.value)}
                                        placeholder="Entrepreneur Impact"
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="entrepreneur_description">Description</Label>
                                    <Textarea
                                        id="entrepreneur_description"
                                        value={data.entrepreneur_description}
                                        onChange={(e) => setData("entrepreneur_description", e.target.value)}
                                        placeholder="As a visionary entrepreneur..."
                                        rows={4}
                                        className="mt-1"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Technology Impact</CardTitle>
                                <CardDescription>Configure the technology impact section</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="technology_title">Title</Label>
                                    <Input
                                        id="technology_title"
                                        value={data.technology_title}
                                        onChange={(e) => setData("technology_title", e.target.value)}
                                        placeholder="Technology Impact"
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="technology_description">Description</Label>
                                    <Textarea
                                        id="technology_description"
                                        value={data.technology_description}
                                        onChange={(e) => setData("technology_description", e.target.value)}
                                        placeholder="Shahriar Khan has been at the forefront..."
                                        rows={4}
                                        className="mt-1"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Section Images</CardTitle>
                                <CardDescription>Upload images for the impact section gallery</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                    {[1, 2, 3, 4].map((num) => (
                                        <div key={num}>
                                            <Label htmlFor={`image_${num}`}>Image {num}</Label>
                                            <Input
                                                id={`image_${num}`}
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleImageChange(`image_${num}`, e.target.files?.[0])}
                                                className="mt-1"
                                            />
                                            {(imagePreviews[`image_${num}`] || settings?.impact?.[`image_${num}` as keyof typeof settings.impact]) && (
                                                <div className="mt-2">
                                                    <img
                                                        src={imagePreviews[`image_${num}`] || settings.impact[`image_${num}` as keyof typeof settings.impact]}
                                                        alt={`Image ${num}`}
                                                        className="h-24 object-contain rounded"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex justify-end">
                            <Button type="submit" disabled={processing} size="lg">
                                {processing ? "Saving..." : "Save Settings"}
                            </Button>
                        </div>
                    </form>

                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Impact Items</CardTitle>
                                    <CardDescription>Manage technology impact items displayed in the grid</CardDescription>
                                </div>
                                <Link href="/admin/impact-items/create">
                                    <Button>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Impact Item
                                    </Button>
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-12"></TableHead>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Order</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {impactItems.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                                No impact items found. Add your first one!
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        impactItems.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell>
                                                    <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                                                </TableCell>
                                                <TableCell className="font-medium">{item.title}</TableCell>
                                                <TableCell>{item.order}</TableCell>
                                                <TableCell>
                                                    <Badge variant={item.is_active ? "default" : "secondary"}>
                                                        {item.is_active ? "Active" : "Inactive"}
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
                                                                <Link href={`/admin/impact-items/${item.id}/edit`}>
                                                                    <Pencil className="mr-2 h-4 w-4" />
                                                                    Edit
                                                                </Link>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={() => handleDeleteItem(item.id)}
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
