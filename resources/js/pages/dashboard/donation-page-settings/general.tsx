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

interface DonationPageSetting {
    id: number;
    page_title: string | null;
}

interface Props {
    settings: DonationPageSetting;
}

export default function DonationPageSettingsGeneral({ settings }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        page_title: settings?.page_title || "Donation",
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post("/admin/donation-page-settings/update", {
            preserveScroll: true,
            onSuccess: () => toast.success("General settings updated successfully"),
        });
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SiteHeader />
                <Head title="Donation Page - General Settings" />

                <div className="container mx-auto py-8 px-4 max-w-4xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-foreground">General Settings</h1>
                        <p className="text-muted-foreground mt-2">Basic page configuration for the Donation page</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Page Title</CardTitle>
                                <CardDescription>Set the main title for the Donation page</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Label htmlFor="page_title">Page Title</Label>
                                <Input
                                    id="page_title"
                                    value={data.page_title}
                                    onChange={(e) => setData("page_title", e.target.value)}
                                    placeholder="Donation"
                                    className="mt-1"
                                />
                                {errors.page_title && (
                                    <p className="text-destructive text-sm mt-1">{errors.page_title}</p>
                                )}
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
