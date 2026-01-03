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
import { Badge } from "@/components/ui/badge";

interface TravelCountry {
    id: number;
    name: string;
    flag_image: string | null;
    flag_url: string | null;
    order: number;
    is_active: boolean;
}

interface AboutMePageSetting {
    travel: {
        title: string;
        description: string;
        map_image: string;
    };
}

interface Props {
    settings: AboutMePageSetting;
    travelCountries: TravelCountry[];
}

export default function AboutSectionsTravel({ settings, travelCountries }: Props) {
    const [mapImagePreview, setMapImagePreview] = useState<string | null>(null);

    const { data, setData, post, processing } = useForm({
        title: settings?.travel?.title || "",
        description: settings?.travel?.description || "",
        map_image: null as File | null,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post("/admin/about-me-page-settings/update-travel", {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setMapImagePreview(null);
                toast.success("Travel settings updated successfully");
            },
        });
    };

    const handleDeleteCountry = (id: number) => {
        if (confirm('Are you sure you want to delete this country?')) {
            router.delete(`/admin/travel-countries/${id}`, {
                onSuccess: () => toast.success("Country deleted successfully"),
            });
        }
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SiteHeader />
                <Head title="About - Travel Section" />

                <div className="container mx-auto py-8 px-4 max-w-6xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-foreground">Travel Section</h1>
                        <p className="text-muted-foreground mt-2">Manage travel section settings and countries</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 mb-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Travel Section Settings</CardTitle>
                                <CardDescription>Configure the travel section title, description, and map</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="title">Section Title</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData("title", e.target.value)}
                                        placeholder="Travel countries for business purposes"
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData("description", e.target.value)}
                                        placeholder="As a global entrepreneur and technology leader..."
                                        rows={4}
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="map_image">Map Image</Label>
                                    <Input
                                        id="map_image"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setData("map_image", file);
                                                const reader = new FileReader();
                                                reader.onloadend = () => setMapImagePreview(reader.result as string);
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        className="mt-1"
                                    />
                                    {(mapImagePreview || settings?.travel?.map_image) && (
                                        <div className="mt-2">
                                            <img
                                                src={mapImagePreview || settings.travel.map_image}
                                                alt="Map"
                                                className="h-32 object-contain"
                                            />
                                        </div>
                                    )}
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
                                    <CardTitle>Travel Countries</CardTitle>
                                    <CardDescription>Manage countries displayed on the travel section</CardDescription>
                                </div>
                                <Link href="/admin/travel-countries/create">
                                    <Button>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Country
                                    </Button>
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Flag</TableHead>
                                        <TableHead>Country Name</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {travelCountries.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                                                No countries found. Add your first one!
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        travelCountries.map((country) => (
                                            <TableRow key={country.id}>
                                                <TableCell>
                                                    {(country.flag_url || country.flag_image) && (
                                                        <img
                                                            src={country.flag_url || country.flag_image || undefined}
                                                            alt={country.name}
                                                            className="h-8 w-12 object-contain"
                                                        />
                                                    )}
                                                </TableCell>
                                                <TableCell className="font-medium">{country.name}</TableCell>
                                                <TableCell>
                                                    <Badge variant={country.is_active ? "default" : "secondary"}>
                                                        {country.is_active ? "Active" : "Inactive"}
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
                                                                <Link href={`/admin/travel-countries/${country.id}/edit`}>
                                                                    <Pencil className="mr-2 h-4 w-4" />
                                                                    Edit
                                                                </Link>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={() => handleDeleteCountry(country.id)}
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
