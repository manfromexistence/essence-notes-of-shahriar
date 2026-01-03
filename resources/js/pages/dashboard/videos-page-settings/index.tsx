import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/site-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface VideoItem {
    id?: number;
    title: string;
    thumbnail: string;
    video_url: string;
    video_file?: File | null;
    use_file?: boolean;
}

interface VideosPageSetting {
    id: number;
    page_title: string | null;
    banner_title: string | null;
    banner_subtitle: string | null;
    banner_description: string | null;
    banner_image: string | null;
    all_videos_title: string | null;
    all_videos_description: string | null;
    short_videos_title: string | null;
    short_videos_description: string | null;
    banner_videos: VideoItem[] | null;
    all_videos: VideoItem[] | null;
    short_videos: VideoItem[] | null;
}

interface Props {
    settings: VideosPageSetting;
}

interface VideoItemFormProps {
    video: VideoItem;
    index: number;
    section: 'banner_videos' | 'all_videos' | 'short_videos';
    onUpdate: (section: 'banner_videos' | 'all_videos' | 'short_videos', index: number, field: keyof VideoItem, value: any) => void;
    onRemove: (section: 'banner_videos' | 'all_videos' | 'short_videos', index: number) => void;
}

const VideoItemForm = ({ video, index, section, onUpdate, onRemove }: VideoItemFormProps) => (
    <div className="border rounded-lg p-4 space-y-3">
        <div className="flex justify-between items-center">
            <h4 className="font-medium">Video {index + 1}</h4>
            <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => onRemove(section, index)}
            >
                Remove
            </Button>
        </div>
        <div>
            <Label>Title</Label>
            <Input
                value={video.title}
                onChange={(e) => onUpdate(section, index, 'title', e.target.value)}
                placeholder="Video title"
            />
        </div>
        <div>
            <Label>Thumbnail URL</Label>
            <Input
                value={video.thumbnail}
                onChange={(e) => onUpdate(section, index, 'thumbnail', e.target.value)}
                placeholder="https://example.com/thumbnail.jpg"
            />
        </div>

        <div className="space-y-2">
            <Label>Video Source</Label>
            <Tabs defaultValue={video.use_file ? "upload" : "url"} onValueChange={(val: string) => onUpdate(section, index, 'use_file', val === "upload")}>
                <TabsList>
                    <TabsTrigger value="url">Video URL</TabsTrigger>
                    <TabsTrigger value="upload">Upload Video</TabsTrigger>
                </TabsList>
                <TabsContent value="url">
                    <Input
                        value={video.video_url}
                        onChange={(e) => onUpdate(section, index, 'video_url', e.target.value)}
                        placeholder="https://www.youtube.com/embed/..."
                    />
                </TabsContent>
                <TabsContent value="upload">
                    <Input
                        type="file"
                        accept="video/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                onUpdate(section, index, 'video_file', file);
                            }
                        }}
                    />
                    {video.video_url && video.video_url.startsWith('/storage/') && (
                        <p className="text-sm text-muted-foreground mt-1">Current file: {video.video_url.split('/').pop()}</p>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    </div>
);

export default function VideosPageSettings({ settings }: Props) {
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        page_title: settings?.page_title || "Videos",
        banner_title: settings?.banner_title || "Videos",
        banner_subtitle: settings?.banner_subtitle || "Explore our collection of videos showcasing inspiring stories and valuable content.",
        banner_description: settings?.banner_description || "Discover a curated selection of videos that capture moments, share knowledge, and inspire action. From personal stories to educational content, our video library offers something for everyone.",
        banner_image: null as File | null,
        all_videos_title: settings?.all_videos_title || "All Videos",
        all_videos_description: settings?.all_videos_description || "Browse through our complete collection of videos covering various topics and themes.",
        short_videos_title: settings?.short_videos_title || "Short Videos",
        short_videos_description: settings?.short_videos_description || "Quick and engaging short-form videos for bite-sized inspiration and learning.",
        banner_videos: (settings?.banner_videos || [
            { title: "Featured Video 1", thumbnail: "/assets/videos/video_thumbline.png", video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "Featured Video 2", thumbnail: "/assets/videos/video_thumbline.png", video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { title: "Featured Video 3", thumbnail: "/assets/videos/video_thumbline.png", video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
        ]).map(v => ({ ...v, use_file: false, video_file: null })) as VideoItem[],
        all_videos: (settings?.all_videos || []).map(v => ({ ...v, use_file: false, video_file: null })) as VideoItem[],
        short_videos: (settings?.short_videos || []).map(v => ({ ...v, use_file: false, video_file: null })) as VideoItem[],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/admin/videos-page-settings/update", {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setBannerPreview(null);
                toast.success("Videos page settings updated successfully");
            },
            onError: (errors: any) => {
                console.error('Update errors:', errors);
            }
        });
    };

    const updateVideoArray = (section: 'banner_videos' | 'all_videos' | 'short_videos', index: number, field: keyof VideoItem, value: any) => {
        const updated = [...data[section]];
        updated[index] = { ...updated[index], [field]: value };
        setData(section, updated);
    };

    const addVideo = (section: 'banner_videos' | 'all_videos' | 'short_videos') => {
        const newVideo: VideoItem = { title: "", thumbnail: "", video_url: "", use_file: false, video_file: null };
        setData(section, [...data[section], newVideo]);
    };

    const removeVideo = (section: 'banner_videos' | 'all_videos' | 'short_videos', index: number) => {
        const updated = data[section].filter((_: VideoItem, i: number) => i !== index);
        setData(section, updated);
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SiteHeader />
                <Head title="Videos Page Settings" />

                <div className="container mx-auto py-8 px-4 max-w-4xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-foreground">
                            Videos Page Settings
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Manage the content and styling displayed on the Videos page
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* General Settings */}
                        <Card>
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
                                        placeholder="Videos"
                                        className="mt-1"
                                    />
                                    {errors.page_title && (
                                        <p className="text-destructive text-sm mt-1">{errors.page_title}</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Banner Settings */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Banner Settings</CardTitle>
                                <CardDescription>Configure the banner section content</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="banner_title">Banner Title</Label>
                                    <Input
                                        id="banner_title"
                                        value={data.banner_title}
                                        onChange={(e) => setData("banner_title", e.target.value)}
                                        placeholder="Videos"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="banner_subtitle">Banner Subtitle</Label>
                                    <Textarea
                                        id="banner_subtitle"
                                        value={data.banner_subtitle}
                                        onChange={(e) => setData("banner_subtitle", e.target.value)}
                                        placeholder="Enter banner subtitle..."
                                        rows={3}
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="banner_image">Banner Image</Label>
                                    <Input
                                        id="banner_image"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setData("banner_image", file);
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    setBannerPreview(reader.result as string);
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        className="mt-1"
                                    />
                                    {errors.banner_image && (
                                        <p className="text-destructive text-sm mt-1">{errors.banner_image}</p>
                                    )}
                                    {(bannerPreview || settings?.banner_image) && (
                                        <div className="mt-4 relative w-full h-48 bg-muted rounded-md overflow-hidden">
                                            <img
                                                src={bannerPreview || settings.banner_image || ""}
                                                alt="Banner Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="banner_description">Banner Description</Label>
                                    <Textarea
                                        id="banner_description"
                                        value={data.banner_description}
                                        onChange={(e) => setData("banner_description", e.target.value)}
                                        placeholder="Enter banner description..."
                                        rows={4}
                                        className="mt-1"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Banner Videos */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Banner Videos</CardTitle>
                                <CardDescription>Configure the featured videos in the banner</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {data.banner_videos.map((video: VideoItem, index: number) => (
                                    <VideoItemForm
                                        key={index}
                                        video={video}
                                        index={index}
                                        section="banner_videos"
                                        onUpdate={updateVideoArray}
                                        onRemove={removeVideo}
                                    />
                                ))}
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => addVideo('banner_videos')}
                                >
                                    Add Banner Video
                                </Button>
                            </CardContent>
                        </Card>

                        {/* All Videos Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle>All Videos Section</CardTitle>
                                <CardDescription>Configure the all videos section</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="all_videos_title">Section Title</Label>
                                    <Input
                                        id="all_videos_title"
                                        value={data.all_videos_title}
                                        onChange={(e) => setData("all_videos_title", e.target.value)}
                                        placeholder="All Videos"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="all_videos_description">Section Description</Label>
                                    <Textarea
                                        id="all_videos_description"
                                        value={data.all_videos_description}
                                        onChange={(e) => setData("all_videos_description", e.target.value)}
                                        placeholder="Enter all videos description..."
                                        rows={4}
                                        className="mt-1"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <h4 className="font-medium">Custom Videos (leave empty to use database videos)</h4>
                                    {data.all_videos.map((video: VideoItem, index: number) => (
                                        <VideoItemForm
                                            key={index}
                                            video={video}
                                            index={index}
                                            section="all_videos"
                                            onUpdate={updateVideoArray}
                                            onRemove={removeVideo}
                                        />
                                    ))}
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => addVideo('all_videos')}
                                    >
                                        Add Video
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Short Videos Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Short Videos Section</CardTitle>
                                <CardDescription>Configure the short videos section</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="short_videos_title">Section Title</Label>
                                    <Input
                                        id="short_videos_title"
                                        value={data.short_videos_title}
                                        onChange={(e) => setData("short_videos_title", e.target.value)}
                                        placeholder="Short Videos"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="short_videos_description">Section Description</Label>
                                    <Textarea
                                        id="short_videos_description"
                                        value={data.short_videos_description}
                                        onChange={(e) => setData("short_videos_description", e.target.value)}
                                        placeholder="Enter short videos description..."
                                        rows={4}
                                        className="mt-1"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <h4 className="font-medium">Custom Short Videos (leave empty to use database videos)</h4>
                                    {data.short_videos.map((video: VideoItem, index: number) => (
                                        <VideoItemForm
                                            key={index}
                                            video={video}
                                            index={index}
                                            section="short_videos"
                                            onUpdate={updateVideoArray}
                                            onRemove={removeVideo}
                                        />
                                    ))}
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => addVideo('short_videos')}
                                    >
                                        Add Short Video
                                    </Button>
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
