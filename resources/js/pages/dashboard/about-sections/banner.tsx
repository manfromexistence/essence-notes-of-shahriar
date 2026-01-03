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
import { CharacterLimitedInput } from "@/components/ui/character-limited-input";

// Character limits
const LIMITS = {
    label: 200,
    title: 500,
};

interface AboutMePageSetting {
    banner: {
        label: string;
        title: string;
        banner_image: string;
        video_thumbnail: string;
        video_url: string;
    };
}

interface Props {
    settings: AboutMePageSetting;
}

export default function AboutSectionsBanner({ settings }: Props) {
    const [bannerImagePreview, setBannerImagePreview] = useState<string | null>(null);
    const [videoThumbnailPreview, setVideoThumbnailPreview] = useState<string | null>(null);

    const { data, setData, post, processing } = useForm({
        label: settings?.banner?.label || "About Me",
        title: settings?.banner?.title || "",
        banner_image: null as File | null,
        video_thumbnail: null as File | null,
        video_url: settings?.banner?.video_url || "",
    });

    // Real-time validation errors based on current data
    const getValidationErrors = () => {
        const errors: Record<string, string> = {};

        if ((data.label || "").length > LIMITS.label) {
            errors.label = `Label must be ${LIMITS.label} characters or less (currently ${data.label.length})`;
        }
        if ((data.title || "").length > LIMITS.title) {
            errors.title = `Title must be ${LIMITS.title} characters or less (currently ${data.title.length})`;
        }

        return errors;
    };

    const validationErrors = getValidationErrors();
    const hasErrors = Object.keys(validationErrors).length > 0;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (hasErrors) {
            toast.error("Please fix the validation errors before saving");
            return;
        }

        post("/admin/about-me-page-settings/update-banner", {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setBannerImagePreview(null);
                setVideoThumbnailPreview(null);
                toast.success("Banner settings updated successfully");
            },
        });
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SiteHeader />
                <Head title="About - Banner Settings" />

                <div className="container mx-auto py-8 px-4 max-w-4xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-foreground">Banner Section</h1>
                        <p className="text-muted-foreground mt-2">Manage the hero banner with video and title</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Banner Content</CardTitle>
                                <CardDescription>Set banner label, title, and media</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="label">Label</Label>
                                    <CharacterLimitedInput
                                        id="label"
                                        value={data.label}
                                        onChange={(e) => setData("label", e.target.value)}
                                        maxLength={LIMITS.label}
                                        placeholder="About Me"
                                        className="mt-1"
                                        error={validationErrors.label}
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="title">Title</Label>
                                    <CharacterLimitedInput
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData("title", e.target.value)}
                                        maxLength={LIMITS.title}
                                        className="mt-1"
                                        error={validationErrors.title}
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
                                    {(bannerImagePreview || settings?.banner?.banner_image) && (
                                        <div className="mt-4 relative w-full h-48 bg-muted rounded-md overflow-hidden">
                                            <img
                                                src={bannerImagePreview || settings.banner.banner_image}
                                                alt="Banner Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="video_thumbnail">Video Thumbnail</Label>
                                    <Input
                                        id="video_thumbnail"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setData("video_thumbnail", file);
                                                const reader = new FileReader();
                                                reader.onloadend = () => setVideoThumbnailPreview(reader.result as string);
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        className="mt-1"
                                    />
                                    {(videoThumbnailPreview || settings?.banner?.video_thumbnail) && (
                                        <div className="mt-4 relative w-full h-48 bg-muted rounded-md overflow-hidden">
                                            <img
                                                src={videoThumbnailPreview || settings.banner.video_thumbnail}
                                                alt="Video Thumbnail Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="video_url">Video URL</Label>
                                    <Input
                                        id="video_url"
                                        value={data.video_url}
                                        onChange={(e) => setData("video_url", e.target.value)}
                                        placeholder="https://youtube.com/..."
                                        className="mt-1"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex justify-end">
                            <Button type="submit" disabled={processing || hasErrors} size="lg">
                                {processing ? "Saving..." : hasErrors ? "Fix Errors to Save" : "Save Changes"}
                            </Button>
                        </div>
                    </form>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
