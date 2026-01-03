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

interface BlogsPageSetting {
    id: number;
    banner_title: string | null;
    banner_vector_right: string | null;
    banner_vector_left: string | null;
}

interface Props {
    settings: BlogsPageSetting;
}

export default function BlogsPageSettingsBanner({ settings }: Props) {
    const [bannerVectorRightPreview, setBannerVectorRightPreview] = useState<string | null>(null);
    const [bannerVectorLeftPreview, setBannerVectorLeftPreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        banner_title: settings?.banner_title || "Latest Blogs & Insights",
        banner_vector_right: null as File | null,
        banner_vector_left: null as File | null,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post("/admin/blogs-page-settings/update", {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setBannerVectorRightPreview(null);
                setBannerVectorLeftPreview(null);
                toast.success("Banner settings updated successfully");
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
                <Head title="Blogs Page - Banner Settings" />

                <div className="container mx-auto py-8 px-4 max-w-4xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-foreground">
                            Banner Settings
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Configure the banner section content and styling
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Banner Content</CardTitle>
                                <CardDescription>Set the banner title and decorative vectors</CardDescription>
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
        </SidebarProvider>
    );
}
