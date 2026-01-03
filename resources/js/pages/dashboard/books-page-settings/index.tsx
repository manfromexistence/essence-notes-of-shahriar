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
    page_title: string | null;
    banner_pattern_image: string | null;
    book_cover_image: string | null;
    banner_book_image: string | null;
    banner_rotating_button_image: string | null;
    banner_title: string | null;
    banner_description: string | null;
    banner_price: string | null;
    banner_button_text: string | null;
    highlights_section_title: string | null;
    highlights_bg_color: string | null;
    highlight_book_1_image: string | null;
    highlight_book_1_title: string | null;
    highlight_book_1_text: string | null;
    highlight_book_2_image: string | null;
    highlight_book_2_title: string | null;
    highlight_book_2_text: string | null;
    summary_section_title: string | null;
    summary_description: string | null;
    summary_fallback_text: string | null;
    review_section_title: string | null;
    review_default_text: string | null;
    review_default_author_name: string | null;
    review_default_author_title: string | null;
    review_default_author_company: string | null;
    review_avatar_image: string | null;
    review_quotation_icon: string | null;
    review_bg_color: string | null;
    recommended_books_title: string | null;
    recommended_books_subtitle: string | null;
    recommended_books_description: string | null;
}

interface Props {
    settings: BooksPageSetting;
}

