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

interface AboutMePageSetting {
    report: {
        description: string;
        stat_1_value: string;
        stat_1_label: string;
        stat_2_value: string;
        stat_2_label: string;
        stat_3_value: string;
        stat_3_label: string;
        stat_4_value: string;
        stat_4_label: string;
        stat_5_value: string;
        stat_5_label: string;
        stat_6_value: string;
        stat_6_label: string;
        stat_7_value: string;
        stat_7_label: string;
    };
}

interface Props {
    settings: AboutMePageSetting;
}

export default function AboutSectionsReport({ settings }: Props) {
    const { data, setData, post, processing } = useForm({
        description: settings?.report?.description || "",
        stat_1_value: settings?.report?.stat_1_value || "",
        stat_1_label: settings?.report?.stat_1_label || "",
        stat_2_value: settings?.report?.stat_2_value || "",
        stat_2_label: settings?.report?.stat_2_label || "",
        stat_3_value: settings?.report?.stat_3_value || "",
        stat_3_label: settings?.report?.stat_3_label || "",
        stat_4_value: settings?.report?.stat_4_value || "",
        stat_4_label: settings?.report?.stat_4_label || "",
        stat_5_value: settings?.report?.stat_5_value || "",
        stat_5_label: settings?.report?.stat_5_label || "",
        stat_6_value: settings?.report?.stat_6_value || "",
        stat_6_label: settings?.report?.stat_6_label || "",
        stat_7_value: settings?.report?.stat_7_value || "",
        stat_7_label: settings?.report?.stat_7_label || "",
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post("/admin/about-me-page-settings/update-report", {
            preserveScroll: true,
            onSuccess: () => toast.success("Report settings updated successfully"),
        });
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SiteHeader />
                <Head title="About - Report & Statistics" />

                <div className="container mx-auto py-8 px-4 max-w-4xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-foreground">Report & Statistics Section</h1>
                        <p className="text-muted-foreground mt-2">Manage statistics and achievement report</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Description</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Label htmlFor="description">Report Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData("description", e.target.value)}
                                    rows={4}
                                    className="mt-1"
                                />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Statistics</CardTitle>
                                <CardDescription>Set values and labels for 7 statistics</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6">
                                    {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                                        <div key={num} className="space-y-2">
                                            <Label>Statistic {num}</Label>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <Label htmlFor={`stat_${num}_value`} className="text-sm text-muted-foreground">
                                                        Value
                                                    </Label>
                                                    <Input
                                                        id={`stat_${num}_value`}
                                                        placeholder="100+"
                                                        value={data[`stat_${num}_value` as keyof typeof data] as string}
                                                        onChange={(e) => setData(`stat_${num}_value` as any, e.target.value)}
                                                        className="mt-1"
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor={`stat_${num}_label`} className="text-sm text-muted-foreground">
                                                        Label
                                                    </Label>
                                                    <Input
                                                        id={`stat_${num}_label`}
                                                        placeholder="Projects Completed"
                                                        value={data[`stat_${num}_label` as keyof typeof data] as string}
                                                        onChange={(e) => setData(`stat_${num}_label` as any, e.target.value)}
                                                        className="mt-1"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
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
