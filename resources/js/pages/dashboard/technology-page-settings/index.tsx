import { FormEvent, useState } from "react";
import { Head, useForm, router, Link } from "@inertiajs/react";
import { toast } from "sonner";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CharacterLimitedInput } from "@/components/ui/character-limited-input";
import { CharacterLimitedTextarea } from "@/components/ui/character-limited-textarea";
import { Award, ExternalLink, Plus, Pencil, Trash2 } from "lucide-react";
import { AndroidIcon } from "../../../svgs/androidIcon";
import { CursorLight } from "../../../svgs/cursorLight";
import { GithubLight } from "../../../svgs/githubLight";
import { NextjsLogoLight } from "../../../svgs/nextjsLogoLight";
import { ReactLight } from "../../../svgs/reactLight";
import { Vercel } from "../../../svgs/vercel";

// Character limits
const LIMITS = {
    banner_title: 200,
    banner_subtitle: 500,
    banner_description: 1000,
    cybersecurity_title: 200,
    cybersecurity_description: 1000,
    cybersecurity_additional_description: 1500,
    contribution_title: 200,
    contribution_description: 2000,
    tools_title: 200,
    tools_description: 1000,
    certificates_title: 200,
    certificates_description: 1000,
    blogs_title: 200,
    section_title: 200,
    section_description: 1000,
};

const TailwindCSS = (props: any) => (
    <svg {...props} fill="none" viewBox="0 0 54 33">
        <g clipPath="url(#tailwindcss__a)">
            <path
                fill="#38bdf8"
                fillRule="evenodd"
                d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"
                clipRule="evenodd"
            />
        </g>
    </svg>
);

const GoogleCloud = (props: any) => (
    <svg {...props} preserveAspectRatio="xMidYMid" viewBox="0 -25 256 256">
        <path
            fill="#EA4335"
            d="m170.252 56.819 22.253-22.253 1.483-9.37C153.437-11.677 88.976-7.496 52.42 33.92 42.267 45.423 34.734 59.764 30.717 74.573l7.97-1.123 44.505-7.34 3.436-3.513c19.797-21.742 53.27-24.667 76.128-6.168l7.496.39Z"
        />
        <path
            fill="#4285F4"
            d="M224.205 73.918a100.249 100.249 0 0 0-30.217-48.722l-31.232 31.232a55.515 55.515 0 0 1 20.379 44.037v5.544c15.35 0 27.797 12.445 27.797 27.796 0 15.352-12.446 27.485-27.797 27.485h-55.671l-5.466 5.934v33.34l5.466 5.231h55.67c39.93.311 72.553-31.494 72.864-71.424a72.303 72.303 0 0 0-31.793-60.453"
        />
        <path
            fill="#34A853"
            d="M71.87 205.796h55.593V161.29H71.87a27.275 27.275 0 0 1-11.399-2.498l-7.887 2.42-22.409 22.253-1.952 7.574c12.567 9.489 27.9 14.825 43.647 14.757"
        />
        <path
            fill="#FBBC05"
            d="M71.87 61.425C31.94 61.664-.237 94.228.001 134.159a72.301 72.301 0 0 0 28.222 56.88l32.248-32.246c-13.99-6.322-20.208-22.786-13.887-36.776 6.32-13.99 22.786-20.208 36.775-13.888a27.796 27.796 0 0 1 13.887 13.888l32.248-32.248A72.224 72.224 0 0 0 71.87 61.425"
        />
    </svg>
);

const Laravel = (props: any) => (
    <svg {...props} preserveAspectRatio="xMidYMid" viewBox="0 0 256 264">
        <path
            d="m255.9 59.6.1 1.1v56.6c0 1.4-.8 2.8-2 3.5l-47.6 27.4v54.2c0 1.4-.7 2.8-2 3.5l-99.1 57-.7.4-.3.1c-.7.2-1.4.2-2.1 0l-.4-.1-.6-.3L2 206c-1.3-.8-2.1-2.2-2.1-3.6V32.7l.1-1.1.2-.4.3-.6.2-.4.4-.5.4-.3c.2 0 .3-.2.5-.3L51.6.6c1.3-.8 2.9-.8 4.1 0L105.3 29c.2 0 .3.2.4.3l.5.3c0 .2.2.4.3.5l.3.4.3.6.1.4.2 1v106l41.2-23.7V60.7c0-.4 0-.7.2-1l.1-.4.3-.7.3-.3.3-.5.5-.3.4-.4 49.6-28.5c1.2-.7 2.8-.7 4 0L254 57l.5.4.4.3.4.5.2.3c.2.2.2.5.3.7l.2.3Zm-8.2 55.3v-47l-17.3 10-24 13.7v47l41.3-23.7Zm-49.5 85v-47l-23.6 13.5-67.2 38.4v47.5l90.8-52.3ZM8.2 39.9V200l90.9 52.3v-47.5l-47.5-26.9-.4-.4c-.2 0-.3-.1-.4-.3l-.4-.4-.3-.4-.2-.5-.2-.5v-.6l-.2-.5V63.6L25.6 49.8l-17.3-10Zm45.5-31L12.4 32.8l41.3 23.7 41.2-23.7L53.7 8.9ZM75 157.3l24-13.8V39.8l-17.3 10-24 13.8v103.6l17.3-10ZM202.3 36.9 161 60.7l41.3 23.8 41.3-23.8-41.3-23.8Zm-4.1 54.7-24-13.8-17.3-10v47l24 13.9 17.3 10v-47Zm-95 106 60.6-34.5 30.2-17.3-41.2-23.8-47.5 27.4L62 174.3l41.2 23.3Z"
            fill="#FF2D20"
        />
    </svg>
);

