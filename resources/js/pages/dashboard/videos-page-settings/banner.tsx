import { FormEvent, useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import { toast } from "sonner";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface VideosPageSetting {
    id: number;
    page_title: string | null;
    banner_title: string | null;
    banner_subtitle: string | null;
    banner_description: string | null;
    banner_image: string | null;
}

interface Props {
    settings: VideosPageSetting;
}

export default function VideosPageSettingsBanner({ settings }: Props) {
    const [bannerImagePreview, setBannerImagePreview] = useState<string | null>(null);

    const { data, setData, post, processing } = useForm({
        page_title: settings?.page_title || "Videos",
        banner_title: settings?.banner_title || "",
        banner_subtitle: settings?.banner_subtitle || "",
        banner_description: settings?.banner_description || "",
        banner_image: null as File | null,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post("/admin/videos-page-settings/update", {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setBannerImagePreview(null);
                toast.success("Banner settings updated successfully");
            },
        });
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SiteHeader />
                <Head title="Videos - Banner Settings" />

                <div className="container mx-auto py-8 px-4 max-w-4xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-foreground">Banner Settings</h1>
                        <p className="text-muted-foreground mt-2">Configure the banner section</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Banner Content</CardTitle>
                                <CardDescription>Set banner title and content</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="page_title">Banner Title</Label>
                                    <Input
                                        id="page_title"
                                        value={data.page_title}
                                        onChange={(e) => setData("page_title", e.target.value)}
                                        placeholder="Videos"
                                        className="mt-1"
                                    />
                                    <p className="text-sm text-muted-foreground mt-1">This is the main heading displayed on the videos page</p>
                                </div>

                                {/* <div>
                                    <Label htmlFor="banner_title">Banner Title</Label>
                                    <Input
                                        id="banner_title"
                                        value={data.banner_title}
                                        onChange={(e) => setData("banner_title", e.target.value)}
                                        placeholder="Featured Videos"
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="banner_subtitle">Banner Subtitle</Label>
                                    <Input
                                        id="banner_subtitle"
                                        value={data.banner_subtitle}
                                        onChange={(e) => setData("banner_subtitle", e.target.value)}
                                        placeholder="Watch my latest content"
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="banner_description">Banner Description</Label>
                                    <Input
                                        id="banner_description"
                                        value={data.banner_description}
                                        onChange={(e) => setData("banner_description", e.target.value)}
                                        placeholder="Explore videos on technology, entrepreneurship, and more"
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="banner_image">Banner Image</Label>
                                    <Input
                                        id="banner_image"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setData("banner_image", file);
                                                const reader = new FileReader();
                                                reader.onloadend = () => setBannerImagePreview(reader.result as string);
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        className="mt-1"
                                    />
                                    {(bannerImagePreview || settings?.banner_image) && (
                                        <div className="mt-4 relative w-full h-48 bg-muted rounded-md overflow-hidden">
                                            <img
                                                src={bannerImagePreview || settings.banner_image || ""}
                                                alt="Banner Preview"
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                    )}
                                </div> */}
                            </CardContent>
                        </Card>

                        <div className="flex justify-end">
                            <Button type="submit" disabled={processing} size="lg">
                                {processing ? "Saving..." : "Save Changes"}
                            </Button>
                        </div>
                    </form>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
