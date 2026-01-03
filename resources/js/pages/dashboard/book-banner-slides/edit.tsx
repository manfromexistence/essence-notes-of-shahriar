import { Head, useForm, Link } from "@inertiajs/react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft } from "lucide-react";
import { FormEventHandler, useState } from "react";
import { toast } from "sonner";

interface BookBannerSlide {
    id: number;
    title: string;
    description: string | null;
    book_image: string | null;
    price_text: string | null;
    button_text: string | null;
    order: number;
    is_active: boolean;
}

interface Props {
    slide: BookBannerSlide;
}

export default function EditBookBannerSlide({ slide }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        title: slide.title || "",
        description: slide.description || "",
        book_image: null as File | null,
        price_text: slide.price_text || "",
        button_text: slide.button_text || "",
        is_active: slide.is_active,
        _method: "PUT",
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData("book_image", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/admin/book-banner-slides/${slide.id}`, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Carousel slide updated successfully!");
            },
            onError: () => {
                toast.error("Failed to update carousel slide. Please check the form.");
            },
        });
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SiteHeader />
                <Head title="Edit Banner Carousel Slide" />

                <div className="container mx-auto py-8 px-4 max-w-4xl">
                    <div className="mb-8">
                        <Link href="/admin/book-banner-slides">
                            <Button variant="ghost" size="sm" className="mb-4">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Carousel Slides
                            </Button>
                        </Link>
                        <h1 className="text-3xl font-bold text-foreground">
                            Edit Carousel Slide
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Update the details for this carousel slide
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Slide Information</CardTitle>
                                <CardDescription>Update the details for your carousel slide</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Title */}
                                <div>
                                    <Label htmlFor="title">Slide Title *</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData("title", e.target.value)}
                                        placeholder="e.g., Chat GPT: Risk or Opportunity?"
                                        className="mt-1"
                                        required
                                    />
                                    {errors.title && (
                                        <p className="text-destructive text-sm mt-1">{errors.title}</p>
                                    )}
                                </div>

                                {/* Description */}
                                <div>
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData("description", e.target.value)}
                                        placeholder="Enter a detailed description of the book or slide content..."
                                        rows={4}
                                        className="mt-1"
                                    />
                                    {errors.description && (
                                        <p className="text-destructive text-sm mt-1">{errors.description}</p>
                                    )}
                                </div>

                                {/* Book Image */}
                                <div>
                                    <Label htmlFor="book_image">Book Cover Image</Label>
                                    <Input
                                        id="book_image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="mt-1"
                                    />
                                    {errors.book_image && (
                                        <p className="text-destructive text-sm mt-1">{errors.book_image}</p>
                                    )}
                                    {/* Show existing image or new preview */}
                                    {(imagePreview || slide.book_image) && (
                                        <div className="mt-4">
                                            <p className="text-sm text-muted-foreground mb-2">
                                                {imagePreview ? "New Image Preview:" : "Current Image:"}
                                            </p>
                                            <div className="relative w-48 h-64 bg-muted rounded-md overflow-hidden">
                                                <img
                                                    src={imagePreview || slide.book_image || ""}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Price Text */}
                                <div>
                                    <Label htmlFor="price_text">Price Text</Label>
                                    <Input
                                        id="price_text"
                                        value={data.price_text}
                                        onChange={(e) => setData("price_text", e.target.value)}
                                        placeholder="e.g., Price: 240 BDT"
                                        className="mt-1"
                                    />
                                    {errors.price_text && (
                                        <p className="text-destructive text-sm mt-1">{errors.price_text}</p>
                                    )}
                                </div>

                                {/* Button Text */}
                                <div>
                                    <Label htmlFor="button_text">Button Text</Label>
                                    <Input
                                        id="button_text"
                                        value={data.button_text}
                                        onChange={(e) => setData("button_text", e.target.value)}
                                        placeholder="e.g., Read Now"
                                        className="mt-1"
                                    />
                                    {errors.button_text && (
                                        <p className="text-destructive text-sm mt-1">{errors.button_text}</p>
                                    )}
                                </div>

                                {/* Active Status */}
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="is_active"
                                        checked={data.is_active}
                                        onCheckedChange={(checked) => setData("is_active", checked)}
                                    />
                                    <Label htmlFor="is_active" className="cursor-pointer">
                                        Active (slide will be visible on the frontend)
                                    </Label>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex justify-end gap-4 mt-6">
                            <Link href="/admin/book-banner-slides">
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </Link>
                            <Button type="submit" disabled={processing}>
                                {processing ? "Updating..." : "Update Carousel Slide"}
                            </Button>
                        </div>
                    </form>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
