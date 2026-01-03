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
import { CharacterLimitedTextarea } from "@/components/ui/character-limited-textarea";

// Character limits
const LIMITS = {
    page_title: 200,
    banner_quote: 500,
    banner_subtitle: 200,
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

export default function DonationPageSettings({ settings }: Props) {
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        page_title: settings?.page_title || "Donation",
        banner_quote: settings?.banner_quote || "We are now in the era of the 4th industrial revolution, where everything depends on technology. So we also have to depend on technology",
        banner_subtitle: settings?.banner_subtitle || "My Thoughts",
        banner_default_image: null as File | null,
        donate_section_title: settings?.donate_section_title || "Support Our Cause",
        donate_section_description: settings?.donate_section_description || "Your contribution makes a difference in transforming lives and creating opportunities.",
    });

    // Real-time validation errors based on current data
    const getValidationErrors = () => {
        const errors: Record<string, string> = {};

        if ((data.page_title || "").length > LIMITS.page_title) {
            errors.page_title = `Page title must be ${LIMITS.page_title} characters or less`;
        }
        if ((data.banner_quote || "").length > LIMITS.banner_quote) {
            errors.banner_quote = `Banner quote must be ${LIMITS.banner_quote} characters or less`;
        }
        if ((data.banner_subtitle || "").length > LIMITS.banner_subtitle) {
            errors.banner_subtitle = `Banner subtitle must be ${LIMITS.banner_subtitle} characters or less`;
        }
        if ((data.donate_section_title || "").length > LIMITS.donate_section_title) {
            errors.donate_section_title = `Section title must be ${LIMITS.donate_section_title} characters or less`;
        }
        if ((data.donate_section_description || "").length > LIMITS.donate_section_description) {
            errors.donate_section_description = `Section description must be ${LIMITS.donate_section_description} characters or less`;
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
                setPreviewImage(null);
                toast.success("Donation page settings updated successfully");
            },
            onError: (errors) => {
                console.error('Update errors:', errors);
            }
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData("banner_default_image", file);
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
                <Head title="Donation Page Settings" />

                <div className="container mx-auto py-8 px-4 max-w-4xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-foreground">
                            Donation Page Settings
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Manage the content and styling displayed on the Donation page
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
                                        placeholder="Donation"
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
                                    <Label htmlFor="banner_quote">Banner Quote</Label>
                                    <CharacterLimitedTextarea
                                        id="banner_quote"
                                        value={data.banner_quote}
                                        onChange={(e) => setData("banner_quote", e.target.value)}
                                        maxLength={LIMITS.banner_quote}
                                        placeholder="We are now in the era of the 4th industrial revolution..."
                                        rows={3}
                                        className="mt-1"
                                        error={validationErrors.banner_quote}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="banner_subtitle">Banner Subtitle</Label>
                                    <CharacterLimitedInput
                                        id="banner_subtitle"
                                        value={data.banner_subtitle}
                                        onChange={(e) => setData("banner_subtitle", e.target.value)}
                                        maxLength={LIMITS.banner_subtitle}
                                        placeholder="My Thoughts"
                                        className="mt-1"
                                        error={validationErrors.banner_subtitle}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="banner_default_image">Banner Image</Label>
                                    <Input
                                        id="banner_default_image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="mt-1"
                                    />
                                    {errors.banner_default_image && (
                                        <p className="text-destructive text-sm mt-1">{errors.banner_default_image}</p>
                                    )}
                                    {(previewImage || settings?.banner_default_image) && (
                                        <div className="mt-4 relative w-full h-48 bg-muted rounded-md overflow-hidden">
                                            <img
                                                src={previewImage || settings.banner_default_image || ""}
                                                alt="Banner Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Donate Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Donate Section</CardTitle>
                                <CardDescription>Configure the donation section</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="donate_section_title">Section Title</Label>
                                    <CharacterLimitedInput
                                        id="donate_section_title"
                                        value={data.donate_section_title}
                                        onChange={(e) => setData("donate_section_title", e.target.value)}
                                        maxLength={LIMITS.donate_section_title}
                                        placeholder="Support Our Cause"
                                        className="mt-1"
                                        error={validationErrors.donate_section_title}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="donate_section_description">Section Description</Label>
                                    <CharacterLimitedTextarea
                                        id="donate_section_description"
                                        value={data.donate_section_description}
                                        onChange={(e) => setData("donate_section_description", e.target.value)}
                                        maxLength={LIMITS.donate_section_description}
                                        placeholder="Your contribution makes a difference..."
                                        rows={3}
                                        className="mt-1"
                                        error={validationErrors.donate_section_description}
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