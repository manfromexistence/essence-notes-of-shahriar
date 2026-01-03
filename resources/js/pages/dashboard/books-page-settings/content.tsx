import { FormEvent } from "react";
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
    highlights_section_title: string | null;
    summary_section_title: string | null;
    summary_description: string | null;
    summary_fallback_text: string | null;
}

interface Props {
    settings: BooksPageSetting;
}

export default function BooksPageSettingsContent({ settings }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        highlights_section_title: settings?.highlights_section_title || "Book Highlights",
        summary_section_title: settings?.summary_section_title || "Book Summary",
        summary_description: settings?.summary_description || "Living an extraordinary life means shaping it on your terms, filled with deep meaning and significant impact. Fueled by the quest for excellence and a strong sense of purpose, Shahriar Khan has motivated millions to dream boldly and strive for greater heights.",
        summary_fallback_text: settings?.summary_fallback_text || "Recognized for excellence in delivering top-tier event planning services across the country, setting industry standards in creativity, organization, and client satisfaction.",
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post("/admin/books-page-settings/update", {
            preserveScroll: true,
            onSuccess: () => toast.success("Content settings updated successfully"),
        });
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SiteHeader />
                <Head title="Books Page - Content Settings" />

                <div className="container mx-auto py-8 px-4 max-w-4xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-foreground">Content Settings</h1>
                        <p className="text-muted-foreground mt-2">Configure highlights and summary sections</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Highlights Section</CardTitle>
                                <CardDescription>Configure the book highlights section</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Label htmlFor="highlights_section_title">Section Title</Label>
                                <Input
                                    id="highlights_section_title"
                                    value={data.highlights_section_title}
                                    onChange={(e) => setData("highlights_section_title", e.target.value)}
                                    className="mt-1"
                                />
                            </CardContent>
                        </Card>

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
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="summary_description">Default Description</Label>
                                    <Textarea
                                        id="summary_description"
                                        value={data.summary_description}
                                        onChange={(e) => setData("summary_description", e.target.value)}
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
