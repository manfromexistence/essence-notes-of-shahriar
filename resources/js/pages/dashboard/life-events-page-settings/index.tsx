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
    page_title: 200,
    banner_title: 200,
    banner_subtitle: 500,
    timeline_section_title: 200,
    timeline_section_subtitle: 500,
};

interface LifeEventsPageSetting {
    id: number;
    page_title: string | null;
    banner_title: string | null;
    banner_subtitle: string | null;
    banner_image: string | null;
    timeline_section_title: string | null;
    timeline_section_subtitle: string | null;
}

interface Props {
    settings: LifeEventsPageSetting;
}

export default function LifeEventsPageSettings({ settings }: Props) {
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        page_title: settings?.page_title || "Life Events",
        banner_title: settings?.banner_title || "My Life Journey",
        banner_subtitle: settings?.banner_subtitle || "Milestones & Memories",
        banner_image: null as File | null,
        timeline_section_title: settings?.timeline_section_title || "Life Timeline",
        timeline_section_subtitle: settings?.timeline_section_subtitle || "A Journey Through Time",
    });

    // Real-time validation errors based on current data
    const getValidationErrors = () => {
        const errors: Record<string, string> = {};

        if ((data.page_title || "").length > LIMITS.page_title) {
            errors.page_title = `Page title must be ${LIMITS.page_title} characters or less`;
        }
        if ((data.banner_title || "").length > LIMITS.banner_title) {
            errors.banner_title = `Banner title must be ${LIMITS.banner_title} characters or less`;
        }
        if ((data.banner_subtitle || "").length > LIMITS.banner_subtitle) {
            errors.banner_subtitle = `Banner subtitle must be ${LIMITS.banner_subtitle} characters or less`;
        }
        if ((data.timeline_section_title || "").length > LIMITS.timeline_section_title) {
            errors.timeline_section_title = `Section title must be ${LIMITS.timeline_section_title} characters or less`;
        }
        if ((data.timeline_section_subtitle || "").length > LIMITS.timeline_section_subtitle) {
            errors.timeline_section_subtitle = `Section subtitle must be ${LIMITS.timeline_section_subtitle} characters or less`;
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

        post("/admin/life-events-page-settings/update", {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setPreviewImage(null);
                toast.success("Life events page settings updated successfully");
            },
            onError: (errors) => {
                console.error('Update errors:', errors);
            }
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData("banner_image", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SiteHeader />
                <Head title="Life Events Page Settings" />

                <div className="container mx-auto py-8 px-4 max-w-4xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-foreground">
                            Life Events Page Settings
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Manage the content and styling displayed on the Life Events page
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
                                    <CharacterLimitedInput
                                        id="page_title"
                                        value={data.page_title}
                                        onChange={(e) => setData("page_title", e.target.value)}
                                        maxLength={LIMITS.page_title}
                                        placeholder="Life Events"
                                        className="mt-1"
                                        error={validationErrors.page_title}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Banner Settings */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Banner Settings</CardTitle>
                                <CardDescription>Configure the banner section</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="banner_title">Banner Title</Label>
                                    <CharacterLimitedInput
                                        id="banner_title"
                                        value={data.banner_title}
                                        onChange={(e) => setData("banner_title", e.target.value)}
                                        maxLength={LIMITS.banner_title}
                                        placeholder="My Life Journey"
                                        className="mt-1"
                                        error={validationErrors.banner_title}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="banner_subtitle">Banner Subtitle</Label>
                                    <CharacterLimitedInput
                                        id="banner_subtitle"
                                        value={data.banner_subtitle}
                                        onChange={(e) => setData("banner_subtitle", e.target.value)}
                                        maxLength={LIMITS.banner_subtitle}
                                        placeholder="Milestones & Memories"
                                        className="mt-1"
                                        error={validationErrors.banner_subtitle}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="banner_image">Banner Image</Label>
                                    <Input
                                        id="banner_image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="mt-1"
                                    />
                                    {errors.banner_image && (
                                        <p className="text-destructive text-sm mt-1">{errors.banner_image}</p>
                                    )}
                                    {(previewImage || settings?.banner_image) && (
                                        <div className="mt-4 relative w-full h-48 bg-muted rounded-md overflow-hidden">
                                            <img
                                                src={previewImage || settings.banner_image || ""}
                                                alt="Banner Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Timeline Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Timeline Section</CardTitle>
                                <CardDescription>Configure the timeline section</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="timeline_section_title">Section Title</Label>
                                    <CharacterLimitedInput
                                        id="timeline_section_title"
                                        value={data.timeline_section_title}
                                        onChange={(e) => setData("timeline_section_title", e.target.value)}
                                        maxLength={LIMITS.timeline_section_title}
                                        placeholder="Life Timeline"
                                        className="mt-1"
                                        error={validationErrors.timeline_section_title}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="timeline_section_subtitle">Section Subtitle</Label>
                                    <CharacterLimitedInput
                                        id="timeline_section_subtitle"
                                        value={data.timeline_section_subtitle}
                                        onChange={(e) => setData("timeline_section_subtitle", e.target.value)}
                                        maxLength={LIMITS.timeline_section_subtitle}
                                        placeholder="A Journey Through Time"
                                        className="mt-1"
                                        error={validationErrors.timeline_section_subtitle}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex justify-end gap-4">
                            <Button
                                type="submit"
                                disabled={processing || hasErrors}
                                size="lg"
                            >
                                {processing ? "Saving..." : hasErrors ? "Fix Errors to Save" : "Save Changes"}
                            </Button>
                        </div>
                    </form>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
