import { FormEvent } from "react";
import { Head, useForm } from "@inertiajs/react";
import { toast } from "sonner";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface BlogsPageSetting {
    id: number;
    featured_blogs_title: string | null;
    all_blogs_section_title: string | null;
}

interface Props {
    settings: BlogsPageSetting;
}

export default function BlogsPageSettingsSections({ settings }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        featured_blogs_title: settings?.featured_blogs_title || "Featured Blogs",
        all_blogs_section_title: settings?.all_blogs_section_title || "All Blogs",
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post("/admin/blogs-page-settings/update", {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Sections settings updated successfully");
            },
            onError: (errors) => {
                console.error('Update errors:', errors);
            }
        });
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SiteHeader />
                <Head title="Blogs Page - Sections Settings" />

                <div className="container mx-auto py-8 px-4 max-w-4xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-foreground">
                            Sections Settings
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Configure section titles and content for the Blogs page
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Blog Sections</CardTitle>
                                <CardDescription>Set titles for different blog sections on the page</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* <div>
                                    <Label htmlFor="featured_blogs_title">Featured Blogs Section Title</Label>
                                    <Input
                                        id="featured_blogs_title"
                                        value={data.featured_blogs_title}
                                        onChange={(e) => setData("featured_blogs_title", e.target.value)}
                                        placeholder="Featured Blogs"
                                        className="mt-1"
                                    />
                                    {errors.featured_blogs_title && (
                                        <p className="text-destructive text-sm mt-1">{errors.featured_blogs_title}</p>
                                    )}
                                </div> */}

                                <div>
                                    <Label htmlFor="all_blogs_section_title">All Blogs Section Title</Label>
                                    <Input
                                        id="all_blogs_section_title"
                                        value={data.all_blogs_section_title}
                                        onChange={(e) => setData("all_blogs_section_title", e.target.value)}
                                        placeholder="All Blogs"
                                        className="mt-1"
                                    />
                                    {errors.all_blogs_section_title && (
                                        <p className="text-destructive text-sm mt-1">{errors.all_blogs_section_title}</p>
                                    )}
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
