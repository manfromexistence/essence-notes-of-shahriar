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
import { MoreHorizontal, Pencil, Trash2, Plus } from "lucide-react";

interface CorporateJourneyItem {
    id: number;
    step_number: number;
    title: string;
    company: string;
    description: string;
    icon_image: string | null;
    order: number;
}

interface AboutMePageSetting {
    corporate_journey: {
        title: string;
        philosophy_title: string;
        philosophy_image: string;
        background_image: string;
        line_image: string;
        logic_theory_title: string;
        logic_theory_content_1: string;
        logic_theory_content_2: string;
        logic_1_title: string;
        logic_1_content: string;
    };
}

interface Props {
    settings: AboutMePageSetting;
    corporateJourneyItems: CorporateJourneyItem[];
}

export default function AboutSectionsCorporate({ settings, corporateJourneyItems }: Props) {
    const [philosophyImagePreview, setPhilosophyImagePreview] = useState<string | null>(null);
    const [backgroundImagePreview, setBackgroundImagePreview] = useState<string | null>(null);
    const [lineImagePreview, setLineImagePreview] = useState<string | null>(null);

    const { data, setData, post, processing } = useForm({
        title: settings?.corporate_journey?.title || "",
        philosophy_title: settings?.corporate_journey?.philosophy_title || "",
        philosophy_image: null as File | null,
        background_image: null as File | null,
        line_image: null as File | null,
        logic_theory_title: settings?.corporate_journey?.logic_theory_title || "",
        logic_theory_content_1: settings?.corporate_journey?.logic_theory_content_1 || "",
        logic_theory_content_2: settings?.corporate_journey?.logic_theory_content_2 || "",
        logic_1_title: settings?.corporate_journey?.logic_1_title || "",
        logic_1_content: settings?.corporate_journey?.logic_1_content || "",
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post("/admin/about-me-page-settings/update-corporate", {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setPhilosophyImagePreview(null);
                setBackgroundImagePreview(null);
                setLineImagePreview(null);
                toast.success("Corporate settings updated successfully");
            },
        });
    };

    const handleDeleteItem = (id: number) => {
        if (confirm('Are you sure you want to delete this corporate journey item?')) {
            router.delete(`/admin/corporate-journey/${id}`, {
                onSuccess: () => toast.success("Corporate journey item deleted successfully"),
            });
        }
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SiteHeader />
                <Head title="About - Corporate Journey" />

                <div className="container mx-auto py-8 px-4 max-w-6xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-foreground">Corporate Journey</h1>
                        <p className="text-muted-foreground mt-2">Manage corporate journey settings and items</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 mb-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Corporate Journey Settings</CardTitle>
                                <CardDescription>Configure section title</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="title">Section Title</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData("title", e.target.value)}
                                        placeholder="Corporate Journey"
                                        className="mt-1"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Philosophy Section</CardTitle>
                                <CardDescription>Configure the philosophy section content</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="philosophy_title">Philosophy Title</Label>
                                    <Input
                                        id="philosophy_title"
                                        value={data.philosophy_title}
                                        onChange={(e) => setData("philosophy_title", e.target.value)}
                                        placeholder="My Philosophy"
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="philosophy_image">Philosophy Image</Label>
                                    <Input
                                        id="philosophy_image"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setData("philosophy_image", file);
                                                const reader = new FileReader();
                                                reader.onloadend = () => setPhilosophyImagePreview(reader.result as string);
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        className="mt-1"
                                    />
                                    {(philosophyImagePreview || settings?.corporate_journey?.philosophy_image) && (
                                        <div className="mt-2">
                                            <img
                                                src={philosophyImagePreview || settings.corporate_journey.philosophy_image}
                                                alt="Philosophy"
                                                className="h-32 object-contain"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="background_image">Background Image</Label>
                                    <Input
                                        id="background_image"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setData("background_image", file);
                                                const reader = new FileReader();
                                                reader.onloadend = () => setBackgroundImagePreview(reader.result as string);
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        className="mt-1"
                                    />
                                    {(backgroundImagePreview || settings?.corporate_journey?.background_image) && (
                                        <div className="mt-2">
                                            <img
                                                src={backgroundImagePreview || settings.corporate_journey.background_image}
                                                alt="Background"
                                                className="h-32 object-contain"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="line_image">Decorative Line Image</Label>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        The decorative line that appears on the philosophy section
                                    </p>
                                    <Input
                                        id="line_image"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setData("line_image", file);
                                                const reader = new FileReader();
                                                reader.onloadend = () => setLineImagePreview(reader.result as string);
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        className="mt-1"
                                    />
                                    {(lineImagePreview || settings?.corporate_journey?.line_image) && (
                                        <div className="mt-2">
                                            <img
                                                src={lineImagePreview || settings.corporate_journey.line_image}
                                                alt="Decorative Line"
                                                className="h-32 object-contain"
                                            />
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Logic Theory Section</CardTitle>
                                <CardDescription>Configure the logic theory content</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="logic_theory_title">Logic Theory Title</Label>
                                    <Input
                                        id="logic_theory_title"
                                        value={data.logic_theory_title}
                                        onChange={(e) => setData("logic_theory_title", e.target.value)}
                                        placeholder="Logic Theory"
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="logic_theory_content_1">Logic Theory Paragraph 1</Label>
                                    <Textarea
                                        id="logic_theory_content_1"
                                        value={data.logic_theory_content_1}
                                        onChange={(e) => setData("logic_theory_content_1", e.target.value)}
                                        placeholder="Innovation drives progress..."
                                        rows={3}
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="logic_theory_content_2">Logic Theory Paragraph 2</Label>
                                    <Textarea
                                        id="logic_theory_content_2"
                                        value={data.logic_theory_content_2}
                                        onChange={(e) => setData("logic_theory_content_2", e.target.value)}
                                        placeholder="Collaboration and continuous learning..."
                                        rows={3}
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="logic_1_title">Logic #1 Title</Label>
                                    <Input
                                        id="logic_1_title"
                                        value={data.logic_1_title}
                                        onChange={(e) => setData("logic_1_title", e.target.value)}
                                        placeholder="Logic #1"
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="logic_1_content">Logic #1 Content</Label>
                                    <Textarea
                                        id="logic_1_content"
                                        value={data.logic_1_content}
                                        onChange={(e) => setData("logic_1_content", e.target.value)}
                                        placeholder="Technology should serve humanity..."
                                        rows={3}
                                        className="mt-1"
                                    />
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
                                    <CardTitle>Corporate Journey Items</CardTitle>
                                    <CardDescription>Manage journey steps</CardDescription>
                                </div>
                                <Link href="/admin/corporate-journey/create">
                                    <Button>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Journey Item
                                    </Button>
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Step#</TableHead>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Company</TableHead>
                                        <TableHead>Order</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {corporateJourneyItems.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                                No journey items found. Create your first one!
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        corporateJourneyItems.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell>{item.step_number}</TableCell>
                                                <TableCell className="font-medium">{item.title}</TableCell>
                                                <TableCell>{item.company}</TableCell>
                                                <TableCell>{item.order}</TableCell>
                                                <TableCell className="text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem asChild>
                                                                <Link href={`/admin/corporate-journey/${item.id}/edit`}>
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
