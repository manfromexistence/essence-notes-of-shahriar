/**
 * TEMPLATE FOR CREATING PAGE SETTINGS UI
 * 
 * This template can be used to create admin UI pages for page settings.
 * Follow these steps:
 * 
 * 1. Copy this file to the appropriate location:
 *    resources/js/pages/dashboard/{page-name}-page-settings/index.tsx
 * 
 * 2. Update the interface to match your model's fields
 * 3. Update the useForm initial values
 * 4. Update the form fields in the JSX
 * 5. Update the page title and descriptions
 * 6. Test in browser at /admin/{page-name}-page-settings
 */

import { FormEvent, useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageIcon } from "lucide-react";

// STEP 1: Update this interface to match your model's fields
interface PageSetting {
    id: number;
    page_title: string | null;
    banner_title: string | null;
    banner_subtitle: string | null;
    banner_image: string | null;
    // Add more fields as needed based on your migration
}

interface Props {
    settings: PageSetting;
}

// STEP 2: Update component name and page titles
export default function PageSettings({ settings }: Props) {
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    // STEP 3: Update useForm with all your fields
    const { data, setData, post, processing, errors } = useForm({
        page_title: settings?.page_title || "Page Title",
        banner_title: settings?.banner_title || "",
        banner_subtitle: settings?.banner_subtitle || "",
        banner_image: null as File | null,
        // Add more fields matching your model
    });

    // STEP 4: Update the route in handleSubmit
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post("/admin/your-page-settings/update", { // <-- UPDATE THIS ROUTE
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setPreviewImage(null);
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
                <Head title="Page Settings" /> {/* UPDATE THIS TITLE */}

                <div className="container mx-auto py-8 px-4 max-w-4xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-foreground">
                            Page Settings {/* UPDATE THIS HEADING */}
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Manage the content displayed on the page {/* UPDATE DESCRIPTION */}
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
                                <CardDescription>Configure the banner section</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="banner_title">Banner Title</Label>
                                    <Input
                                        id="banner_title"
                                        value={data.banner_title}
                                        onChange={(e) => setData("banner_title", e.target.value)}
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="banner_subtitle">Banner Subtitle</Label>
                                    <Input
                                        id="banner_subtitle"
                                        value={data.banner_subtitle}
                                        onChange={(e) => setData("banner_subtitle", e.target.value)}
                                        className="mt-1"
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

                        {/* Add more sections as needed following the same pattern */}
                        
                        {/* Example: Color Picker Section */}
                        {/* 
                        <Card>
                            <CardHeader>
                                <CardTitle>Styling</CardTitle>
                                <CardDescription>Configure colors and appearance</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="bg_color">Background Color</Label>
                                    <div className="flex gap-2 mt-1">
                                        <Input
                                            id="bg_color"
                                            type="color"
                                            value={data.bg_color}
                                            onChange={(e) => setData("bg_color", e.target.value)}
                                            className="w-20 h-10"
                                        />
                                        <Input
                                            value={data.bg_color}
                                            onChange={(e) => setData("bg_color", e.target.value)}
                                            placeholder="#000000"
                                            className="flex-1"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        */}

                        {/* Example: Textarea Section */}
                        {/*
                        <Card>
                            <CardHeader>
                                <CardTitle>Content</CardTitle>
                                <CardDescription>Manage page content</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData("description", e.target.value)}
                                        rows={4}
                                        className="mt-1"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                        */}

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

/*
 * FIELD TYPES REFERENCE:
 * 
 * Text Input:
 * <Input
 *   id="field_name"
 *   value={data.field_name}
 *   onChange={(e) => setData("field_name", e.target.value)}
 * />
 * 
 * Textarea:
 * <Textarea
 *   id="field_name"
 *   value={data.field_name}
 *   onChange={(e) => setData("field_name", e.target.value)}
 *   rows={4}
 * />
 * 
 * File Upload (Image):
 * <Input
 *   id="field_name"
 *   type="file"
 *   accept="image/*"
 *   onChange={(e) => {
 *     const file = e.target.files?.[0];
 *     if (file) setData("field_name", file);
 *   }}
 * />
 * 
 * Color Picker:
 * <Input
 *   id="field_name"
 *   type="color"
 *   value={data.field_name}
 *   onChange={(e) => setData("field_name", e.target.value)}
 * />
 */
