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
    banner_quote_label: 100,
    banner_quote: 500,
    innovation_section_title: 200,
    innovation_section_subtitle: 2000,
};

interface EntrepreneurshipPageSetting {
    id: number;
    page_title: string | null;
    banner_quote: string | null;
    banner_quote_label: string | null;
    banner_image: string | null;
    quotes_section_title: string | null;
    quotes: Array<{
        content: string;
        author: string;
        image: string | null;
        is_featured: boolean;
    }> | null;
    innovation_section_title: string | null;
    innovation_section_subtitle: string | null;
    innovations: Array<{
        title: string;
        description: string;
        long_description: string;
        image: string | null;
        is_featured: boolean;
    }> | null;
    events_section_title: string | null;
    events_button_text: string | null;
    blogs_section_title: string | null;
    blogs_button_text: string | null;
    blogs_show_less_text: string | null;
}

interface Props {
    settings: EntrepreneurshipPageSetting;
}

export default function EntrepreneurshipPageSettings({ settings }: Props) {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [quoteImagePreviews, setQuoteImagePreviews] = useState<{ [key: number]: string | null }>({});
    const [innovationImagePreviews, setInnovationImagePreviews] = useState<{ [key: number]: string | null }>({});
    const [savingSection, setSavingSection] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        page_title: settings?.page_title || "Entrepreneurship",
        banner_quote: settings?.banner_quote || "We are now in the era of the 4th industrial revolution, where everything depends on technology. So we also have to depend on technology",
        banner_quote_label: settings?.banner_quote_label || "My Thoughts",
        banner_image: null as File | null,
        quotes_section_title: settings?.quotes_section_title || "Inspiring Quotes",
        quotes: settings?.quotes || [
            {
                content: "The best way to predict the future is to invent it.",
                author: "Alan Kay",
                image: null,
                is_featured: true,
            },
            {
                content: "Innovation distinguishes between a leader and a follower.",
                author: "Steve Jobs",
                image: null,
                is_featured: false,
            },
            {
                content: "The only way to do great work is to love what you do.",
                author: "Steve Jobs",
                image: null,
                is_featured: false,
            },
        ],
        quote_images: [] as File[],
        innovation_section_title: settings?.innovation_section_title || "Igniting Innovation: A Startup Journey",
        innovation_section_subtitle: settings?.innovation_section_subtitle || "Embarking on a journey of innovation, I've founded and nurtured several startups that push the boundaries of technology and creativity. From NexKraft's focus on next-generation technological advancements to Mechani's engineering solutions, Huistle's innovative platforms, and Mindshaper's transformative ideas, each venture represents a step towards transforming bold concepts into impactful realities. This entrepreneurial path has been about more than just building companies—it's about fostering a culture of innovation that drives progress and creates lasting value in the digital world.",
        innovations: settings?.innovations || [
            {
                title: "NexKraft Solutions",
                description: "AI-Powered Business Solutions",
                long_description: "NexKraft is an innovative startup focused on transforming the digital world through cutting-edge solutions. Leveraging artificial intelligence to solve real business problems and drive technological advancement.",
                image: "/assets/entepreneourship/nexkraft.png",
                is_featured: true,
            },
            {
                title: "Mechanix Pro",
                description: "Digital Platform for Automotive Services",
                long_description: "Connecting vehicle owners with trusted mechanics and service providers through a comprehensive digital platform that revolutionizes the automotive service industry.",
                image: "/assets/entepreneourship/mechani.png",
                is_featured: true,
            },
            {
                title: "Huistle App",
                description: "Productivity & Task Management",
                long_description: "A modern productivity app that helps teams collaborate better and manage tasks efficiently in today's fast-paced work environment.",
                image: "/assets/entepreneourship/huistle.png",
                is_featured: true,
            },
            {
                title: "MindShaper",
                description: "Personal Development Platform",
                long_description: "Empowering individuals to reach their full potential through innovative personal development tools and resources designed for modern learners.",
                image: "/assets/entepreneourship/mindshaper.png",
                is_featured: true,
            },
        ],
        innovation_images: [] as File[],
        events_section_title: settings?.events_section_title || "Events",
        events_button_text: settings?.events_button_text || "All Events",
        blogs_section_title: settings?.blogs_section_title || "All Blog",
        blogs_button_text: settings?.blogs_button_text || "All Blogs",
        blogs_show_less_text: settings?.blogs_show_less_text || "Show Less",
    });

    // Real-time validation errors based on current data
    const getValidationErrors = () => {
        const errors: Record<string, string> = {};

        if ((data.banner_quote_label || "").length > LIMITS.banner_quote_label) {
            errors.banner_quote_label = `Quote label must be ${LIMITS.banner_quote_label} characters or less`;
        }
        if ((data.banner_quote || "").length > LIMITS.banner_quote) {
            errors.banner_quote = `Quote must be ${LIMITS.banner_quote} characters or less`;
        }
        if ((data.innovation_section_title || "").length > LIMITS.innovation_section_title) {
            errors.innovation_section_title = `Section title must be ${LIMITS.innovation_section_title} characters or less`;
        }
        if ((data.innovation_section_subtitle || "").length > LIMITS.innovation_section_subtitle) {
            errors.innovation_section_subtitle = `Section subtitle must be ${LIMITS.innovation_section_subtitle} characters or less`;
        }

        return errors;
    };

    const validationErrors = getValidationErrors();
    const hasErrors = Object.keys(validationErrors).length > 0;

    const handleSubmit = (section: string) => (e: FormEvent) => {
        e.preventDefault();

        if (hasErrors) {
            toast.error("Please fix the validation errors before saving");
            return;
        }

        setSavingSection(section);
        post("/admin/entrepreneurship-page-settings/update", {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setPreviewImage(null);
                setPreviewImage(null);
                setQuoteImagePreviews({});
                setInnovationImagePreviews({});
                setSavingSection(null);
                toast.success("Entrepreneurship page settings updated successfully");
            },
            onError: (errors) => {
                console.error('Update errors:', errors);
                setSavingSection(null);
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

    const handleQuoteImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Update the quote_images array
            const newQuoteImages = [...(data.quote_images || [])];
            newQuoteImages[index] = file;
            setData("quote_images", newQuoteImages);

            // Set preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setQuoteImagePreviews(prev => ({
                    ...prev,
                    [index]: reader.result as string
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInnovationImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Update the innovation_images array
            const newInnovationImages = [...(data.innovation_images || [])];
            newInnovationImages[index] = file;
            setData("innovation_images", newInnovationImages);

            // Set preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setInnovationImagePreviews(prev => ({
                    ...prev,
                    [index]: reader.result as string
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SiteHeader />
                <Head title="Entrepreneurship Page Settings" />

                <div className="container mx-auto py-8 px-4 max-w-4xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-foreground">
                            Entrepreneurship Page Settings
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Manage the content and styling displayed on the Entrepreneurship page
                        </p>
                    </div>

                    <form className="space-y-6">
                        {/* Banner Settings */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Banner Settings</CardTitle>
                                <CardDescription>Configure the banner section content and styling</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="banner_quote_label">Quote Label</Label>
                                    <CharacterLimitedInput
                                        id="banner_quote_label"
                                        value={data.banner_quote_label}
                                        onChange={(e) => setData("banner_quote_label", e.target.value)}
                                        maxLength={LIMITS.banner_quote_label}
                                        placeholder="My Thoughts"
                                        className="mt-1"
                                        error={validationErrors.banner_quote_label}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="banner_quote">Quote Text</Label>
                                    <CharacterLimitedTextarea
                                        id="banner_quote"
                                        value={data.banner_quote}
                                        onChange={(e) => setData("banner_quote", e.target.value)}
                                        maxLength={LIMITS.banner_quote}
                                        placeholder="Enter the main quote..."
                                        rows={4}
                                        className="mt-1"
                                        error={validationErrors.banner_quote}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="banner_image">Banner Background Image</Label>
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
                                <div className="flex justify-end pt-4">
                                    <Button
                                        type="button"
                                        onClick={handleSubmit('banner')}
                                        disabled={savingSection === 'banner' || hasErrors}
                                    >
                                        {savingSection === 'banner' ? "Saving..." : hasErrors ? "Fix Errors to Save" : "Save Changes"}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quotes Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Quotes Section</CardTitle>
                                <CardDescription>Configure the quotes section content and quotes</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="quotes_section_title">Section Title</Label>
                                    <Input
                                        id="quotes_section_title"
                                        value={data.quotes_section_title}
                                        onChange={(e) => setData("quotes_section_title", e.target.value)}
                                        placeholder="Inspiring Quotes"
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label>Quotes</Label>
                                    <div className="space-y-4 mt-2">
                                        {data.quotes.map((quote, index) => (
                                            <Card key={index} className="p-4">
                                                <div className="space-y-3">
                                                    <div>
                                                        <Label>Quote Content</Label>
                                                        <Textarea
                                                            value={quote.content}
                                                            onChange={(e) => {
                                                                const newQuotes = [...data.quotes];
                                                                newQuotes[index].content = e.target.value;
                                                                setData("quotes", newQuotes);
                                                            }}
                                                            placeholder="Enter quote content..."
                                                            rows={3}
                                                            className="mt-1"
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label>Author</Label>
                                                        <Input
                                                            value={quote.author}
                                                            onChange={(e) => {
                                                                const newQuotes = [...data.quotes];
                                                                newQuotes[index].author = e.target.value;
                                                                setData("quotes", newQuotes);
                                                            }}
                                                            placeholder="Quote author"
                                                            className="mt-1"
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label>Quote Image</Label>
                                                        <Input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) => handleQuoteImageChange(index, e)}
                                                            className="mt-1"
                                                        />
                                                        {(quoteImagePreviews[index] || quote.image) && (
                                                            <div className="mt-4 relative w-full h-32 bg-muted rounded-md overflow-hidden">
                                                                <img
                                                                    src={quoteImagePreviews[index] || quote.image || ""}
                                                                    alt={`Quote ${index + 1} Preview`}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <input
                                                            type="checkbox"
                                                            id={`quote-featured-${index}`}
                                                            checked={quote.is_featured}
                                                            onChange={(e) => {
                                                                const newQuotes = [...data.quotes];
                                                                newQuotes[index].is_featured = e.target.checked;
                                                                setData("quotes", newQuotes);
                                                            }}
                                                        />
                                                        <Label htmlFor={`quote-featured-${index}`}>Featured Quote</Label>
                                                    </div>
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() => {
                                                            const newQuotes = data.quotes.filter((_, i) => i !== index);
                                                            setData("quotes", newQuotes);
                                                        }}
                                                    >
                                                        Remove Quote
                                                    </Button>
                                                </div>
                                            </Card>
                                        ))}
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => {
                                                setData("quotes", [
                                                    ...data.quotes,
                                                    {
                                                        content: "",
                                                        author: "",
                                                        image: null,
                                                        is_featured: false,
                                                    },
                                                ]);
                                            }}
                                        >
                                            Add Quote
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex justify-end pt-4">
                                    <Button
                                        type="button"
                                        onClick={handleSubmit('quotes')}
                                        disabled={savingSection === 'quotes' || hasErrors}
                                    >
                                        {savingSection === 'quotes' ? "Saving..." : hasErrors ? "Fix Errors to Save" : "Save Changes"}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Innovation Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Innovation Section</CardTitle>
                                <CardDescription>Configure the innovation and startups section content</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="innovation_section_title">Section Title</Label>
                                    <CharacterLimitedInput
                                        id="innovation_section_title"
                                        value={data.innovation_section_title}
                                        onChange={(e) => setData("innovation_section_title", e.target.value)}
                                        maxLength={LIMITS.innovation_section_title}
                                        placeholder="Igniting Innovation: A Startup Journey"
                                        className="mt-1"
                                        error={validationErrors.innovation_section_title}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="innovation_section_subtitle">Section Description</Label>
                                    <CharacterLimitedTextarea
                                        id="innovation_section_subtitle"
                                        value={data.innovation_section_subtitle}
                                        onChange={(e) => setData("innovation_section_subtitle", e.target.value)}
                                        maxLength={LIMITS.innovation_section_subtitle}
                                        placeholder="Enter the innovation section description..."
                                        rows={6}
                                        className="mt-1"
                                        error={validationErrors.innovation_section_subtitle}
                                    />
                                </div>

                                <div>
                                    <Label>Innovations/Startups</Label>
                                    <div className="space-y-4 mt-2">
                                        {data.innovations.map((innovation, index) => (
                                            <Card key={index} className="p-4">
                                                <div className="space-y-3">
                                                    <div>
                                                        <Label>Title</Label>
                                                        <Input
                                                            value={innovation.title}
                                                            onChange={(e) => {
                                                                const newInnovations = [...data.innovations];
                                                                newInnovations[index].title = e.target.value;
                                                                setData("innovations", newInnovations);
                                                            }}
                                                            placeholder="Innovation title"
                                                            className="mt-1"
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label>Description</Label>
                                                        <Input
                                                            value={innovation.description}
                                                            onChange={(e) => {
                                                                const newInnovations = [...data.innovations];
                                                                newInnovations[index].description = e.target.value;
                                                                setData("innovations", newInnovations);
                                                            }}
                                                            placeholder="Short description"
                                                            className="mt-1"
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label>Long Description</Label>
                                                        <Textarea
                                                            value={innovation.long_description}
                                                            onChange={(e) => {
                                                                const newInnovations = [...data.innovations];
                                                                newInnovations[index].long_description = e.target.value;
                                                                setData("innovations", newInnovations);
                                                            }}
                                                            placeholder="Detailed description..."
                                                            rows={4}
                                                            className="mt-1"
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label>Innovation Image</Label>
                                                        <Input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) => handleInnovationImageChange(index, e)}
                                                            className="mt-1"
                                                        />
                                                        {(innovationImagePreviews[index] || innovation.image) && (
                                                            <div className="mt-4 relative w-full h-32 bg-muted rounded-md overflow-hidden">
                                                                <img
                                                                    src={innovationImagePreviews[index] || innovation.image || ""}
                                                                    alt={`Innovation ${index + 1} Preview`}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <input
                                                            type="checkbox"
                                                            id={`innovation-featured-${index}`}
                                                            checked={innovation.is_featured}
                                                            onChange={(e) => {
                                                                const newInnovations = [...data.innovations];
                                                                newInnovations[index].is_featured = e.target.checked;
                                                                setData("innovations", newInnovations);
                                                            }}
                                                        />
                                                        <Label htmlFor={`innovation-featured-${index}`}>Featured Innovation</Label>
                                                    </div>
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() => {
                                                            const newInnovations = data.innovations.filter((_, i) => i !== index);
                                                            setData("innovations", newInnovations);
                                                        }}
                                                    >
                                                        Remove Innovation
                                                    </Button>
                                                </div>
                                            </Card>
                                        ))}
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => {
                                                setData("innovations", [
                                                    ...data.innovations,
                                                    {
                                                        title: "",
                                                        description: "",
                                                        long_description: "",
                                                        image: "",
                                                        is_featured: false,
                                                    },
                                                ]);
                                            }}
                                        >
                                            Add Innovation
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex justify-end pt-4">
                                    <Button
                                        type="button"
                                        onClick={handleSubmit('innovation')}
                                        disabled={savingSection === 'innovation' || hasErrors}
                                    >
                                        {savingSection === 'innovation' ? "Saving..." : hasErrors ? "Fix Errors to Save" : "Save Changes"}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Events Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Events Section</CardTitle>
                                <CardDescription>Configure the events section</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="events_section_title">Section Title</Label>
                                    <Input
                                        id="events_section_title"
                                        value={data.events_section_title}
                                        onChange={(e) => setData("events_section_title", e.target.value)}
                                        placeholder="Events"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="events_button_text">Button Text</Label>
                                    <Input
                                        id="events_button_text"
                                        value={data.events_button_text}
                                        onChange={(e) => setData("events_button_text", e.target.value)}
                                        placeholder="All Events"
                                        className="mt-1"
                                    />
                                </div>
                                <div className="flex justify-end pt-4">
                                    <Button
                                        type="button"
                                        onClick={handleSubmit('events')}
                                        disabled={savingSection === 'events' || hasErrors}
                                    >
                                        {savingSection === 'events' ? "Saving..." : hasErrors ? "Fix Errors to Save" : "Save Changes"}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Blogs Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Blogs Section</CardTitle>
                                <CardDescription>Configure the blogs section</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="blogs_section_title">Section Title</Label>
                                    <Input
                                        id="blogs_section_title"
                                        value={data.blogs_section_title}
                                        onChange={(e) => setData("blogs_section_title", e.target.value)}
                                        placeholder="All Blog"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="blogs_button_text">Show More Button Text</Label>
                                    <Input
                                        id="blogs_button_text"
                                        value={data.blogs_button_text}
                                        onChange={(e) => setData("blogs_button_text", e.target.value)}
                                        placeholder="All Blogs"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="blogs_show_less_text">Show Less Button Text</Label>
                                    <Input
                                        id="blogs_show_less_text"
                                        value={data.blogs_show_less_text}
                                        onChange={(e) => setData("blogs_show_less_text", e.target.value)}
                                        placeholder="Show Less"
                                        className="mt-1"
                                    />
                                </div>
                                <div className="flex justify-end pt-4">
                                    <Button
                                        type="button"
                                        onClick={handleSubmit('blogs')}
                                        disabled={savingSection === 'blogs' || hasErrors}
                                    >
                                        {savingSection === 'blogs' ? "Saving..." : hasErrors ? "Fix Errors to Save" : "Save Changes"}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>


                    </form>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
