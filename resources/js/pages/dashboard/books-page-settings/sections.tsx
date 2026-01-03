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
    // Review Section
    review_section_title: string | null;
    review_bg_color: string | null;
    review_avatar_image: string | null;
    review_quotation_icon: string | null;
    review_default_text: string | null;
    review_default_author_name: string | null;
    review_default_author_title: string | null;
    review_default_author_company: string | null;
    // Highlights Section
    highlights_section_title: string | null;
    highlights_bg_color: string | null;
    highlight_book_1_image: string | null;
    highlight_book_1_title: string | null;
    highlight_book_1_text: string | null;
    highlight_book_2_image: string | null;
    highlight_book_2_title: string | null;
    highlight_book_2_text: string | null;
    // Recommended Books
    recommended_books_title: string | null;
    recommended_books_subtitle: string | null;
    recommended_books_description: string | null;
}

interface Props {
    settings: BooksPageSetting;
}

export default function BooksPageSettingsSections({ settings }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        // Review Section
        review_section_title: settings?.review_section_title || "Review",
        review_avatar_image: null as File | null,
        review_quotation_icon: null as File | null,
        review_default_text: settings?.review_default_text || "The Nightingale has easily found its way to one of my favorite books to recommend. Although some may feel daunted by the over 300 page book, it is worth every page.",
        review_default_author_name: settings?.review_default_author_name || "Shah Alam Chowdhury",
        review_default_author_title: settings?.review_default_author_title || "Managing Director",
        review_default_author_company: settings?.review_default_author_company || "AB Company",
        // Highlights Section
        highlights_section_title: settings?.highlights_section_title || "Book Highlights",
        highlight_book_1_image: null as File | null,
        highlight_book_1_title: settings?.highlight_book_1_title || "Best-Selling Technology Book Award",
        highlight_book_1_text: settings?.highlight_book_1_text || '"Chat GPT: Risk or Opportunity?" has been recognized as a pioneering work in exploring the implications of AI technology for businesses and society in Bangladesh.',
        highlight_book_2_image: null as File | null,
        highlight_book_2_title: settings?.highlight_book_2_title || "Innovation in Business Literature Award",
        highlight_book_2_text: settings?.highlight_book_2_text || "Honored for breaking new ground in business literature by addressing contemporary challenges of AI adoption and digital transformation in emerging markets.",
        // Recommended Books
        recommended_books_title: settings?.recommended_books_title || "Recommended Books",
        recommended_books_subtitle: settings?.recommended_books_subtitle || "Must Read Collection",
        recommended_books_description: settings?.recommended_books_description || "Through real-world examples and strategic frameworks, Shahriar Khan offers a balanced perspective on leveraging AI opportunities while managing associated risks.",
    });

    // Image preview states
    const [reviewAvatarPreview, setReviewAvatarPreview] = useState<string | null>(null);
    const [reviewQuotationPreview, setReviewQuotationPreview] = useState<string | null>(null);
    const [highlightBook1Preview, setHighlightBook1Preview] = useState<string | null>(null);
    const [highlightBook2Preview, setHighlightBook2Preview] = useState<string | null>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post("/admin/books-page-settings/update", {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => toast.success("Sections settings updated successfully"),
        });
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SiteHeader />
                <Head title="Books Page - Sections Settings" />

                <div className="container mx-auto py-8 px-4 max-w-4xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-foreground">Sections Settings</h1>
                        <p className="text-muted-foreground mt-2">Configure review and recommended books sections</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Highlights Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Highlights Section</CardTitle>
                                <CardDescription>Configure the book highlights section with awards/achievements</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="highlights_section_title">Section Title</Label>
                                    <Input
                                        id="highlights_section_title"
                                        value={data.highlights_section_title}
                                        onChange={(e) => setData("highlights_section_title", e.target.value)}
                                        className="mt-1"
                                    />
                                </div>

                                {/* Highlight Book 1 */}
                                <div className="border p-4 rounded-lg space-y-4">
                                    <h4 className="font-semibold">Highlight Book 1</h4>

                                    <div>
                                        <Label htmlFor="highlight_book_1_image">Book Cover Image</Label>
                                        <Input
                                            id="highlight_book_1_image"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    setData("highlight_book_1_image", file);
                                                    const reader = new FileReader();
                                                    reader.onloadend = () => setHighlightBook1Preview(reader.result as string);
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                            className="mt-1"
                                        />
                                        {(highlightBook1Preview || settings?.highlight_book_1_image || true) && (
                                            <div className="mt-2">
                                                <img
                                                    src={highlightBook1Preview || settings?.highlight_book_1_image || "/assets/books/company_award_book.png"}
                                                    alt="Preview"
                                                    className="w-24 h-32 object-cover rounded border"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="highlight_book_1_title">Title</Label>
                                        <Input
                                            id="highlight_book_1_title"
                                            value={data.highlight_book_1_title}
                                            onChange={(e) => setData("highlight_book_1_title", e.target.value)}
                                            className="mt-1"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="highlight_book_1_text">Description</Label>
                                        <Textarea
                                            id="highlight_book_1_text"
                                            value={data.highlight_book_1_text}
                                            onChange={(e) => setData("highlight_book_1_text", e.target.value)}
                                            rows={3}
                                            className="mt-1"
                                        />
                                    </div>
                                </div>

                                {/* Highlight Book 2 */}
                                <div className="border p-4 rounded-lg space-y-4">
                                    <h4 className="font-semibold">Highlight Book 2</h4>

                                    <div>
                                        <Label htmlFor="highlight_book_2_image">Book Cover Image</Label>
                                        <Input
                                            id="highlight_book_2_image"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    setData("highlight_book_2_image", file);
                                                    const reader = new FileReader();
                                                    reader.onloadend = () => setHighlightBook2Preview(reader.result as string);
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                            className="mt-1"
                                        />
                                        {(highlightBook2Preview || settings?.highlight_book_2_image || true) && (
                                            <div className="mt-2">
                                                <img
                                                    src={highlightBook2Preview || settings?.highlight_book_2_image || "/assets/books/uddokta_book.png"}
                                                    alt="Preview"
                                                    className="w-24 h-32 object-cover rounded border"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="highlight_book_2_title">Title</Label>
                                        <Input
                                            id="highlight_book_2_title"
                                            value={data.highlight_book_2_title}
                                            onChange={(e) => setData("highlight_book_2_title", e.target.value)}
                                            className="mt-1"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="highlight_book_2_text">Description</Label>
                                        <Textarea
                                            id="highlight_book_2_text"
                                            value={data.highlight_book_2_text}
                                            onChange={(e) => setData("highlight_book_2_text", e.target.value)}
                                            rows={3}
                                            className="mt-1"
                                        />
                                    </div>
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
                                        className="mt-1"
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
                                                reader.onloadend = () => setReviewAvatarPreview(reader.result as string);
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        className="mt-1"
                                    />
                                    {(reviewAvatarPreview || settings?.review_avatar_image || true) && (
                                        <div className="mt-2">
                                            <img
                                                src={reviewAvatarPreview || settings?.review_avatar_image || "/assets/books/review.png"}
                                                alt="Avatar Preview"
                                                className="w-24 h-24 object-cover rounded-full border"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="review_quotation_icon">Quotation Icon</Label>
                                    <Input
                                        id="review_quotation_icon"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setData("review_quotation_icon", file);
                                                const reader = new FileReader();
                                                reader.onloadend = () => setReviewQuotationPreview(reader.result as string);
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        className="mt-1"
                                    />
                                    {(reviewQuotationPreview || settings?.review_quotation_icon || true) && (
                                        <div className="mt-2">
                                            <img
                                                src={reviewQuotationPreview || settings?.review_quotation_icon || "/assets/books/colon.svg"}
                                                alt="Quotation Preview"
                                                className="w-16 h-16 object-contain border rounded"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="review_default_text">Default Review Text</Label>
                                    <Textarea
                                        id="review_default_text"
                                        value={data.review_default_text}
                                        onChange={(e) => setData("review_default_text", e.target.value)}
                                        rows={4}
                                        className="mt-1"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <Label htmlFor="review_default_author_name">Author Name</Label>
                                        <Input
                                            id="review_default_author_name"
                                            value={data.review_default_author_name}
                                            onChange={(e) => setData("review_default_author_name", e.target.value)}
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="review_default_author_title">Author Title</Label>
                                        <Input
                                            id="review_default_author_title"
                                            value={data.review_default_author_title}
                                            onChange={(e) => setData("review_default_author_title", e.target.value)}
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="review_default_author_company">Author Company</Label>
                                        <Input
                                            id="review_default_author_company"
                                            value={data.review_default_author_company}
                                            onChange={(e) => setData("review_default_author_company", e.target.value)}
                                            className="mt-1"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

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
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="recommended_books_subtitle">Section Subtitle</Label>
                                    <Input
                                        id="recommended_books_subtitle"
                                        value={data.recommended_books_subtitle}
                                        onChange={(e) => setData("recommended_books_subtitle", e.target.value)}
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="recommended_books_description">Default Description</Label>
                                    <Textarea
                                        id="recommended_books_description"
                                        value={data.recommended_books_description}
                                        onChange={(e) => setData("recommended_books_description", e.target.value)}
                                        rows={4}
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
