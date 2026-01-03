import { Head, Link, router } from "@inertiajs/react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2 } from "lucide-react";
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
    slides: BookBannerSlide[];
}

export default function BookBannerSlidesIndex({ slides }: Props) {
    const handleDelete = (slideId: number) => {
        if (confirm('Are you sure you want to delete this carousel slide?')) {
            router.delete(`/admin/book-banner-slides/${slideId}`, {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Carousel slide deleted successfully!');
                },
                onError: () => {
                    toast.error('Failed to delete carousel slide.');
                }
            });
        }
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SiteHeader />
                <Head title="Banner Carousel Slides" />

                <div className="container mx-auto py-8 px-4">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">
                                Banner Carousel Slides
                            </h1>
                            <p className="text-muted-foreground mt-2">
                                Manage your banner carousel slides for the Books page
                            </p>
                        </div>
                        <Link href="/admin/book-banner-slides/create">
                            <Button>
                                <Plus className="w-4 h-4 mr-2" />
                                Add New Slide
                            </Button>
                        </Link>
                    </div>

                    {slides.length === 0 ? (
                        <Card>
                            <CardContent className="py-12 text-center">
                                <p className="text-muted-foreground mb-4">
                                    No carousel slides found. Create your first slide to get started.
                                </p>
                                <Link href="/admin/book-banner-slides/create">
                                    <Button>
                                        <Plus className="w-4 h-4 mr-2" />
                                        Create First Carousel Slide
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid gap-6">
                            {slides.map((slide) => (
                                <Card key={slide.id}>
                                    <CardContent className="p-6">
                                        <div className="flex gap-6">
                                            {/* Thumbnail */}
                                            <div className="flex-shrink-0">
                                                {slide.book_image ? (
                                                    <img
                                                        src={slide.book_image}
                                                        alt={slide.title}
                                                        className="w-24 h-32 object-cover rounded-md border"
                                                    />
                                                ) : (
                                                    <div className="w-24 h-32 bg-muted rounded-md border flex items-center justify-center text-muted-foreground text-xs">
                                                        No Image
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <h3 className="text-xl font-semibold text-foreground">
                                                            {slide.title}
                                                        </h3>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <Badge variant={slide.is_active ? "default" : "secondary"}>
                                                                {slide.is_active ? "Active" : "Inactive"}
                                                            </Badge>
                                                            <span className="text-sm text-muted-foreground">
                                                                Order: {slide.order}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Link href={`/admin/book-banner-slides/${slide.id}/edit`}>
                                                            <Button variant="outline" size="sm">
                                                                <Pencil className="w-4 h-4 mr-1" />
                                                                Edit
                                                            </Button>
                                                        </Link>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleDelete(slide.id)}
                                                            className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                                                        >
                                                            <Trash2 className="w-4 h-4 mr-1" />
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </div>
                                                {slide.description && (
                                                    <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
                                                        {slide.description}
                                                    </p>
                                                )}
                                                <div className="flex gap-4 mt-3 text-sm">
                                                    {slide.price_text && (
                                                        <span className="text-muted-foreground">
                                                            <strong>Price:</strong> {slide.price_text}
                                                        </span>
                                                    )}
                                                    {slide.button_text && (
                                                        <span className="text-muted-foreground">
                                                            <strong>Button:</strong> {slide.button_text}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}

                    {/* {slides.length > 0 && (
                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle>Quick Tips</CardTitle>
                                <CardDescription>How carousel slides work</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                    <li>Slides are displayed in order on the Books page carousel</li>
                                    <li>Only active slides are visible to visitors</li>
                                    <li>Upload custom book images for each slide</li>
                                    <li>Customize title, description, price, and button text for each slide</li>
                                </ul>
                            </CardContent>
                        </Card>
                    )} */}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
