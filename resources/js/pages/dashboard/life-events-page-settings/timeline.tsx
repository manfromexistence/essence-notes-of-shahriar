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

interface LifeEventsPageSetting {
    id: number;
    timeline_section_title: string | null;
    timeline_section_subtitle: string | null;
}

interface Props {
    settings: LifeEventsPageSetting;
}

export default function LifeEventsPageSettingsTimeline({ settings }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        timeline_section_title: settings?.timeline_section_title || "Life Timeline",
        timeline_section_subtitle: settings?.timeline_section_subtitle || "A Journey Through Time",
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post("/admin/life-events-page-settings/update", {
            preserveScroll: true,
            onSuccess: () => toast.success("Timeline settings updated successfully"),
        });
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SiteHeader />
                <Head title="Life Events - Timeline Settings" />

                <div className="container mx-auto py-8 px-4 max-w-4xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-foreground">Timeline Settings</h1>
                        <p className="text-muted-foreground mt-2">Configure the timeline section</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Timeline Section</CardTitle>
                                <CardDescription>Set the timeline section title and subtitle</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="timeline_section_title">Section Title</Label>
                                    <Input
                                        id="timeline_section_title"
                                        value={data.timeline_section_title}
                                        onChange={(e) => setData("timeline_section_title", e.target.value)}
                                        placeholder="Life Timeline"
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="timeline_section_subtitle">Section Subtitle</Label>
                                    <Input
                                        id="timeline_section_subtitle"
                                        value={data.timeline_section_subtitle}
                                        onChange={(e) => setData("timeline_section_subtitle", e.target.value)}
                                        placeholder="A Journey Through Time"
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
