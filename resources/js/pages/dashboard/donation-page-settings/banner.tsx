import { FormEvent, useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import { toast } from "sonner";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CharacterLimitedInput } from "@/components/ui/character-limited-input";
import { CharacterLimitedTextarea } from "@/components/ui/character-limited-textarea";

// Character limits
const LIMITS = {
    page_title: 200,
    banner_subtitle: 200,
    banner_quote: 500,
    donate_section_title: 200,
    donate_section_description: 1000,
};

interface DonationPageSetting {
    id: number;
    page_title: string | null;
    banner_quote: string | null;
    banner_subtitle: string | null;
    banner_default_image: string | null;
    donate_section_title: string | null;
    donate_section_description: string | null;
}

interface Props {
    settings: DonationPageSetting;
}

export default function DonationPageSettingsBanner({ settings }: Props) {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        page_title: settings?.page_title || "Every Contribution Counts",
        banner_quote: settings?.banner_quote || "Help us make a positive impact in the world.",
        banner_subtitle: settings?.banner_subtitle || "Make a Difference",
        banner_default_image: null as File | null,
        donate_section_title: settings?.donate_section_title || "Active Campaigns",
        donate_section_description: settings?.donate_section_description || "Choose a cause that matters to you and make a difference today",
    });

    // Real-time validation errors based on current data
    const getValidationErrors = () => {
        const errors: Record<string, string> = {};

        if ((data.page_title || "").length > LIMITS.page_title) {
            errors.page_title = `Title must be ${LIMITS.page_title} characters or less (currently ${data.page_title.length})`;
        }
        if ((data.banner_subtitle || "").length > LIMITS.banner_subtitle) {
            errors.banner_subtitle = `Subtitle must be ${LIMITS.banner_subtitle} characters or less (currently ${data.banner_subtitle.length})`;
        }
        if ((data.banner_quote || "").length > LIMITS.banner_quote) {
            errors.banner_quote = `Quote must be ${LIMITS.banner_quote} characters or less (currently ${data.banner_quote.length})`;
        }
        if ((data.donate_section_title || "").length > LIMITS.donate_section_title) {
            errors.donate_section_title = `Section title must be ${LIMITS.donate_section_title} characters or less (currently ${data.donate_section_title.length})`;
        }
        if ((data.donate_section_description || "").length > LIMITS.donate_section_description) {
            errors.donate_section_description = `Description must be ${LIMITS.donate_section_description} characters or less (currently ${data.donate_section_description.length})`;
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

        post("/admin/donation-page-settings/update", {
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
                <Head title="Donation Page - Banner Settings" />

                <div className="container mx-auto py-8 px-4 max-w-4xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-foreground">Banner Settings</h1>
                        <p className="text-muted-foreground mt-2">Configure the banner and donation sections</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Banner Content</CardTitle>
                                <CardDescription>Set the banner title, quote and image</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="page_title">Page Title (Main Heading)</Label>
                                    <CharacterLimitedInput
                                        id="page_title"
                                        value={data.page_title}
                                        onChange={(e) => setData("page_title", e.target.value)}
                                        maxLength={LIMITS.page_title}
                                        placeholder="Every Contribution Counts"
                                        className="mt-1"
                                        error={validationErrors.page_title}
                                    />
                                    <p className="text-sm text-muted-foreground mt-1">This appears as the bold main text in the banner</p>
                                </div>

                                <div>
                                    <Label htmlFor="banner_subtitle">Banner Subtitle (Small Text Above Title)</Label>
                                    <CharacterLimitedInput
                                        id="banner_subtitle"
                                        value={data.banner_subtitle}
                                        onChange={(e) => setData("banner_subtitle", e.target.value)}
                                        maxLength={LIMITS.banner_subtitle}
                                        placeholder="Make a Difference"
                                        className="mt-1"
                                        error={validationErrors.banner_subtitle}
                                    />
                                    <p className="text-sm text-muted-foreground mt-1">This appears as the small text with the line decoration</p>
                                </div>

                                <div>
                                    <Label htmlFor="banner_quote">Banner Quote (Description)</Label>
                                    <CharacterLimitedTextarea
                                        id="banner_quote"
                                        value={data.banner_quote}
                                        onChange={(e) => setData("banner_quote", e.target.value)}
                                        maxLength={LIMITS.banner_quote}
                                        placeholder="Help us make a positive impact in the world."
                                        rows={3}
                                        className="mt-1"
                                        error={validationErrors.banner_quote}
                                    />
                                    <p className="text-sm text-muted-foreground mt-1">This appears below the main title as lighter text</p>
                                </div>

                                <div>
                                    <Label htmlFor="banner_default_image">Banner Image (Right Side)</Label>
                                    <Input
                                        id="banner_default_image"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setData("banner_default_image", file);
                                                const reader = new FileReader();
                                                reader.onloadend = () => setImagePreview(reader.result as string);
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        className="mt-1"
                                    />
                                    <p className="text-sm text-muted-foreground mt-1">This image appears on the right side of the banner on large screens</p>
                                    {(imagePreview || settings?.banner_default_image) && (
                                        <div className="mt-4 relative w-full h-48 bg-muted rounded-md overflow-hidden">
                                            <img
                                                src={imagePreview || settings.banner_default_image || ""}
                                                alt="Banner Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Donate Section</CardTitle>
                                <CardDescription>Configure the donation campaigns listing section</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="donate_section_title">Section Title</Label>
                                    <CharacterLimitedInput
                                        id="donate_section_title"
                                        value={data.donate_section_title}
                                        onChange={(e) => setData("donate_section_title", e.target.value)}
                                        maxLength={LIMITS.donate_section_title}
                                        placeholder="Active Campaigns"
                                        className="mt-1"
                                        error={validationErrors.donate_section_title}
                                    />
                                    <p className="text-sm text-muted-foreground mt-1">Title shown above the donation cards</p>
                                </div>

                                <div>
                                    <Label htmlFor="donate_section_description">Section Description</Label>
                                    <CharacterLimitedTextarea
                                        id="donate_section_description"
                                        value={data.donate_section_description}
                                        onChange={(e) => setData("donate_section_description", e.target.value)}
                                        maxLength={LIMITS.donate_section_description}
                                        placeholder="Choose a cause that matters to you and make a difference today"
                                        rows={3}
                                        className="mt-1"
                                        error={validationErrors.donate_section_description}
                                    />
                                    <p className="text-sm text-muted-foreground mt-1">Description shown below the section title</p>
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
