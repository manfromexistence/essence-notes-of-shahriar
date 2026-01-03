import { FormEvent, useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { toast } from "sonner";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft } from "lucide-react";

export default function CreateTravelCountry() {
    const [flagPreview, setFlagPreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        name: "",
        flag_image: null as File | null,
        is_active: true,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post("/admin/travel-countries", {
            forceFormData: true,
            onSuccess: () => toast.success("Country added successfully"),
        });
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SiteHeader />
                <Head title="Add Travel Country" />

                <div className="container mx-auto py-8 px-4 max-w-2xl">
                    <div className="mb-8">
                        <Link
                            href="/admin/about-sections/travel"
                            className="flex items-center text-muted-foreground hover:text-foreground mb-4"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Travel Section
                        </Link>
                        <h1 className="text-3xl font-bold text-foreground">Add Travel Country</h1>
                        <p className="text-muted-foreground mt-2">Add a new country to the travel section</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Country Details</CardTitle>
                                <CardDescription>Enter the country information</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Country Name *</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData("name", e.target.value)}
                                        placeholder="e.g., Turkey"
                                        className="mt-1"
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-destructive mt-1">{errors.name}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="flag_image">Flag Image</Label>
                                    <Input
                                        id="flag_image"
                                        type="file"
                                        accept="image/*,.svg"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setData("flag_image", file);
                                                const reader = new FileReader();
                                                reader.onloadend = () => setFlagPreview(reader.result as string);
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        className="mt-1"
                                    />
                                    {flagPreview && (
                                        <div className="mt-2">
                                            <img
                                                src={flagPreview}
                                                alt="Flag preview"
                                                className="h-12 object-contain"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="is_active"
                                        checked={data.is_active}
                                        onCheckedChange={(checked) => setData("is_active", checked)}
                                    />
                                    <Label htmlFor="is_active">Active</Label>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex justify-end gap-4">
                            <Link href="/admin/about-sections/travel">
                                <Button type="button" variant="outline">Cancel</Button>
                            </Link>
                            <Button type="submit" disabled={processing}>
                                {processing ? "Saving..." : "Add Country"}
                            </Button>
                        </div>
                    </form>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