interface TechnologyPageSetting {
    id: number;
    page_title: string | null;
    banner_title: string | null;
    banner_subtitle: string | null;
    banner_image: string | null;
    banner_description: string | null;
    cybersecurity_title: string | null;
    cybersecurity_description: string | null;
    cybersecurity_additional_description: string | null;
    cybersecurity_image: string | null;
    contribution_title: string | null;
    contribution_description: string | null;
    contribution_image: string | null;
    tools_title: string | null;
    tools_description: string | null;
    certificates_title: string | null;
    certificates_description: string | null;
    blogs_title: string | null;
    section_title: string | null;
    section_description: string | null;
    android_icon_svg: string | null;
    cursor_icon_svg: string | null;
    github_icon_svg: string | null;
    nextjs_icon_svg: string | null;
    tailwind_icon_svg: string | null;
    react_icon_svg: string | null;
    vercel_icon_svg: string | null;
    laravel_icon_svg: string | null;
    google_cloud_icon_svg: string | null;
}

interface Certificate {
    id: number;
    name: string;
    issuing_organization: string;
    issue_date: string;
    expiry_date: string | null;
    credential_id: string;
    image: string | null;
    order: number;
}

interface Props {
    settings: TechnologyPageSetting;
    certificates: Certificate[];
}

export default function TechnologyPageSettings({ settings, certificates = [] }: Props) {
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);
    const [cybersecurityPreview, setCybersecurityPreview] = useState<string | null>(null);
    const [contributionPreview, setContributionPreview] = useState<string | null>(null);
    const [androidIconPreview, setAndroidIconPreview] = useState<string | null>(null);
    const [cursorIconPreview, setCursorIconPreview] = useState<string | null>(null);
    const [githubIconPreview, setGithubIconPreview] = useState<string | null>(null);
    const [nextjsIconPreview, setNextjsIconPreview] = useState<string | null>(null);
    const [tailwindIconPreview, setTailwindIconPreview] = useState<string | null>(null);
    const [reactIconPreview, setReactIconPreview] = useState<string | null>(null);
    const [vercelIconPreview, setVercelIconPreview] = useState<string | null>(null);
    const [laravelIconPreview, setLaravelIconPreview] = useState<string | null>(null);
    const [googleCloudIconPreview, setGoogleCloudIconPreview] = useState<string | null>(null);
    const [savingSection, setSavingSection] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        page_title: settings?.page_title || "Technology",
        banner_title: settings?.banner_title || "Technology",
        banner_subtitle: settings?.banner_subtitle || '"I stay updated with the latest technology trends, focusing on emerging fields like AI-driven design, cloud-based collaboration tools, and responsive design for diverse devices."',
        banner_image: null as File | null,
        banner_description: settings?.banner_description || "Living an extraordinary life means shaping it on your terms, filled with deep meaning and significant impact. Fueled by the quest for excellence and a strong sense of purpose, Shahriar Khan has motivated millions to dream boldly and strive for greater heights.",
        cybersecurity_title: settings?.cybersecurity_title || "Cyber security skills",
        cybersecurity_description: settings?.cybersecurity_description || "Cybersecurity is a critical component of modern business operations. Shahriar Khan has extensive experience in implementing robust security measures, conducting risk assessments, and developing strategies to protect digital assets.",
        cybersecurity_additional_description: settings?.cybersecurity_additional_description || "His expertise includes network security, data protection, compliance frameworks, and incident response planning. Through Nexkraft LTD, he has helped numerous organizations strengthen their cybersecurity posture and navigate the evolving threat landscape.",
        cybersecurity_image: null as File | null,
        contribution_title: settings?.contribution_title || "Contribution to the field of technology",
        contribution_description: settings?.contribution_description || "Shahriar Khan has made significant contributions to the field of technology through innovative solutions and leadership in digital transformation.",
        contribution_image: null as File | null,
        tools_title: settings?.tools_title || "Tools and software skills",
        tools_description: settings?.tools_description || "Shahriar Khan is proficient in various technology tools and platforms essential for modern software development and system administration.",
        certificates_title: settings?.certificates_title || "Certificates",
        certificates_description: settings?.certificates_description || "Shahriar Khan holds various professional certifications in technology, cybersecurity, and business management.",
        blogs_title: settings?.blogs_title || "All Blog",
        section_title: settings?.section_title || "Tech Stack & Expertise",
        section_description: settings?.section_description || "Exploring cutting-edge technologies and their impact on business and society.",
        android_icon_svg: null as File | null,
        cursor_icon_svg: null as File | null,
        github_icon_svg: null as File | null,
        nextjs_icon_svg: null as File | null,
        tailwind_icon_svg: null as File | null,
        react_icon_svg: null as File | null,
        vercel_icon_svg: null as File | null,
        laravel_icon_svg: null as File | null,
        google_cloud_icon_svg: null as File | null,
    });

    // Real-time validation errors based on current data
    const getValidationErrors = () => {
        const errors: Record<string, string> = {};

        if ((data.banner_title || "").length > LIMITS.banner_title) {
            errors.banner_title = `Banner title must be ${LIMITS.banner_title} characters or less`;
        }
        if ((data.banner_subtitle || "").length > LIMITS.banner_subtitle) {
            errors.banner_subtitle = `Banner subtitle must be ${LIMITS.banner_subtitle} characters or less`;
        }
        if ((data.banner_description || "").length > LIMITS.banner_description) {
            errors.banner_description = `Banner description must be ${LIMITS.banner_description} characters or less`;
        }
        if ((data.cybersecurity_title || "").length > LIMITS.cybersecurity_title) {
            errors.cybersecurity_title = `Title must be ${LIMITS.cybersecurity_title} characters or less`;
        }
        if ((data.cybersecurity_description || "").length > LIMITS.cybersecurity_description) {
            errors.cybersecurity_description = `Description must be ${LIMITS.cybersecurity_description} characters or less`;
        }
        if ((data.cybersecurity_additional_description || "").length > LIMITS.cybersecurity_additional_description) {
            errors.cybersecurity_additional_description = `Additional description must be ${LIMITS.cybersecurity_additional_description} characters or less`;
        }
        if ((data.contribution_title || "").length > LIMITS.contribution_title) {
            errors.contribution_title = `Title must be ${LIMITS.contribution_title} characters or less`;
        }
        if ((data.contribution_description || "").length > LIMITS.contribution_description) {
            errors.contribution_description = `Description must be ${LIMITS.contribution_description} characters or less`;
        }
        if ((data.tools_title || "").length > LIMITS.tools_title) {
            errors.tools_title = `Title must be ${LIMITS.tools_title} characters or less`;
        }
        if ((data.tools_description || "").length > LIMITS.tools_description) {
            errors.tools_description = `Description must be ${LIMITS.tools_description} characters or less`;
        }
        if ((data.certificates_title || "").length > LIMITS.certificates_title) {
            errors.certificates_title = `Title must be ${LIMITS.certificates_title} characters or less`;
        }
        if ((data.certificates_description || "").length > LIMITS.certificates_description) {
            errors.certificates_description = `Description must be ${LIMITS.certificates_description} characters or less`;
        }
        if ((data.section_title || "").length > LIMITS.section_title) {
            errors.section_title = `Title must be ${LIMITS.section_title} characters or less`;
        }
        if ((data.section_description || "").length > LIMITS.section_description) {
            errors.section_description = `Description must be ${LIMITS.section_description} characters or less`;
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
        post("/admin/technology-page-settings/update", {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setBannerPreview(null);
                setCybersecurityPreview(null);
                setContributionPreview(null);
                setAndroidIconPreview(null);
                setCursorIconPreview(null);
                setGithubIconPreview(null);
                setNextjsIconPreview(null);
                setTailwindIconPreview(null);
                setReactIconPreview(null);
                setVercelIconPreview(null);
                setLaravelIconPreview(null);
                setLaravelIconPreview(null);
                setGoogleCloudIconPreview(null);
                setSavingSection(null);
                toast.success("Technology page settings updated successfully");
            },
            onError: (errors) => {
                console.error('Update errors:', errors);
                setSavingSection(null);
            }
        });
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SiteHeader />
                <Head title="Technology Page Settings" />

                <div className="container mx-auto py-8 px-4 max-w-4xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-foreground">
                            Technology Page Settings
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Manage the content and styling displayed on the Technology page
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
                                        placeholder="Technology"
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
                                <CardDescription>Configure the banner section content</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="banner_title">Banner Title</Label>
                                    <CharacterLimitedInput
                                        id="banner_title"
                                        value={data.banner_title}
                                        onChange={(e) => setData("banner_title", e.target.value)}
                                        maxLength={LIMITS.banner_title}
                                        placeholder="Technology"
                                        className="mt-1"
                                        error={validationErrors.banner_title}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="banner_subtitle">Banner Subtitle</Label>
                                    <CharacterLimitedTextarea
                                        id="banner_subtitle"
                                        value={data.banner_subtitle}
                                        onChange={(e) => setData("banner_subtitle", e.target.value)}
                                        maxLength={LIMITS.banner_subtitle}
                                        placeholder="Enter banner subtitle..."
                                        rows={3}
                                        className="mt-1"
                                        error={validationErrors.banner_subtitle}
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
                                    <CharacterLimitedTextarea
                                        id="banner_description"
                                        value={data.banner_description}
                                        onChange={(e) => setData("banner_description", e.target.value)}
                                        maxLength={LIMITS.banner_description}
                                        placeholder="Enter banner description..."
                                        rows={4}
                                        className="mt-1"
                                        error={validationErrors.banner_description}
                                    />
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

                        {/* Cybersecurity Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Cybersecurity Section</CardTitle>
                                <CardDescription>Configure the cybersecurity section</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="cybersecurity_title">Section Title</Label>
                                    <CharacterLimitedInput
                                        id="cybersecurity_title"
                                        value={data.cybersecurity_title}
                                        onChange={(e) => setData("cybersecurity_title", e.target.value)}
                                        maxLength={LIMITS.cybersecurity_title}
                                        placeholder="Cyber security skills"
                                        className="mt-1"
                                        error={validationErrors.cybersecurity_title}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="cybersecurity_description">Section Description</Label>
                                    <CharacterLimitedTextarea
                                        id="cybersecurity_description"
                                        value={data.cybersecurity_description}
                                        onChange={(e) => setData("cybersecurity_description", e.target.value)}
                                        maxLength={LIMITS.cybersecurity_description}
                                        placeholder="Enter cybersecurity description..."
                                        rows={4}
                                        className="mt-1"
                                        error={validationErrors.cybersecurity_description}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="cybersecurity_additional_description">Additional Description</Label>
                                    <CharacterLimitedTextarea
                                        id="cybersecurity_additional_description"
                                        value={data.cybersecurity_additional_description}
                                        onChange={(e) => setData("cybersecurity_additional_description", e.target.value)}
                                        maxLength={LIMITS.cybersecurity_additional_description}
                                        placeholder="Enter additional cybersecurity description..."
                                        rows={3}
                                        className="mt-1"
                                        error={validationErrors.cybersecurity_additional_description}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="cybersecurity_image">Section Image</Label>
                                    <Input
                                        id="cybersecurity_image"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setData("cybersecurity_image", file);
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    setCybersecurityPreview(reader.result as string);
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        className="mt-1"
                                    />
                                    {(cybersecurityPreview || settings?.cybersecurity_image) && (
                                        <div className="mt-4 relative w-full h-48 bg-muted rounded-md overflow-hidden">
                                            <img
                                                src={cybersecurityPreview || settings.cybersecurity_image || ""}
                                                alt="Cybersecurity Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="flex justify-end pt-4">
                                    <Button
                                        type="button"
                                        onClick={handleSubmit('cybersecurity')}
                                        disabled={savingSection === 'cybersecurity' || hasErrors}
                                    >
                                        {savingSection === 'cybersecurity' ? "Saving..." : hasErrors ? "Fix Errors to Save" : "Save Changes"}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contribution Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Contribution Section</CardTitle>
                                <CardDescription>Configure the technology contribution section</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="contribution_title">Section Title</Label>
                                    <CharacterLimitedInput
                                        id="contribution_title"
                                        value={data.contribution_title}
                                        onChange={(e) => setData("contribution_title", e.target.value)}
                                        maxLength={LIMITS.contribution_title}
                                        placeholder="Contribution to the field of technology"
                                        className="mt-1"
                                        error={validationErrors.contribution_title}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="contribution_description">Section Description</Label>
                                    <CharacterLimitedTextarea
                                        id="contribution_description"
                                        value={data.contribution_description}
                                        onChange={(e) => setData("contribution_description", e.target.value)}
                                        maxLength={LIMITS.contribution_description}
                                        placeholder="Enter contribution description..."
                                        rows={6}
                                        className="mt-1"
                                        error={validationErrors.contribution_description}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="contribution_image">Section Image</Label>
                                    <Input
                                        id="contribution_image"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setData("contribution_image", file);
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    setContributionPreview(reader.result as string);
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        className="mt-1"
                                    />
                                    {(contributionPreview || settings?.contribution_image) && (
                                        <div className="mt-4 relative w-full h-48 bg-muted rounded-md overflow-hidden">
                                            <img
                                                src={contributionPreview || settings.contribution_image || ""}
                                                alt="Contribution Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="flex justify-end pt-4">
                                    <Button
                                        type="button"
                                        onClick={handleSubmit('contribution')}
                                        disabled={savingSection === 'contribution' || hasErrors}
                                    >
                                        {savingSection === 'contribution' ? "Saving..." : hasErrors ? "Fix Errors to Save" : "Save Changes"}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Tools Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Tools Section</CardTitle>
                                <CardDescription>Configure the tools and software skills section</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="tools_title">Section Title</Label>
                                    <CharacterLimitedInput
                                        id="tools_title"
                                        value={data.tools_title}
                                        onChange={(e) => setData("tools_title", e.target.value)}
                                        maxLength={LIMITS.tools_title}
                                        placeholder="Tools and software skills"
                                        className="mt-1"
                                        error={validationErrors.tools_title}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="tools_description">Section Description</Label>
                                    <CharacterLimitedTextarea
                                        id="tools_description"
                                        value={data.tools_description}
                                        onChange={(e) => setData("tools_description", e.target.value)}
                                        maxLength={LIMITS.tools_description}
                                        placeholder="Enter tools description..."
                                        rows={4}
                                        className="mt-1"
                                        error={validationErrors.tools_description}
                                    />
                                </div>
                                <div className="flex justify-end pt-4">
                                    <Button
                                        type="button"
                                        onClick={handleSubmit('tools')}
                                        disabled={savingSection === 'tools' || hasErrors}
                                    >
                                        {savingSection === 'tools' ? "Saving..." : hasErrors ? "Fix Errors to Save" : "Save Changes"}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Certificates Section */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle>Certificates Section</CardTitle>
                                    <CardDescription>Configure the certificates section and manage certificates</CardDescription>
                                </div>
                                <Link href="/admin/certificates/create">
                                    <Button size="sm">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Certificate
                                    </Button>
                                </Link>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Section Title & Description */}
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="certificates_title">Section Title</Label>
                                        <CharacterLimitedInput
                                            id="certificates_title"
                                            value={data.certificates_title}
                                            onChange={(e) => setData("certificates_title", e.target.value)}
                                            maxLength={LIMITS.certificates_title}
                                            placeholder="Certificates"
                                            className="mt-1"
                                            error={validationErrors.certificates_title}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="certificates_description">Section Description</Label>
                                        <CharacterLimitedTextarea
                                            id="certificates_description"
                                            value={data.certificates_description}
                                            onChange={(e) => setData("certificates_description", e.target.value)}
                                            maxLength={LIMITS.certificates_description}
                                            placeholder="Enter certificates description..."
                                            rows={3}
                                            className="mt-1"
                                            error={validationErrors.certificates_description}
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        <Button
                                            type="button"
                                            onClick={handleSubmit('certificates')}
                                            disabled={savingSection === 'certificates' || hasErrors}
                                        >
                                            {savingSection === 'certificates' ? "Saving..." : hasErrors ? "Fix Errors to Save" : "Save Section Settings"}
                                        </Button>
                                    </div>
                                </div>

                                {/* Certificates List */}
                                <div className="border-t pt-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-sm font-medium flex items-center gap-2">
                                            <Award className="h-4 w-4" />
                                            Certificates ({certificates.length})
                                        </h4>
                                        <Link href="/admin/certificates">
                                            <Button variant="outline" size="sm">
                                                <ExternalLink className="mr-2 h-4 w-4" />
                                                Manage All
                                            </Button>
                                        </Link>
                                    </div>

                                    {certificates.length === 0 ? (
                                        <div className="text-center py-8 bg-muted/50 rounded-lg">
                                            <Award className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                                            <p className="text-muted-foreground mb-4">No certificates added yet</p>
                                            <Link href="/admin/certificates/create">
                                                <Button variant="outline" size="sm">
                                                    <Plus className="mr-2 h-4 w-4" />
                                                    Add Your First Certificate
                                                </Button>
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {certificates.slice(0, 6).map((cert) => (
                                                <div key={cert.id} className="group relative bg-muted/50 rounded-lg p-4 hover:bg-muted transition-colors">
                                                    <div className="flex items-start gap-3">
                                                        {cert.image ? (
                                                            <img
                                                                src={cert.image}
                                                                alt={cert.name}
                                                                className="w-12 h-12 rounded object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center">
                                                                <Award className="h-6 w-6 text-primary" />
                                                            </div>
                                                        )}
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-medium text-sm truncate">{cert.name}</p>
                                                            <p className="text-xs text-muted-foreground truncate">{cert.issuing_organization}</p>
                                                            <p className="text-xs text-muted-foreground mt-1">
                                                                {new Date(cert.issue_date).toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                                        <Link href={`/admin/certificates/${cert.id}/edit`}>
                                                            <Button variant="ghost" size="icon" className="h-7 w-7">
                                                                <Pencil className="h-3 w-3" />
                                                            </Button>
                                                        </Link>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-7 w-7 text-destructive hover:text-destructive"
                                                            onClick={() => {
                                                                if (confirm('Are you sure you want to delete this certificate?')) {
                                                                    router.delete(`/admin/certificates/${cert.id}`, {
                                                                        onSuccess: () => toast.success('Certificate deleted successfully'),
                                                                    });
                                                                }
                                                            }}
                                                        >
                                                            <Trash2 className="h-3 w-3" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {certificates.length > 6 && (
                                        <div className="text-center mt-4">
                                            <Link href="/admin/certificates">
                                                <Button variant="link" size="sm">
                                                    View all {certificates.length} certificates →
                                                </Button>
                                            </Link>
                                        </div>
                                    )}
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
                                    <Label htmlFor="blogs_title">Section Title</Label>
                                    <CharacterLimitedInput
                                        id="blogs_title"
                                        value={data.blogs_title}
                                        onChange={(e) => setData("blogs_title", e.target.value)}
                                        maxLength={LIMITS.blogs_title}
                                        placeholder="All Blog"
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

                        {/* Technology Icons Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Technology Icons</CardTitle>
                                <CardDescription>Manage SVG icons for technology skills</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Current Icons Preview */}
                                <div>
                                    <h4 className="text-sm font-medium mb-3">Current Icons Preview</h4>
                                    <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-4 p-4 bg-muted/50 rounded-lg">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-12 h-12 bg-background border rounded flex items-center justify-center">
                                                {settings?.android_icon_svg ? (
                                                    <img src={settings.android_icon_svg} alt="Android" className="w-8 h-8" />
                                                ) : (
                                                    <AndroidIcon className="w-8 h-8" />
                                                )}
                                            </div>
                                            <span className="text-xs text-muted-foreground">Android</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-12 h-12 bg-background border rounded flex items-center justify-center">
                                                {settings?.cursor_icon_svg ? (
                                                    <img src={settings.cursor_icon_svg} alt="Cursor" className="w-8 h-8" />
                                                ) : (
                                                    <CursorLight className="w-8 h-8" />
                                                )}
                                            </div>
                                            <span className="text-xs text-muted-foreground">Cursor</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-12 h-12 bg-background border rounded flex items-center justify-center">
                                                {settings?.github_icon_svg ? (
                                                    <img src={settings.github_icon_svg} alt="GitHub" className="w-8 h-8" />
                                                ) : (
                                                    <GithubLight className="w-8 h-8" />
                                                )}
                                            </div>
                                            <span className="text-xs text-muted-foreground">GitHub</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-12 h-12 bg-background border rounded flex items-center justify-center">
                                                {settings?.nextjs_icon_svg ? (
                                                    <img src={settings.nextjs_icon_svg} alt="Next.js" className="w-8 h-8" />
                                                ) : (
                                                    <NextjsLogoLight className="w-8 h-8" />
                                                )}
                                            </div>
                                            <span className="text-xs text-muted-foreground">Next.js</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-12 h-12 bg-background border rounded flex items-center justify-center">
                                                {settings?.tailwind_icon_svg ? (
                                                    <img src={settings.tailwind_icon_svg} alt="Tailwind" className="w-8 h-8" />
                                                ) : (
                                                    <TailwindCSS className="w-8 h-8" />
                                                )}
                                            </div>
                                            <span className="text-xs text-muted-foreground">Tailwind</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-12 h-12 bg-background border rounded flex items-center justify-center">
                                                {settings?.react_icon_svg ? (
                                                    <img src={settings.react_icon_svg} alt="React" className="w-8 h-8" />
                                                ) : (
                                                    <ReactLight className="w-8 h-8" />
                                                )}
                                            </div>
                                            <span className="text-xs text-muted-foreground">React</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-12 h-12 bg-background border rounded flex items-center justify-center">
                                                {settings?.vercel_icon_svg ? (
                                                    <img src={settings.vercel_icon_svg} alt="Vercel" className="w-8 h-8" />
                                                ) : (
                                                    <Vercel className="w-8 h-8" />
                                                )}
                                            </div>
                                            <span className="text-xs text-muted-foreground">Vercel</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-12 h-12 bg-background border rounded flex items-center justify-center">
                                                {settings?.laravel_icon_svg ? (
                                                    <img src={settings.laravel_icon_svg} alt="Laravel" className="w-8 h-8" />
                                                ) : (
                                                    <Laravel className="w-8 h-8" />
                                                )}
                                            </div>
                                            <span className="text-xs text-muted-foreground">Laravel</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-12 h-12 bg-background border rounded flex items-center justify-center">
                                                {settings?.google_cloud_icon_svg ? (
                                                    <img src={settings.google_cloud_icon_svg} alt="Google Cloud" className="w-8 h-8" />
                                                ) : (
                                                    <GoogleCloud className="w-8 h-8" />
                                                )}
                                            </div>
                                            <span className="text-xs text-muted-foreground">GCP</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Update Icons Section */}
                                <div>
                                    <h4 className="text-sm font-medium mb-3">Update Icons</h4>
                                    <p className="text-sm text-muted-foreground mb-4">Select new SVG files to replace the current icons above.</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="android_icon_svg">Update Android Icon</Label>
                                            <Input
                                                id="android_icon_svg"
                                                type="file"
                                                accept=".svg"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        setData("android_icon_svg", file);
                                                        const reader = new FileReader();
                                                        reader.onloadend = () => {
                                                            setAndroidIconPreview(reader.result as string);
                                                        };
                                                        reader.readAsDataURL(file);
                                                    }
                                                }}
                                                className="mt-1"
                                            />
                                            {androidIconPreview && (
                                                <div className="mt-2 flex items-center gap-2">
                                                    <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
                                                        <img src={androidIconPreview} alt="Android Icon Preview" className="w-6 h-6" />
                                                    </div>
                                                    <span className="text-sm text-muted-foreground">New preview</span>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <Label htmlFor="cursor_icon_svg">Update Cursor Icon</Label>
                                            <Input
                                                id="cursor_icon_svg"
                                                type="file"
                                                accept=".svg"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        setData("cursor_icon_svg", file);
                                                        const reader = new FileReader();
                                                        reader.onloadend = () => {
                                                            setCursorIconPreview(reader.result as string);
                                                        };
                                                        reader.readAsDataURL(file);
                                                    }
                                                }}
                                                className="mt-1"
                                            />
                                            {cursorIconPreview && (
                                                <div className="mt-2 flex items-center gap-2">
                                                    <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
                                                        <img src={cursorIconPreview} alt="Cursor Icon Preview" className="w-6 h-6" />
                                                    </div>
                                                    <span className="text-sm text-muted-foreground">New preview</span>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <Label htmlFor="github_icon_svg">Update GitHub Icon</Label>
                                            <Input
                                                id="github_icon_svg"
                                                type="file"
                                                accept=".svg"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        setData("github_icon_svg", file);
                                                        const reader = new FileReader();
                                                        reader.onloadend = () => {
                                                            setGithubIconPreview(reader.result as string);
                                                        };
                                                        reader.readAsDataURL(file);
                                                    }
                                                }}
                                                className="mt-1"
                                            />
                                            {githubIconPreview && (
                                                <div className="mt-2 flex items-center gap-2">
                                                    <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
                                                        <img src={githubIconPreview} alt="GitHub Icon Preview" className="w-6 h-6" />
                                                    </div>
                                                    <span className="text-sm text-muted-foreground">New preview</span>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <Label htmlFor="nextjs_icon_svg">Update Next.js Icon</Label>
                                            <Input
                                                id="nextjs_icon_svg"
                                                type="file"
                                                accept=".svg"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        setData("nextjs_icon_svg", file);
                                                        const reader = new FileReader();
                                                        reader.onloadend = () => {
                                                            setNextjsIconPreview(reader.result as string);
                                                        };
                                                        reader.readAsDataURL(file);
                                                    }
                                                }}
                                                className="mt-1"
                                            />
                                            {nextjsIconPreview && (
                                                <div className="mt-2 flex items-center gap-2">
                                                    <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
                                                        <img src={nextjsIconPreview} alt="Next.js Icon Preview" className="w-6 h-6" />
                                                    </div>
                                                    <span className="text-sm text-muted-foreground">New preview</span>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <Label htmlFor="tailwind_icon_svg">Update Tailwind CSS Icon</Label>
                                            <Input
                                                id="tailwind_icon_svg"
                                                type="file"
                                                accept=".svg"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        setData("tailwind_icon_svg", file);
                                                        const reader = new FileReader();
                                                        reader.onloadend = () => {
                                                            setTailwindIconPreview(reader.result as string);
                                                        };
                                                        reader.readAsDataURL(file);
                                                    }
                                                }}
                                                className="mt-1"
                                            />
                                            {tailwindIconPreview && (
                                                <div className="mt-2 flex items-center gap-2">
                                                    <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
                                                        <img src={tailwindIconPreview} alt="Tailwind Icon Preview" className="w-6 h-6" />
                                                    </div>
                                                    <span className="text-sm text-muted-foreground">New preview</span>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <Label htmlFor="react_icon_svg">Update React Icon</Label>
                                            <Input
                                                id="react_icon_svg"
                                                type="file"
                                                accept=".svg"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        setData("react_icon_svg", file);
                                                        const reader = new FileReader();
                                                        reader.onloadend = () => {
                                                            setReactIconPreview(reader.result as string);
                                                        };
                                                        reader.readAsDataURL(file);
                                                    }
                                                }}
                                                className="mt-1"
                                            />
                                            {reactIconPreview && (
                                                <div className="mt-2 flex items-center gap-2">
                                                    <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
                                                        <img src={reactIconPreview} alt="React Icon Preview" className="w-6 h-6" />
                                                    </div>
                                                    <span className="text-sm text-muted-foreground">New preview</span>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <Label htmlFor="vercel_icon_svg">Update Vercel Icon</Label>
                                            <Input
                                                id="vercel_icon_svg"
                                                type="file"
                                                accept=".svg"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        setData("vercel_icon_svg", file);
                                                        const reader = new FileReader();
                                                        reader.onloadend = () => {
                                                            setVercelIconPreview(reader.result as string);
                                                        };
                                                        reader.readAsDataURL(file);
                                                    }
                                                }}
                                                className="mt-1"
                                            />
                                            {vercelIconPreview && (
                                                <div className="mt-2 flex items-center gap-2">
                                                    <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
                                                        <img src={vercelIconPreview} alt="Vercel Icon Preview" className="w-6 h-6" />
                                                    </div>
                                                    <span className="text-sm text-muted-foreground">New preview</span>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <Label htmlFor="laravel_icon_svg">Update Laravel Icon</Label>
                                            <Input
                                                id="laravel_icon_svg"
                                                type="file"
                                                accept=".svg"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        setData("laravel_icon_svg", file);
                                                        const reader = new FileReader();
                                                        reader.onloadend = () => {
                                                            setLaravelIconPreview(reader.result as string);
                                                        };
                                                        reader.readAsDataURL(file);
                                                    }
                                                }}
                                                className="mt-1"
                                            />
                                            {laravelIconPreview && (
                                                <div className="mt-2 flex items-center gap-2">
                                                    <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
                                                        <img src={laravelIconPreview} alt="Laravel Icon Preview" className="w-6 h-6" />
                                                    </div>
                                                    <span className="text-sm text-muted-foreground">New preview</span>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <Label htmlFor="google_cloud_icon_svg">Update Google Cloud Icon</Label>
                                            <Input
                                                id="google_cloud_icon_svg"
                                                type="file"
                                                accept=".svg"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        setData("google_cloud_icon_svg", file);
                                                        const reader = new FileReader();
                                                        reader.onloadend = () => {
                                                            setGoogleCloudIconPreview(reader.result as string);
                                                        };
                                                        reader.readAsDataURL(file);
                                                    }
                                                }}
                                                className="mt-1"
                                            />
                                            {googleCloudIconPreview && (
                                                <div className="mt-2 flex items-center gap-2">
                                                    <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
                                                        <img src={googleCloudIconPreview} alt="Google Cloud Icon Preview" className="w-6 h-6" />
                                                    </div>
                                                    <span className="text-sm text-muted-foreground">New preview</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end pt-4">
                                    <Button
                                        type="button"
                                        onClick={handleSubmit('icons')}
                                        disabled={savingSection === 'icons' || hasErrors}
                                    >
                                        {savingSection === 'icons' ? "Saving..." : hasErrors ? "Fix Errors to Save" : "Save Changes"}
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
