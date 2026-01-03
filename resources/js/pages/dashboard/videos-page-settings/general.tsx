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

interface VideosPageSetting {
    id: number;
    page_title: string | null;
}

interface Props {
    settings: VideosPageSetting;
}

export default function VideosPageSettingsGeneral({ settings }: Props) {
    const { data, setData, post, processing } = useForm({
        page_title: settings?.page_title || "Videos",
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post("/admin/videos-page-settings/update", {
            preserveScroll: true,
            onSuccess: () => toast.success("General settings updated successfully"),
        });
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SiteHeader />
                <Head title="Videos - General Settings" />

                <div className="container mx-auto py-8 px-4 max-w-4xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-foreground">General Settings</h1>
                        <p className="text-muted-foreground mt-2">Basic page configuration</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Page Title</CardTitle>
                                <CardDescription>Set the main title</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Label htmlFor="page_title">Page Title</Label>
                                <Input
                                    id="page_title"
                                    value={data.page_title}
                                    onChange={(e) => setData("page_title", e.target.value)}
                                    placeholder="Videos"
                                    className="mt-1"
                                />
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