export default function BooksPageSettings({ settings }: Props) {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [bookCoverPreview, setBookCoverPreview] = useState<string | null>(null);
    const [bannerBookPreview, setBannerBookPreview] = useState<string | null>(null);
    const [rotatingButtonPreview, setRotatingButtonPreview] = useState<string | null>(null);
    const [reviewAvatarPreview, setReviewAvatarPreview] = useState<string | null>(null);
    const [quotationIconPreview, setQuotationIconPreview] = useState<string | null>(null);
    const [highlightBook1Preview, setHighlightBook1Preview] = useState<string | null>(null);
    const [highlightBook2Preview, setHighlightBook2Preview] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        page_title: settings?.page_title || "Books",
        banner_pattern_image: null as File | null,
        book_cover_image: null as File | null,
        banner_book_image: null as File | null,
        banner_rotating_button_image: null as File | null,
        banner_title: settings?.banner_title || "Chat GPT: Risk or Opportunity?",
        banner_description: settings?.banner_description || "Living an extraordinary life means shaping it on your terms, filled with deep meaning and significant impact. Fueled by the quest for excellence and a strong sense of purpose, Shahriar Khan has motivated millions to dream boldly and strive for greater heights.",
        banner_price: settings?.banner_price || "Price: 240 BDT",
        banner_button_text: settings?.banner_button_text || "Read a Little",
        highlights_section_title: settings?.highlights_section_title || "Book Highlights",
        highlights_bg_color: settings?.highlights_bg_color || "#1E293B",
        highlight_book_1_image: null as File | null,
        highlight_book_1_title: settings?.highlight_book_1_title || "Best-Selling Technology Book Award",
        highlight_book_1_text: settings?.highlight_book_1_text || "\"Chat GPT: Risk or Opportunity?\" has been recognized as a pioneering work in exploring the implications of AI technology for businesses and society in Bangladesh.",
        highlight_book_2_image: null as File | null,
        highlight_book_2_title: settings?.highlight_book_2_title || "Innovation in Business Literature Award",
        highlight_book_2_text: settings?.highlight_book_2_text || "Honored for breaking new ground in business literature by addressing contemporary challenges of AI adoption and digital transformation in emerging markets.",
        summary_section_title: settings?.summary_section_title || "Book Summary",
        summary_description: settings?.summary_description || "Living an extraordinary life means shaping it on your terms, filled with deep meaning and significant impact.",
        summary_fallback_text: settings?.summary_fallback_text || "Recognized for excellence in delivering top-tier event planning services across the country, setting industry standards in creativity, organization, and client satisfaction.",
        review_section_title: settings?.review_section_title || "Review",
        review_default_text: settings?.review_default_text || "The Nightingale has easily found its way to one of my favorite books to recommend.",
        review_default_author_name: settings?.review_default_author_name || "Shah Alam Chowdhury",
        review_default_author_title: settings?.review_default_author_title || "Managing Director",
        review_default_author_company: settings?.review_default_author_company || "AB Company",
        review_avatar_image: null as File | null,
        review_quotation_icon: null as File | null,
        review_bg_color: settings?.review_bg_color || "#2E5AFF",
        recommended_books_title: settings?.recommended_books_title || "Recommended Books",
        recommended_books_subtitle: settings?.recommended_books_subtitle || "Must Read Collection",
        recommended_books_description: settings?.recommended_books_description || "Through real-world examples and strategic frameworks, Shahriar Khan offers a balanced perspective on leveraging AI opportunities while managing associated risks.",
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post("/admin/books-page-settings/update", {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setPreviewImage(null);
                setBookCoverPreview(null);
                setBannerBookPreview(null);
                setRotatingButtonPreview(null);
                setReviewAvatarPreview(null);
                setQuotationIconPreview(null);
                setHighlightBook1Preview(null);
                setHighlightBook2Preview(null);
                toast.success("Books page settings updated successfully");
            },
            onError: (errors) => {
                console.error('Update errors:', errors);
            }
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData("banner_pattern_image", file);
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
                <Head title="Books Page Settings" />

                <div className="container mx-auto py-8 px-4 max-w-4xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-foreground">
                            Books Page Settings
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Manage the content and styling displayed on the Books page
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
                                        placeholder="Books"
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
                                    <Label htmlFor="banner_pattern_image">Banner Pattern Image</Label>
                                    <Input
                                        id="banner_pattern_image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="mt-1"
                                    />
                                    {errors.banner_pattern_image && (
                                        <p className="text-destructive text-sm mt-1">{errors.banner_pattern_image}</p>
                                    )}
                                    {(previewImage || settings?.banner_pattern_image) && (
                                        <div className="mt-4 relative w-full h-48 bg-muted rounded-md overflow-hidden">
                                            <img
                                                src={previewImage || settings.banner_pattern_image || ""}
                                                alt="Banner Pattern Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
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
                                                reader.onloadend = () => {
                                                    setBookCoverPreview(reader.result as string);
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        className="mt-1"
                                    />
                                    {errors.book_cover_image && (
                                        <p className="text-destructive text-sm mt-1">{errors.book_cover_image}</p>
                                    )}
                                    {(bookCoverPreview || settings?.book_cover_image) && (
                                        <div className="mt-4 relative w-full h-48 bg-muted rounded-md overflow-hidden">
                                            <img
                                                src={bookCoverPreview || settings.book_cover_image || ""}
                                                alt="Book Cover Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="banner_book_image">Main Book Image (Displayed in Banner)</Label>
                                    <Input
                                        id="banner_book_image"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setData("banner_book_image", file);
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    setBannerBookPreview(reader.result as string);
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        className="mt-1"
                                    />
                                    {errors.banner_book_image && (
                                        <p className="text-destructive text-sm mt-1">{errors.banner_book_image}</p>
                                    )}
                                    {(bannerBookPreview || settings?.banner_book_image) && (
                                        <div className="mt-4 relative w-full h-48 bg-muted rounded-md overflow-hidden">
                                            <img
                                                src={bannerBookPreview || settings.banner_book_image || ""}
                                                alt="Main Book Preview"
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="banner_rotating_button_image">Rotating Button Text Image</Label>
                                    <Input
                                        id="banner_rotating_button_image"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setData("banner_rotating_button_image", file);
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    setRotatingButtonPreview(reader.result as string);
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        className="mt-1"
                                    />
                                    {errors.banner_rotating_button_image && (
                                        <p className="text-destructive text-sm mt-1">{errors.banner_rotating_button_image}</p>
                                    )}
                                    {(rotatingButtonPreview || settings?.banner_rotating_button_image) && (
                                        <div className="mt-4 relative w-full h-48 bg-muted rounded-md overflow-hidden">
                                            <img
                                                src={rotatingButtonPreview || settings.banner_rotating_button_image || ""}
                                                alt="Rotating Button Preview"
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="banner_title">Book Title</Label>
                                    <Input
                                        id="banner_title"
                                        value={data.banner_title}
                                        onChange={(e) => setData("banner_title", e.target.value)}
                                        placeholder="Chat GPT: Risk or Opportunity?"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="banner_description">Book Description</Label>
                                    <Textarea
                                        id="banner_description"
                                        value={data.banner_description}
                                        onChange={(e) => setData("banner_description", e.target.value)}
                                        placeholder="Enter book description..."
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
                                        placeholder="Price: 240 BDT"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="banner_button_text">Button Text</Label>
                                    <Input
                                        id="banner_button_text"
                                        value={data.banner_button_text}
                                        onChange={(e) => setData("banner_button_text", e.target.value)}
                                        placeholder="Read a Little"
                                        className="mt-1"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Highlights Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Highlights Section</CardTitle>
                                <CardDescription>Configure the book highlights section</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="highlights_section_title">Section Title</Label>
                                    <Input
                                        id="highlights_section_title"
                                        value={data.highlights_section_title}
                                        onChange={(e) => setData("highlights_section_title", e.target.value)}
                                        placeholder="Book Highlights"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="highlights_bg_color">Section Background Color</Label>
                                    <Input
                                        id="highlights_bg_color"
                                        type="color"
                                        value={data.highlights_bg_color}
                                        onChange={(e) => setData("highlights_bg_color", e.target.value)}
                                        className="mt-1 h-10"
                                    />
                                </div>

                                <div className="border-t pt-4 mt-4">
                                    <h4 className="font-semibold mb-4">Default Highlight Book 1</h4>
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="highlight_book_1_image">Book 1 Cover Image</Label>
                                            <Input
                                                id="highlight_book_1_image"
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        setData("highlight_book_1_image", file);
                                                        const reader = new FileReader();
                                                        reader.onloadend = () => {
                                                            setHighlightBook1Preview(reader.result as string);
                                                        };
                                                        reader.readAsDataURL(file);
                                                    }
                                                }}
                                                className="mt-1"
                                            />
                                            {(highlightBook1Preview || settings?.highlight_book_1_image) && (
                                                <div className="mt-4 relative w-32 h-40 bg-muted rounded-md overflow-hidden">
                                                    <img
                                                        src={highlightBook1Preview || settings.highlight_book_1_image || ""}
                                                        alt="Highlight Book 1 Preview"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <Label htmlFor="highlight_book_1_title">Book 1 Title</Label>
                                            <Input
                                                id="highlight_book_1_title"
                                                value={data.highlight_book_1_title}
                                                onChange={(e) => setData("highlight_book_1_title", e.target.value)}
                                                placeholder="Best-Selling Technology Book Award"
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="highlight_book_1_text">Book 1 Description</Label>
                                            <Textarea
                                                id="highlight_book_1_text"
                                                value={data.highlight_book_1_text}
                                                onChange={(e) => setData("highlight_book_1_text", e.target.value)}
                                                placeholder="Enter highlight book 1 description..."
                                                rows={3}
                                                className="mt-1"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t pt-4 mt-4">
                                    <h4 className="font-semibold mb-4">Default Highlight Book 2</h4>
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="highlight_book_2_image">Book 2 Cover Image</Label>
                                            <Input
                                                id="highlight_book_2_image"
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        setData("highlight_book_2_image", file);
                                                        const reader = new FileReader();
                                                        reader.onloadend = () => {
                                                            setHighlightBook2Preview(reader.result as string);
                                                        };
                                                        reader.readAsDataURL(file);
                                                    }
                                                }}
                                                className="mt-1"
                                            />
                                            {(highlightBook2Preview || settings?.highlight_book_2_image) && (
                                                <div className="mt-4 relative w-32 h-40 bg-muted rounded-md overflow-hidden">
                                                    <img
                                                        src={highlightBook2Preview || settings.highlight_book_2_image || ""}
                                                        alt="Highlight Book 2 Preview"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <Label htmlFor="highlight_book_2_title">Book 2 Title</Label>
                                            <Input
                                                id="highlight_book_2_title"
                                                value={data.highlight_book_2_title}
                                                onChange={(e) => setData("highlight_book_2_title", e.target.value)}
                                                placeholder="Innovation in Business Literature Award"
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="highlight_book_2_text">Book 2 Description</Label>
                                            <Textarea
                                                id="highlight_book_2_text"
                                                value={data.highlight_book_2_text}
                                                onChange={(e) => setData("highlight_book_2_text", e.target.value)}
                                                placeholder="Enter highlight book 2 description..."
                                                rows={3}
                                                className="mt-1"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Summary Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Summary Section</CardTitle>
                                <CardDescription>Configure the book summary section</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="summary_section_title">Section Title</Label>
                                    <Input
                                        id="summary_section_title"
                                        value={data.summary_section_title}
                                        onChange={(e) => setData("summary_section_title", e.target.value)}
                                        placeholder="Book Summary"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="summary_description">Default Description</Label>
                                    <Textarea
                                        id="summary_description"
                                        value={data.summary_description}
                                        onChange={(e) => setData("summary_description", e.target.value)}
                                        placeholder="Enter default summary description..."
                                        rows={4}
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="summary_fallback_text">Fallback Description</Label>
                                    <Textarea
                                        id="summary_fallback_text"
                                        value={data.summary_fallback_text}
                                        onChange={(e) => setData("summary_fallback_text", e.target.value)}
                                        placeholder="Enter fallback description when no book data..."
                                        rows={4}
                                        className="mt-1"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Review Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Review Section</CardTitle>
                                <CardDescription>Configure the book review section</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="review_section_title">Section Title</Label>
                                    <Input
                                        id="review_section_title"
                                        value={data.review_section_title}
                                        onChange={(e) => setData("review_section_title", e.target.value)}
                                        placeholder="Review"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="review_default_text">Default Review Text</Label>
                                    <Textarea
                                        id="review_default_text"
                                        value={data.review_default_text}
                                        onChange={(e) => setData("review_default_text", e.target.value)}
                                        placeholder="Enter default review text..."
                                        rows={4}
                                        className="mt-1"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <Label htmlFor="review_default_author_name">Default Author Name</Label>
                                        <Input
                                            id="review_default_author_name"
                                            value={data.review_default_author_name}
                                            onChange={(e) => setData("review_default_author_name", e.target.value)}
                                            placeholder="Shah Alam Chowdhury"
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="review_default_author_title">Default Author Title</Label>
                                        <Input
                                            id="review_default_author_title"
                                            value={data.review_default_author_title}
                                            onChange={(e) => setData("review_default_author_title", e.target.value)}
                                            placeholder="Managing Director"
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="review_default_author_company">Default Author Company</Label>
                                        <Input
                                            id="review_default_author_company"
                                            value={data.review_default_author_company}
                                            onChange={(e) => setData("review_default_author_company", e.target.value)}
                                            placeholder="AB Company"
                                            className="mt-1"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="review_bg_color">Section Background Color</Label>
                                    <Input
                                        id="review_bg_color"
                                        type="color"
                                        value={data.review_bg_color}
                                        onChange={(e) => setData("review_bg_color", e.target.value)}
                                        className="mt-1 h-10"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="review_avatar_image">Reviewer Avatar Image</Label>
                                    <Input
                                        id="review_avatar_image"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setData("review_avatar_image", file);
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    setReviewAvatarPreview(reader.result as string);
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        className="mt-1"
                                    />
                                    {errors.review_avatar_image && (
                                        <p className="text-destructive text-sm mt-1">{errors.review_avatar_image}</p>
                                    )}
                                    {(reviewAvatarPreview || settings?.review_avatar_image) && (
                                        <div className="mt-4 relative w-24 h-24 bg-muted rounded-full overflow-hidden">
                                            <img
                                                src={reviewAvatarPreview || settings.review_avatar_image || ""}
                                                alt="Avatar Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="review_quotation_icon">Quotation Icon/Image</Label>
                                    <Input
                                        id="review_quotation_icon"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setData("review_quotation_icon", file);
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    setQuotationIconPreview(reader.result as string);
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        className="mt-1"
                                    />
                                    {errors.review_quotation_icon && (
                                        <p className="text-destructive text-sm mt-1">{errors.review_quotation_icon}</p>
                                    )}
                                    {(quotationIconPreview || settings?.review_quotation_icon) && (
                                        <div className="mt-4 relative w-32 h-32 bg-muted rounded-md overflow-hidden">
                                            <img
                                                src={quotationIconPreview || settings.review_quotation_icon || ""}
                                                alt="Quotation Icon Preview"
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recommended Books Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Recommended Books Section</CardTitle>
                                <CardDescription>Configure the recommended books section</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="recommended_books_title">Section Title</Label>
                                    <Input
                                        id="recommended_books_title"
                                        value={data.recommended_books_title}
                                        onChange={(e) => setData("recommended_books_title", e.target.value)}
                                        placeholder="Recommended Books"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="recommended_books_subtitle">Section Subtitle</Label>
                                    <Input
                                        id="recommended_books_subtitle"
                                        value={data.recommended_books_subtitle}
                                        onChange={(e) => setData("recommended_books_subtitle", e.target.value)}
                                        placeholder="Must Read Collection"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="recommended_books_description">Default Description</Label>
                                    <Textarea
                                        id="recommended_books_description"
                                        value={data.recommended_books_description}
                                        onChange={(e) => setData("recommended_books_description", e.target.value)}
                                        placeholder="Enter default description for recommended books..."
                                        rows={4}
                                        className="mt-1"
                                    />
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
