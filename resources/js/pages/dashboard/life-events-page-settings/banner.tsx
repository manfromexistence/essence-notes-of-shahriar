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
    banner_title: 200,
    banner_subtitle: 500,
};

interface LifeEventsPageSetting {
    id: number;
    banner_title: string | null;
    banner_subtitle: string | null;
    banner_image: string | null;
}

interface Props {
    settings: LifeEventsPageSetting;
}

export default function LifeEventsPageSettingsBanner({ settings }: Props) {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        banner_title: settings?.banner_title || "My Life Journey",
        banner_subtitle: settings?.banner_subtitle || "Milestones & Memories",
        banner_image: null as File | null,
    });

    // Real-time validation errors based on current data
    const getValidationErrors = () => {
        const errors: Record<string, string> = {};

        if ((data.banner_title || "").length > LIMITS.banner_title) {
            errors.banner_title = `Title must be ${LIMITS.banner_title} characters or less (currently ${data.banner_title.length})`;
        }
        if ((data.banner_subtitle || "").length > LIMITS.banner_subtitle) {
            errors.banner_subtitle = `Subtitle must be ${LIMITS.banner_subtitle} characters or less (currently ${data.banner_subtitle.length})`;
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
                setImagePreview(null);
                toast.success("Banner settings updated successfully");
            },
        });
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SiteHeader />
                <Head title="Life Events - Banner Settings" />

                <div className="container mx-auto py-8 px-4 max-w-4xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-foreground">Banner Settings</h1>
                        <p className="text-muted-foreground mt-2">Configure the banner section</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Banner Content</CardTitle>
                                <CardDescription>Set the banner title, subtitle, and image</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="banner_title">Banner Title</Label>
                                    <CharacterLimitedInput
                                        id="banner_title"
                                        value={data.banner_title}
                                        onChange={(e) => setData("banner_title", e.target.value)}
                                        maxLength={LIMITS.banner_title}
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
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setData("banner_image", file);
                                                const reader = new FileReader();
                                                reader.onloadend = () => setImagePreview(reader.result as string);
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        className="mt-1"
                                    />
                                    {(imagePreview || settings?.banner_image) && (
                                        <div className="mt-4 relative w-full h-48 bg-muted rounded-md overflow-hidden">
                                            <img
                                                src={imagePreview || settings.banner_image || ""}
                                                alt="Banner Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
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
