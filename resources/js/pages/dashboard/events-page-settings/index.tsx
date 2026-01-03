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

interface EventsPageSetting {
    id: number;
    page_title: string | null;
    banner_title: string | null;
    banner_vector_image: string | null;
    banner_bottom_vector: string | null;
    activities_section_title: string | null;
    activities_section_description: string | null;
    activities_image_1: string | null;
    activities_image_2: string | null;
    activities_image_3: string | null;
    activities_image_4: string | null;
    events_section_title: string | null;
    year_filter_options: string[] | null;
    default_event_image_1: string | null;
    default_event_image_2: string | null;
    default_event_image_3: string | null;
    default_event_image_4: string | null;
    default_event_image_5: string | null;
}

interface Props {
    settings: EventsPageSetting;
}

export default function EventsPageSettings({ settings }: Props) {
    const [bannerVectorPreview, setBannerVectorPreview] = useState<string | null>(null);
    const [bottomVectorPreview, setBottomVectorPreview] = useState<string | null>(null);
    const [activitiesImage1Preview, setActivitiesImage1Preview] = useState<string | null>(null);
    const [activitiesImage2Preview, setActivitiesImage2Preview] = useState<string | null>(null);
    const [activitiesImage3Preview, setActivitiesImage3Preview] = useState<string | null>(null);
    const [activitiesImage4Preview, setActivitiesImage4Preview] = useState<string | null>(null);
    const [defaultEventImage1Preview, setDefaultEventImage1Preview] = useState<string | null>(null);
    const [defaultEventImage2Preview, setDefaultEventImage2Preview] = useState<string | null>(null);
    const [defaultEventImage3Preview, setDefaultEventImage3Preview] = useState<string | null>(null);
    const [defaultEventImage4Preview, setDefaultEventImage4Preview] = useState<string | null>(null);
    const [defaultEventImage5Preview, setDefaultEventImage5Preview] = useState<string | null>(null);
    const [savingSection, setSavingSection] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        page_title: settings?.page_title || "Events",
        banner_title: settings?.banner_title || "Active Events",
        banner_vector_image: null as File | null,
        banner_bottom_vector: null as File | null,
        activities_section_title: settings?.activities_section_title || "Last Events Activities",
        activities_section_description: settings?.activities_section_description || "Explore the highlights from my recent events and activities, where I've engaged with communities, shared insights, and collaborated on innovative projects. These moments capture the essence of networking, learning, and growth in the entrepreneurial and tech space, showcasing the dynamic experiences that shape my journey.",
        activities_image_1: null as File | null,
        activities_image_2: null as File | null,
        activities_image_3: null as File | null,
        activities_image_4: null as File | null,
        events_section_title: settings?.events_section_title || "Events",
        year_filter_options: settings?.year_filter_options || ["2024", "2023", "2022", "2021"],
        default_event_image_1: null as File | null,
        default_event_image_2: null as File | null,
        default_event_image_3: null as File | null,
        default_event_image_4: null as File | null,
        default_event_image_5: null as File | null,
    });

    const handleSubmit = (section: string) => (e: FormEvent) => {
        e.preventDefault();
        setSavingSection(section);
        post("/admin/events-page-settings/update", {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setBannerVectorPreview(null);
                setBottomVectorPreview(null);
                setActivitiesImage1Preview(null);
                setActivitiesImage2Preview(null);
                setActivitiesImage3Preview(null);
                setActivitiesImage4Preview(null);
                setDefaultEventImage1Preview(null);
                setDefaultEventImage2Preview(null);
                setDefaultEventImage3Preview(null);
                setDefaultEventImage4Preview(null);
                setDefaultEventImage4Preview(null);
                setDefaultEventImage5Preview(null);
                setSavingSection(null);
                toast.success("Events page settings updated successfully");
            },
            onError: (errors) => {
                console.error('Update errors:', errors);
                setSavingSection(null);
            }
        });
    };

    const handleBannerVectorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData("banner_vector_image", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setBannerVectorPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleBottomVectorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData("banner_bottom_vector", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setBottomVectorPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleActivitiesImage1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData("activities_image_1", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setActivitiesImage1Preview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleActivitiesImage2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData("activities_image_2", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setActivitiesImage2Preview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleActivitiesImage3Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData("activities_image_3", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setActivitiesImage3Preview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleActivitiesImage4Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData("activities_image_4", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setActivitiesImage4Preview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDefaultEventImage1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData("default_event_image_1", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setDefaultEventImage1Preview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDefaultEventImage2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData("default_event_image_2", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setDefaultEventImage2Preview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDefaultEventImage3Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData("default_event_image_3", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setDefaultEventImage3Preview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDefaultEventImage4Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData("default_event_image_4", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setDefaultEventImage4Preview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDefaultEventImage5Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData("default_event_image_5", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setDefaultEventImage5Preview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SiteHeader />
                <Head title="Events Page Settings" />

                <div className="container mx-auto py-8 px-4 max-w-4xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-foreground">
                            Events Page Settings
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Manage the content and styling displayed on the Events page
                        </p>
                    </div>

                    <form className="space-y-6">
                        {/* General Settings */}
                        {/* <Card>
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
                                        placeholder="Events"
                                        className="mt-1"
                                    />
                                    {errors.page_title && (
                                        <p className="text-destructive text-sm mt-1">{errors.page_title}</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card> */}

                        {/* Banner Settings */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Banner Settings</CardTitle>
                                <CardDescription>Configure the banner section content and background images</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="banner_title">Banner Title</Label>
                                    <Input
                                        id="banner_title"
                                        value={data.banner_title}
                                        onChange={(e) => setData("banner_title", e.target.value)}
                                        placeholder="Active Events"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="banner_vector_image">Banner Vector Image (Right Side)</Label>
                                    <Input
                                        id="banner_vector_image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleBannerVectorChange}
                                        className="mt-1"
                                    />
                                    {errors.banner_vector_image && (
                                        <p className="text-destructive text-sm mt-1">{errors.banner_vector_image}</p>
                                    )}
                                    {(bannerVectorPreview || settings?.banner_vector_image) && (
                                        <div className="mt-4 relative w-full h-48 bg-muted rounded-md overflow-hidden">
                                            <img
                                                src={bannerVectorPreview || settings.banner_vector_image || ""}
                                                alt="Banner Vector Preview"
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="banner_bottom_vector">Bottom Vector Image (Left Side)</Label>
                                    <Input
                                        id="banner_bottom_vector"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleBottomVectorChange}
                                        className="mt-1"
                                    />
                                    {errors.banner_bottom_vector && (
                                        <p className="text-destructive text-sm mt-1">{errors.banner_bottom_vector}</p>
                                    )}
                                    {(bottomVectorPreview || settings?.banner_bottom_vector) && (
                                        <div className="mt-4 relative w-full h-48 bg-muted rounded-md overflow-hidden">
                                            <img
                                                src={bottomVectorPreview || settings.banner_bottom_vector || ""}
                                                alt="Bottom Vector Preview"
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="flex justify-end pt-4">
                                    <Button
                                        type="button"
                                        onClick={handleSubmit('banner')}
                                        disabled={savingSection === 'banner'}
                                    >
                                        {savingSection === 'banner' ? "Saving..." : "Save Changes"}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Activities Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Activities Section</CardTitle>
                                <CardDescription>Configure the events activities section</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="activities_section_title">Section Title</Label>
                                    <Input
                                        id="activities_section_title"
                                        value={data.activities_section_title}
                                        onChange={(e) => setData("activities_section_title", e.target.value)}
                                        placeholder="Last Events Activities"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="activities_section_description">Section Description</Label>
                                    <Textarea
                                        id="activities_section_description"
                                        value={data.activities_section_description}
                                        onChange={(e) => setData("activities_section_description", e.target.value)}
                                        placeholder="Enter the activities section description..."
                                        rows={6}
                                        className="mt-1"
                                    />
                                </div>
                                <div className="flex justify-end pt-4">
                                    <Button
                                        type="button"
                                        onClick={handleSubmit('activities')}
                                        disabled={savingSection === 'activities'}
                                    >
                                        {savingSection === 'activities' ? "Saving..." : "Save Changes"}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Activities Images */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Activities Images</CardTitle>
                                <CardDescription>Upload images for the activities grid section (4 images)</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="activities_image_1">Image 1 (Large Top Left)</Label>
                                        <Input
                                            id="activities_image_1"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleActivitiesImage1Change}
                                            className="mt-1"
                                        />
                                        {(activitiesImage1Preview || settings?.activities_image_1) && (
                                            <div className="mt-4 relative w-full h-32 bg-muted rounded-md overflow-hidden">
                                                <img
                                                    src={activitiesImage1Preview || settings.activities_image_1 || ""}
                                                    alt="Activities Image 1 Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="activities_image_2">Image 2 (Small Top Right)</Label>
                                        <Input
                                            id="activities_image_2"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleActivitiesImage2Change}
                                            className="mt-1"
                                        />
                                        {(activitiesImage2Preview || settings?.activities_image_2) && (
                                            <div className="mt-4 relative w-full h-32 bg-muted rounded-md overflow-hidden">
                                                <img
                                                    src={activitiesImage2Preview || settings.activities_image_2 || ""}
                                                    alt="Activities Image 2 Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="activities_image_3">Image 3 (Small Bottom Left)</Label>
                                        <Input
                                            id="activities_image_3"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleActivitiesImage3Change}
                                            className="mt-1"
                                        />
                                        {(activitiesImage3Preview || settings?.activities_image_3) && (
                                            <div className="mt-4 relative w-full h-32 bg-muted rounded-md overflow-hidden">
                                                <img
                                                    src={activitiesImage3Preview || settings.activities_image_3 || ""}
                                                    alt="Activities Image 3 Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="activities_image_4">Image 4 (Large Bottom Right)</Label>
                                        <Input
                                            id="activities_image_4"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleActivitiesImage4Change}
                                            className="mt-1"
                                        />
                                        {(activitiesImage4Preview || settings?.activities_image_4) && (
                                            <div className="mt-4 relative w-full h-32 bg-muted rounded-md overflow-hidden">
                                                <img
                                                    src={activitiesImage4Preview || settings.activities_image_4 || ""}
                                                    alt="Activities Image 4 Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-end pt-4">
                                    <Button
                                        type="button"
                                        onClick={handleSubmit('activities_images')}
                                        disabled={savingSection === 'activities_images'}
                                    >
                                        {savingSection === 'activities_images' ? "Saving..." : "Save Changes"}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Events Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Events Section</CardTitle>
                                <CardDescription>Configure the all events section</CardDescription>
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
                                    <Label>Year Filter Options</Label>
                                    <div className="space-y-2 mt-2">
                                        {data.year_filter_options.map((year, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <Input
                                                    value={year}
                                                    onChange={(e) => {
                                                        const newYears = [...data.year_filter_options];
                                                        newYears[index] = e.target.value;
                                                        setData("year_filter_options", newYears);
                                                    }}
                                                    placeholder="2024"
                                                    className="flex-1"
                                                />
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => {
                                                        const newYears = data.year_filter_options.filter((_, i) => i !== index);
                                                        setData("year_filter_options", newYears);
                                                    }}
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                        ))}
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => {
                                                setData("year_filter_options", [
                                                    ...data.year_filter_options,
                                                    "",
                                                ]);
                                            }}
                                        >
                                            Add Year
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex justify-end pt-4">
                                    <Button
                                        type="button"
                                        onClick={handleSubmit('events')}
                                        disabled={savingSection === 'events'}
                                    >
                                        {savingSection === 'events' ? "Saving..." : "Save Changes"}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Default Event Images */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Default Event Images</CardTitle>
                                <CardDescription>Upload default images for the events carousel (5 images)</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {[1, 2, 3, 4, 5].map((num) => {
                                        const fieldName = `default_event_image_${num}` as keyof typeof data;
                                        const previewState = [
                                            defaultEventImage1Preview,
                                            defaultEventImage2Preview,
                                            defaultEventImage3Preview,
                                            defaultEventImage4Preview,
                                            defaultEventImage5Preview,
                                        ][num - 1];
                                        const currentImage = settings?.[`default_event_image_${num}` as keyof typeof settings] as string;
                                        const handler = [
                                            handleDefaultEventImage1Change,
                                            handleDefaultEventImage2Change,
                                            handleDefaultEventImage3Change,
                                            handleDefaultEventImage4Change,
                                            handleDefaultEventImage5Change,
                                        ][num - 1];

                                        return (
                                            <div key={num}>
                                                <Label htmlFor={fieldName}>Event Image {num}</Label>
                                                <Input
                                                    id={fieldName}
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handler}
                                                    className="mt-1"
                                                />
                                                {(previewState || currentImage) && (
                                                    <div className="mt-4 relative w-full h-32 bg-muted rounded-md overflow-hidden">
                                                        <img
                                                            src={previewState || currentImage || ""}
                                                            alt={`Default Event Image ${num} Preview`}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="flex justify-end pt-4">
                                    <Button
                                        type="button"
                                        onClick={handleSubmit('default_images')}
                                        disabled={savingSection === 'default_images'}
                                    >
                                        {savingSection === 'default_images' ? "Saving..." : "Save Changes"}
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
