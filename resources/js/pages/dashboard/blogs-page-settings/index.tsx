import { FormEvent, useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Toaster } from "@/components/ui/sonner";
import { useFlashMessages } from "@/hooks/use-flash-messages";

interface BlogsPageSetting {
    id: number;
    page_title: string | null;
    banner_title: string | null;
    banner_vector_right: string | null;
    banner_vector_left: string | null;
    all_blogs_section_title: string | null;
    featured_blogs_title: string | null;
}

interface Props {
    settings: BlogsPageSetting;
}

export default function BlogsPageSettings({ settings }: Props) {
    const [bannerVectorRightPreview, setBannerVectorRightPreview] = useState<string | null>(null);
    const [bannerVectorLeftPreview, setBannerVectorLeftPreview] = useState<string | null>(null);
    useFlashMessages();

    const { data, setData, post, processing, errors } = useForm({
        page_title: settings?.page_title || "Blogs",
        banner_title: settings?.banner_title || "Latest Blogs & Insights",
        banner_vector_right: null as File | null,
        banner_vector_left: null as File | null,
        all_blogs_section_title: settings?.all_blogs_section_title || "All Blogs",
        featured_blogs_title: settings?.featured_blogs_title || "Featured Blogs",
    });


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post("/admin/blogs-page-settings/update", {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setBannerVectorRightPreview(null);
                setBannerVectorLeftPreview(null);
            },
            onError: (errors) => {
                console.error('Update errors:', errors);
            }
        });
    };

    const handleVectorRightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData("banner_vector_right", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setBannerVectorRightPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleVectorLeftChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData("banner_vector_left", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setBannerVectorLeftPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SiteHeader />
                <Head title="Blogs Page Settings" />

                <div className="container mx-auto py-8 px-4 max-w-4xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-foreground">
                            Blogs Page Settings
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Manage the content and styling displayed on the Blogs page
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* General Settings */}
                        <Card>
                            <CardHeader>
                                <CardTitle>General Settings</CardTitle>
                                <CardDescription>Basic page configuration</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="page_title">Page Title</Label>
                                    <Input
                                        id="page_title"
                                        value={data.page_title}
                                        onChange={(e) => setData("page_title", e.target.value)}
                                        placeholder="Blogs"
                                        className="mt-1"
                                    />
                                    {errors.page_title && (
                                        <p className="text-destructive text-sm mt-1">{errors.page_title}</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Banner Settings */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Banner Settings</CardTitle>
                                <CardDescription>Configure the banner section content and styling</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="banner_title">Banner Title</Label>
                                    <Input
                                        id="banner_title"
                                        value={data.banner_title}
                                        onChange={(e) => setData("banner_title", e.target.value)}
                                        placeholder="Latest Blogs & Insights"
                                        className="mt-1"
                                    />
                                    {errors.banner_title && (
                                        <p className="text-destructive text-sm mt-1">{errors.banner_title}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="banner_vector_right">Banner Vector Right</Label>
                                    <Input
                                        id="banner_vector_right"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleVectorRightChange}
                                        className="mt-1"
                                    />
                                    {errors.banner_vector_right && (
                                        <p className="text-destructive text-sm mt-1">{errors.banner_vector_right}</p>
                                    )}
                                    {(bannerVectorRightPreview || settings?.banner_vector_right) && (
                                        <div className="mt-4 relative w-full h-32 bg-muted rounded-md overflow-hidden border">
                                            <img
                                                src={bannerVectorRightPreview || settings.banner_vector_right || ""}
                                                alt="Banner Vector Right Preview"
                                                className="w-full h-full object-contain p-2"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="banner_vector_left">Banner Vector Left</Label>
                                    <Input
                                        id="banner_vector_left"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleVectorLeftChange}
                                        className="mt-1"
                                    />
                                    {errors.banner_vector_left && (
                                        <p className="text-destructive text-sm mt-1">{errors.banner_vector_left}</p>
                                    )}
                                    {(bannerVectorLeftPreview || settings?.banner_vector_left) && (
                                        <div className="mt-4 relative w-full h-32 bg-muted rounded-md overflow-hidden border">
                                            <img
                                                src={bannerVectorLeftPreview || settings.banner_vector_left || ""}
                                                alt="Banner Vector Left Preview"
                                                className="w-full h-full object-contain p-2"
                                            />
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Sections Settings */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Sections Settings</CardTitle>
                                <CardDescription>Configure section titles and content</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="featured_blogs_title">Featured Blogs Section Title</Label>
                                    <Input
                                        id="featured_blogs_title"
                                        value={data.featured_blogs_title}
                                        onChange={(e) => setData("featured_blogs_title", e.target.value)}
                                        placeholder="Featured Blogs"
                                        className="mt-1"
                                    />
                                    {errors.featured_blogs_title && (
                                        <p className="text-destructive text-sm mt-1">{errors.featured_blogs_title}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="all_blogs_section_title">All Blogs Section Title</Label>
                                    <Input
                                        id="all_blogs_section_title"
                                        value={data.all_blogs_section_title}
                                        onChange={(e) => setData("all_blogs_section_title", e.target.value)}
                                        placeholder="All Blogs"
                                        className="mt-1"
                                    />
                                    {errors.all_blogs_section_title && (
                                        <p className="text-destructive text-sm mt-1">{errors.all_blogs_section_title}</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex justify-end gap-4">
                            <Button
                                type="submit"
                                disabled={processing}
                                size="lg"
                            >
                                {processing ? "Saving..." : "Save Changes"}
                            </Button>
                        </div>
                    </form>
                </div>
            </SidebarInset>
            <Toaster />
        </SidebarProvider>
    );
}