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

interface BooksPageSetting {
    id: number;
    banner_pattern_image: string | null;
    book_cover_image: string | null;
    banner_title: string | null;
    banner_description: string | null;
    banner_price: string | null;
    banner_button_text: string | null;
}

interface Props {
    settings: BooksPageSetting;
}

export default function BooksPageSettingsBanner({ settings }: Props) {
    const [patternPreview, setPatternPreview] = useState<string | null>(null);
    const [coverPreview, setCoverPreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        banner_pattern_image: null as File | null,
        book_cover_image: null as File | null,
        banner_title: settings?.banner_title || "Chat GPT: Risk or Opportunity?",
        banner_description: settings?.banner_description || "Living an extraordinary life means shaping it on your terms, filled with deep meaning and significant impact. Fueled by the quest for excellence and a strong sense of purpose, Shahriar Khan has motivated millions to dream boldly and strive for greater heights.",
        banner_price: settings?.banner_price || "Price: 240 BDT",
        banner_button_text: settings?.banner_button_text || "Read a Little",
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post("/admin/books-page-settings/update", {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setPatternPreview(null);
                setCoverPreview(null);
                toast.success("Banner settings updated successfully");
            },
        });
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SiteHeader />
                <Head title="Books Page - Banner Settings" />

                <div className="container mx-auto py-8 px-4 max-w-4xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-foreground">Banner Settings</h1>
                        <p className="text-muted-foreground mt-2">Configure the banner section with book details</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Banner Images</CardTitle>
                                <CardDescription>Upload pattern and book cover images</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="banner_pattern_image">Banner Pattern Image</Label>
                                    <Input
                                        id="banner_pattern_image"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setData("banner_pattern_image", file);
                                                const reader = new FileReader();
                                                reader.onloadend = () => setPatternPreview(reader.result as string);
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        className="mt-1"
                                    />
                                    <div className="mt-4 relative w-full h-48 bg-muted rounded-md overflow-hidden">
                                        <img
                                            src={patternPreview || settings?.banner_pattern_image || "/assets/books/pattern_bg.png"}
                                            alt="Pattern Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="book_cover_image">Book Cover Image</Label>
                                    <Input
                                        id="book_cover_image"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setData("book_cover_image", file);
                                                const reader = new FileReader();
                                                reader.onloadend = () => setCoverPreview(reader.result as string);
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        className="mt-1"
                                    />
                                    <div className="mt-4 relative w-full h-48 bg-muted rounded-md overflow-hidden">
                                        <img
                                            src={coverPreview || settings?.book_cover_image || "/assets/books/book_cover.png"}
                                            alt="Cover Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Banner Content</CardTitle>
                                <CardDescription>Set the banner text and button</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="banner_title">Book Title</Label>
                                    <Input
                                        id="banner_title"
                                        value={data.banner_title}
                                        onChange={(e) => setData("banner_title", e.target.value)}
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="banner_description">Book Description</Label>
                                    <Textarea
                                        id="banner_description"
                                        value={data.banner_description}
                                        onChange={(e) => setData("banner_description", e.target.value)}
                                        rows={3}
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="banner_price">Price Text</Label>
                                    <Input
                                        id="banner_price"
                                        value={data.banner_price}
                                        onChange={(e) => setData("banner_price", e.target.value)}
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="banner_button_text">Button Text</Label>
                                    <Input
                                        id="banner_button_text"
                                        value={data.banner_button_text}
                                        onChange={(e) => setData("banner_button_text", e.target.value)}
                                        className="mt-1"
                                    />
                                </div>
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
