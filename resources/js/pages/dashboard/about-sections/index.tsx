import { FormEvent, useState, useEffect } from "react";
import { Head, useForm, Link, router } from "@inertiajs/react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import { CharacterLimitedInput } from "@/components/ui/character-limited-input";
import { CharacterLimitedTextarea } from "@/components/ui/character-limited-textarea";

// Character limits for About Sections
const LIMITS = {
  banner_label: 200,
  banner_title: 500,
  report_description: 2000,
  stat_value: 50,
  stat_label: 200,
  awards_section_title: 200,
  awards_section_subtitle: 500,
  corporate_title: 200,
  philosophy_title: 200,
  logic_theory_title: 200,
  logic_theory_content: 2000,
  logic_title: 200,
  logic_content: 2000,
  associates_title: 200,
  associates_description: 2000,
  impact_title: 200,
  impact_description: 2000,
  travel_title: 200,
  travel_description: 2000,
};

interface AboutSection {
  id: number;
  section_type: string;
  title: string;
  content: string;
  image: string | null;
  order: number;
  is_active: boolean;
}

interface Award {
  id: number;
  title: string;
  organization: string;
  award_date: string;
  order: number;
}

interface CorporateJourneyItem {
  id: number;
  step_number: number;
  title: string;
  company: string;
  description: string;
  icon_image: string | null;
  order: number;
}

interface Associate {
  id: number;
  name: string;
  logo_image: string | null;
  order: number;
  is_active: boolean;
}

interface ImpactItem {
  id: number;
  title: string;
  order: number;
  is_active: boolean;
}

interface TravelCountry {
  id: number;
  name: string;
  flag_image: string | null;
  flag_url: string | null;
  order: number;
  is_active: boolean;
}

interface AboutMePageSetting {
  id: number;
  banner: {
    label: string;
    title: string;
    banner_image: string;
    video_thumbnail: string;
    video_url: string;
  };
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
  awards: {
    section_title: string;
    section_subtitle: string;
  };
  corporate_journey: {
    title: string;
    philosophy_title: string;
    philosophy_image: string;
    background_image: string;
    line_image: string;
    logic_theory_title: string;
    logic_theory_content_1: string;
    logic_theory_content_2: string;
    logic_1_title: string;
    logic_1_content: string;
  };
  associates: {
    title: string;
    description: string;
    background_image: string;
  };
  impact: {
    entrepreneur_title: string;
    entrepreneur_description: string;
    technology_title: string;
    technology_description: string;
    image_1: string;
    image_2: string;
    image_3: string;
    image_4: string;
  };
  travel: {
    title?: string;
    description?: string;
    section_title?: string;
    section_subtitle?: string;
    map_image: string;
  };
}

interface Props {
  aboutSections: AboutSection[];
  awards: Award[];
  corporateJourney: CorporateJourneyItem[];
  associates: Associate[];
  impactItems: ImpactItem[];
  travelCountries: TravelCountry[];
  settings: AboutMePageSetting;
}

export default function AboutSectionsPage({
  aboutSections,
  awards,
  corporateJourney,
  associates,
  impactItems,
  travelCountries,
  settings
}: Props) {
  const [previewImages, setPreviewImages] = useState<{ [key: string]: string }>({});
  
  // Get initial tab from URL hash or default to 'banner'
  const getInitialTab = () => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      const validTabs = ['banner', 'report', 'awards', 'story', 'impact', 'travel', 'corporate', 'associates'];
      return validTabs.includes(hash) ? hash : 'banner';
    }
    return 'banner';
  };
  
  const [activeTab, setActiveTab] = useState(getInitialTab);
  
  // Update URL hash when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    window.location.hash = value;
  };
  
  // Listen for hash changes (back/forward navigation)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validTabs = ['banner', 'report', 'awards', 'story', 'impact', 'travel', 'corporate', 'associates'];
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const storySections = aboutSections.filter(s => s.section_type === 'story');
  const firstStorySection = storySections[0] || null;

  // Banner form
  const bannerForm = useForm({
    label: settings?.banner?.label || 'About Me',
    title: settings?.banner?.title || '',
    banner_image: null as File | null,
    video_thumbnail: null as File | null,
    video_url: settings?.banner?.video_url || '',
  });

  // Report form
  const reportForm = useForm({
    description: settings?.report?.description || '',
    stat_1_value: settings?.report?.stat_1_value || '11',
    stat_1_label: settings?.report?.stat_1_label || 'Years Journey',
    stat_2_value: settings?.report?.stat_2_value || '200',
    stat_2_label: settings?.report?.stat_2_label || 'Projects',
    stat_3_value: settings?.report?.stat_3_value || '6',
    stat_3_label: settings?.report?.stat_3_label || 'Certification',
    stat_4_value: settings?.report?.stat_4_value || '5',
    stat_4_label: settings?.report?.stat_4_label || 'Int Article',
    stat_5_value: settings?.report?.stat_5_value || '4',
    stat_5_label: settings?.report?.stat_5_label || 'Books',
    stat_6_value: settings?.report?.stat_6_value || '4',
    stat_6_label: settings?.report?.stat_6_label || 'Books',
    stat_7_value: settings?.report?.stat_7_value || '100',
    stat_7_label: settings?.report?.stat_7_label || 'Mentoring',
  });

  // Corporate Journey form
  const corporateForm = useForm({
    title: settings?.corporate_journey?.title || 'Corporate Journey',
    philosophy_title: settings?.corporate_journey?.philosophy_title || 'My Philosophy',
    philosophy_image: null as File | null,
    background_image: null as File | null,
    line_image: null as File | null,
    logic_theory_title: settings?.corporate_journey?.logic_theory_title || 'Logic Theory',
    logic_theory_content_1: settings?.corporate_journey?.logic_theory_content_1 || '',
    logic_theory_content_2: settings?.corporate_journey?.logic_theory_content_2 || '',
    logic_1_title: settings?.corporate_journey?.logic_1_title || 'Logic #1',
    logic_1_content: settings?.corporate_journey?.logic_1_content || '',
  });

  // Associates form
  const associatesForm = useForm({
    title: settings?.associates?.title || 'Associate',
    description: settings?.associates?.description || '',
    background_image: null as File | null,
  });

  // Impact form
  const [impactImagePreviews, setImpactImagePreviews] = useState<{ [key: string]: string | null }>({
    image_1: settings?.impact?.image_1 || null,
    image_2: settings?.impact?.image_2 || null,
    image_3: settings?.impact?.image_3 || null,
    image_4: settings?.impact?.image_4 || null,
  });
  const impactForm = useForm({
    entrepreneur_title: settings?.impact?.entrepreneur_title || '',
    entrepreneur_description: settings?.impact?.entrepreneur_description || '',
    technology_title: settings?.impact?.technology_title || '',
    technology_description: settings?.impact?.technology_description || '',
    image_1: null as File | null,
    image_2: null as File | null,
    image_3: null as File | null,
    image_4: null as File | null,
  });

  // Real-time validation errors based on current data
  const getBannerValidationErrors = () => {
    const errors: Record<string, string> = {};
    if ((bannerForm.data.label || "").length > LIMITS.banner_label) {
      errors.label = `Label must be ${LIMITS.banner_label} characters or less`;
    }
    if ((bannerForm.data.title || "").length > LIMITS.banner_title) {
      errors.title = `Title must be ${LIMITS.banner_title} characters or less`;
    }
    return errors;
  };

  const getReportValidationErrors = () => {
    const errors: Record<string, string> = {};
    if ((reportForm.data.description || "").length > LIMITS.report_description) {
      errors.description = `Description must be ${LIMITS.report_description} characters or less`;
    }
    return errors;
  };

  const getCorporateValidationErrors = () => {
    const errors: Record<string, string> = {};
    if ((corporateForm.data.title || "").length > LIMITS.corporate_title) {
      errors.title = `Title must be ${LIMITS.corporate_title} characters or less`;
    }
    if ((corporateForm.data.philosophy_title || "").length > LIMITS.philosophy_title) {
      errors.philosophy_title = `Philosophy title must be ${LIMITS.philosophy_title} characters or less`;
    }
    if ((corporateForm.data.logic_theory_title || "").length > LIMITS.logic_theory_title) {
      errors.logic_theory_title = `Logic theory title must be ${LIMITS.logic_theory_title} characters or less`;
    }
    if ((corporateForm.data.logic_theory_content_1 || "").length > LIMITS.logic_theory_content) {
      errors.logic_theory_content_1 = `Content must be ${LIMITS.logic_theory_content} characters or less`;
    }
    if ((corporateForm.data.logic_theory_content_2 || "").length > LIMITS.logic_theory_content) {
      errors.logic_theory_content_2 = `Content must be ${LIMITS.logic_theory_content} characters or less`;
    }
    if ((corporateForm.data.logic_1_title || "").length > LIMITS.logic_title) {
      errors.logic_1_title = `Title must be ${LIMITS.logic_title} characters or less`;
    }
    if ((corporateForm.data.logic_1_content || "").length > LIMITS.logic_content) {
      errors.logic_1_content = `Content must be ${LIMITS.logic_content} characters or less`;
    }
    return errors;
  };

  const getAssociatesValidationErrors = () => {
    const errors: Record<string, string> = {};
    if ((associatesForm.data.title || "").length > LIMITS.associates_title) {
      errors.title = `Title must be ${LIMITS.associates_title} characters or less`;
    }
    if ((associatesForm.data.description || "").length > LIMITS.associates_description) {
      errors.description = `Description must be ${LIMITS.associates_description} characters or less`;
    }
    return errors;
  };

  const getImpactValidationErrors = () => {
    const errors: Record<string, string> = {};
    if ((impactForm.data.entrepreneur_title || "").length > LIMITS.impact_title) {
      errors.entrepreneur_title = `Title must be ${LIMITS.impact_title} characters or less`;
    }
    if ((impactForm.data.entrepreneur_description || "").length > LIMITS.impact_description) {
      errors.entrepreneur_description = `Description must be ${LIMITS.impact_description} characters or less`;
    }
    if ((impactForm.data.technology_title || "").length > LIMITS.impact_title) {
      errors.technology_title = `Title must be ${LIMITS.impact_title} characters or less`;
    }
    if ((impactForm.data.technology_description || "").length > LIMITS.impact_description) {
      errors.technology_description = `Description must be ${LIMITS.impact_description} characters or less`;
    }
    return errors;
  };

  const bannerValidationErrors = getBannerValidationErrors();
  const reportValidationErrors = getReportValidationErrors();
  const corporateValidationErrors = getCorporateValidationErrors();
  const associatesValidationErrors = getAssociatesValidationErrors();
  const impactValidationErrors = getImpactValidationErrors();

  const hasBannerErrors = Object.keys(bannerValidationErrors).length > 0;
  const hasReportErrors = Object.keys(reportValidationErrors).length > 0;
  const hasCorporateErrors = Object.keys(corporateValidationErrors).length > 0;
  const hasAssociatesErrors = Object.keys(associatesValidationErrors).length > 0;
  const hasImpactErrors = Object.keys(impactValidationErrors).length > 0;

  const handleBannerSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (hasBannerErrors) {
      toast.error("Please fix the validation errors before saving");
      return;
    }
    bannerForm.post('/admin/about-me-page-settings/update-banner', {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => toast.success("Banner settings updated successfully"),
    });
  };

  const handleReportSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (hasReportErrors) {
      toast.error("Please fix the validation errors before saving");
      return;
    }
    reportForm.post('/admin/about-me-page-settings/update-report', {
      preserveScroll: true,
      onSuccess: () => toast.success("Report settings updated successfully"),
    });
  };

  const handleCorporateSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (hasCorporateErrors) {
      toast.error("Please fix the validation errors before saving");
      return;
    }
    corporateForm.post('/admin/about-me-page-settings/update-corporate', {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => toast.success("Corporate settings updated successfully"),
    });
  };

  const handleAssociatesSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (hasAssociatesErrors) {
      toast.error("Please fix the validation errors before saving");
      return;
    }
    associatesForm.post('/admin/about-me-page-settings/update-associates', {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => toast.success("Associates settings updated successfully"),
    });
  };

  const handleImpactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (hasImpactErrors) {
      toast.error("Please fix the validation errors before saving");
      return;
    }
    impactForm.post('/admin/about-me-page-settings/update-impact', {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        toast.success("Impact settings updated successfully");
      },
    });
  };

  const handleImpactImageChange = (key: string, file: File | undefined) => {
    if (file) {
      impactForm.setData(key as any, file);
      const reader = new FileReader();
      reader.onloadend = () => setImpactImagePreviews(prev => ({ ...prev, [key]: reader.result as string }));
      reader.readAsDataURL(file);
    }
  };

  // Travel form
  const [travelMapPreview, setTravelMapPreview] = useState<string | null>(settings?.travel?.map_image || null);
  const travelForm = useForm({
    title: settings?.travel?.section_title || settings?.travel?.title || '',
    description: settings?.travel?.section_subtitle || settings?.travel?.description || '',
    map_image: null as File | null,
  });

  const handleTravelSubmit = (e: FormEvent) => {
    e.preventDefault();
    travelForm.post('/admin/about-me-page-settings/update-travel', {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        toast.success("Travel settings updated successfully");
      },
    });
  };

  const handleDeleteTravelCountry = (id: number) => {
    if (confirm('Are you sure you want to delete this country?')) {
      router.delete(`/admin/travel-countries/${id}`, {
        onSuccess: () => toast.success("Country deleted successfully"),
      });
    }
  };

  const handleDeleteImpactItem = (id: number) => {
    if (confirm('Are you sure you want to delete this impact item?')) {
      router.delete(`/admin/impact-items/${id}`, {
        onSuccess: () => toast.success("Impact item deleted successfully"),
      });
    }
  };

  const handleDeleteSection = (id: number) => {
    if (confirm('Are you sure you want to delete this section?')) {
      router.delete(`/admin/about-sections/${id}`, {
        onSuccess: () => toast.success("Section deleted successfully"),
      });
    }
  };

  const handleDeleteAward = (id: number) => {
    if (confirm('Are you sure you want to delete this award?')) {
      router.delete(`/admin/awards/${id}`, {
        onSuccess: () => toast.success("Award deleted successfully"),
      });
    }
  };

  const handleDeleteCorporateItem = (id: number) => {
    if (confirm('Are you sure you want to delete this corporate journey item?')) {
      router.delete(`/admin/corporate-journey/${id}`, {
        onSuccess: () => toast.success("Corporate journey item deleted successfully"),
      });
    }
  };

  const handleDeleteAssociate = (id: number) => {
    if (confirm('Are you sure you want to delete this associate?')) {
      router.delete(`/admin/associates/${id}`, {
        onSuccess: () => toast.success("Associate deleted successfully"),
      });
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <Head title="About Page Management" />

        <div className="container mx-auto py-8 px-4 max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              About Page Management
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage all sections of the About Me page
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
            <TabsList className="grid w-full grid-cols-8 lg:w-auto">
              <TabsTrigger value="banner">Banner</TabsTrigger>
              <TabsTrigger value="report">Report</TabsTrigger>
              <TabsTrigger value="awards">Awards</TabsTrigger>
              <TabsTrigger value="story">Story</TabsTrigger>
              <TabsTrigger value="impact">Impact</TabsTrigger>
              <TabsTrigger value="travel">Travel</TabsTrigger>
              <TabsTrigger value="corporate">Corporate</TabsTrigger>
              <TabsTrigger value="associates">Associates</TabsTrigger>
            </TabsList>

            {/* Banner Section */}
            <TabsContent value="banner">
              <Card>
                <CardHeader>
                  <CardTitle>Banner Section</CardTitle>
                  <CardDescription>
                    Manage the hero banner with video and title
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleBannerSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="banner_label">Label</Label>
                      <CharacterLimitedInput
                        id="banner_label"
                        value={bannerForm.data.label}
                        onChange={(e) => bannerForm.setData("label", e.target.value)}
                        maxLength={LIMITS.banner_label}
                        placeholder="About Me"
                        className="mt-2"
                        error={bannerValidationErrors.label}
                      />
                    </div>

                    <div>
                      <Label htmlFor="banner_title">Title</Label>
                      <CharacterLimitedTextarea
                        id="banner_title"
                        value={bannerForm.data.title}
                        onChange={(e) => bannerForm.setData("title", e.target.value)}
                        maxLength={LIMITS.banner_title}
                        placeholder="Remarkable lives respond to a greater purpose."
                        rows={3}
                        className="mt-2"
                        error={bannerValidationErrors.title}
                      />
                    </div>

                    <div>
                      <Label htmlFor="banner_image">Banner Image</Label>
                      <Input
                        id="banner_image"
                        className="mt-2"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            bannerForm.setData("banner_image", file);
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setPreviewImages({ ...previewImages, banner_image: reader.result as string });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      {(previewImages.banner_image || settings?.banner?.banner_image) && (
                        <div className="mt-2">
                          <img
                            src={previewImages.banner_image || settings.banner.banner_image}
                            alt="Banner Preview"
                            className="h-32 object-contain"
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="video_thumbnail">Video Thumbnail</Label>
                      <Input
                        className="mt-2"
                        id="video_thumbnail"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            bannerForm.setData("video_thumbnail", file);
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setPreviewImages({ ...previewImages, video_thumbnail: reader.result as string });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      {(previewImages.video_thumbnail || settings?.banner?.video_thumbnail) && (
                        <div className="mt-2">
                          <img
                            src={previewImages.video_thumbnail || settings.banner.video_thumbnail}
                            alt="Video Thumbnail Preview"
                            className="h-32 object-contain"
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="video_url">Video URL (YouTube Embed)</Label>
                      <Input
                        className="mt-2"
                        id="video_url"
                        value={bannerForm.data.video_url}
                        onChange={(e) => bannerForm.setData("video_url", e.target.value)}
                        placeholder="https://www.youtube.com/embed/..."
                      />
                    </div>

                    <Button type="submit" disabled={bannerForm.processing || hasBannerErrors}>
                      {bannerForm.processing ? 'Saving...' : hasBannerErrors ? 'Fix Errors to Save' : 'Save Banner Settings'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Report Section */}
            <TabsContent value="report">
              <Card>
                <CardHeader>
                  <CardTitle>Report & Statistics Section</CardTitle>
                  <CardDescription>
                    Manage statistics and achievement report
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleReportSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="report_description">Description</Label>
                      <Textarea
                        className="mt-2"
                        id="report_description"
                        value={reportForm.data.description}
                        onChange={(e) => reportForm.setData("description", e.target.value)}
                        rows={4}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                        <div key={num} className="space-y-2">
                          <Label>Statistic {num}</Label>
                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              className="mt-2"
                              placeholder="Value"
                              value={reportForm.data[`stat_${num}_value` as keyof typeof reportForm.data] as string}
                              onChange={(e) => reportForm.setData(`stat_${num}_value` as any, e.target.value)}
                            />
                            <Input
                              placeholder="Label"
                              value={reportForm.data[`stat_${num}_label` as keyof typeof reportForm.data] as string}
                              onChange={(e) => reportForm.setData(`stat_${num}_label` as any, e.target.value)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button type="submit" disabled={reportForm.processing}>
                      {reportForm.processing ? 'Saving...' : 'Save Report Settings'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Awards Section */}
            <TabsContent value="awards">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Awards Section</CardTitle>
                      <CardDescription>Manage awards and recognitions</CardDescription>
                    </div>
                    <Link href="/admin/awards/create">
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Award
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Organization</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Order</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {awards.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                            No awards found. Create your first one!
                          </TableCell>
                        </TableRow>
                      ) : (
                        awards.map((award) => (
                          <TableRow key={award.id}>
                            <TableCell className="font-medium">{award.title}</TableCell>
                            <TableCell>{award.organization}</TableCell>
                            <TableCell>{new Date(award.award_date).toLocaleDateString()}</TableCell>
                            <TableCell>{award.order}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem asChild>
                                    <Link href={`/admin/awards/${award.id}/edit`}>
                                      <Pencil className="mr-2 h-4 w-4" />
                                      Edit
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => handleDeleteAward(award.id)}
                                    className="text-destructive"
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Story Section */}
            <TabsContent value="story">
              <Card>
                <CardHeader>
                  <CardTitle>Story Section</CardTitle>
                  <CardDescription>
                    This is the main story section displayed on the About Me page
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {firstStorySection ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label className="text-muted-foreground">Title</Label>
                          <p className="text-lg font-medium mt-1">{firstStorySection.title}</p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Status</Label>
                          <p className="mt-1">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${firstStorySection.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                              {firstStorySection.is_active ? 'Active' : 'Inactive'}
                            </span>
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-muted-foreground">Content Preview</Label>
                        <p className="mt-1 text-sm text-muted-foreground line-clamp-3">
                          {firstStorySection.content}
                        </p>
                      </div>
                      
                      {firstStorySection.image && (
                        <div>
                          <Label className="text-muted-foreground">Current Image</Label>
                          <div className="mt-2">
                            <img
                              src={firstStorySection.image}
                              alt={firstStorySection.title}
                              className="h-32 object-contain rounded border"
                            />
                          </div>
                        </div>
                      )}
                      
                      <div className="pt-4">
                        <Link href={`/admin/about-sections/${firstStorySection.id}/edit`}>
                          <Button>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit Story Section
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">No story section found. Create your first one!</p>
                      <Link href="/admin/about-sections/create?type=story">
                        <Button>
                          <Plus className="mr-2 h-4 w-4" />
                          Create Story Section
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Impact Section */}
            <TabsContent value="impact">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Impact Section</CardTitle>
                      <CardDescription>
                        Manage Entrepreneur Impact, Technology Impact content and impact items
                      </CardDescription>
                    </div>
                    <Link href="/admin/impact-items/create">
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Impact Item
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleImpactSubmit} className="space-y-6">
                    {/* Entrepreneur Impact Section */}
                    <div className="border rounded-lg p-4 space-y-4">
                      <h3 className="text-lg font-semibold">Entrepreneur Impact</h3>
                      <div>
                        <Label htmlFor="entrepreneur_title">Title</Label>
                        <Input
                          id="entrepreneur_title"
                          value={impactForm.data.entrepreneur_title}
                          onChange={(e) => impactForm.setData("entrepreneur_title", e.target.value)}
                          placeholder="Entrepreneur Impact"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="entrepreneur_description">Description</Label>
                        <Textarea
                          id="entrepreneur_description"
                          value={impactForm.data.entrepreneur_description}
                          onChange={(e) => impactForm.setData("entrepreneur_description", e.target.value)}
                          placeholder="As a visionary entrepreneur, Shahriar Khan has pioneered multiple successful ventures including Nexkraft LTD, Nexfly, Mechanix, and NexAcademy..."
                          rows={4}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    {/* Technology Impact Section */}
                    <div className="border rounded-lg p-4 space-y-4">
                      <h3 className="text-lg font-semibold">Technology Impact</h3>
                      <div>
                        <Label htmlFor="technology_title">Title</Label>
                        <Input
                          id="technology_title"
                          value={impactForm.data.technology_title}
                          onChange={(e) => impactForm.setData("technology_title", e.target.value)}
                          placeholder="Technology Impact"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="technology_description">Description</Label>
                        <Textarea
                          id="technology_description"
                          value={impactForm.data.technology_description}
                          onChange={(e) => impactForm.setData("technology_description", e.target.value)}
                          placeholder="Shahriar Khan has been at the forefront of technological advancement, specializing in AI-driven solutions, cloud-based systems, and cybersecurity..."
                          rows={4}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    {/* Section Images */}
                    <div className="border rounded-lg p-4 space-y-4">
                      <h3 className="text-lg font-semibold">Section Images (4 Images)</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((num) => (
                          <div key={num}>
                            <Label htmlFor={`impact_image_${num}`}>Image {num}</Label>
                            <Input
                              id={`impact_image_${num}`}
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImpactImageChange(`image_${num}`, e.target.files?.[0])}
                              className="mt-1"
                            />
                            {impactImagePreviews[`image_${num}`] && (
                              <div className="mt-2">
                                <img
                                  src={impactImagePreviews[`image_${num}`] || ''}
                                  alt={`Image ${num}`}
                                  className="h-24 object-contain rounded"
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button type="submit" disabled={impactForm.processing}>
                      {impactForm.processing ? 'Saving...' : 'Save Impact Settings'}
                    </Button>
                  </form>

                  {/* Impact Items List */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Impact Items (Technology Grid)</h3>
                    <p className="text-sm text-muted-foreground mb-4">These items appear in the technology impact grid section</p>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Order</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {impactItems.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                              No impact items found. Add your first one!
                            </TableCell>
                          </TableRow>
                        ) : (
                          impactItems.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell className="font-medium">{item.title}</TableCell>
                              <TableCell>{item.order}</TableCell>
                              <TableCell>{item.is_active ? 'Active' : 'Inactive'}</TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                      <Link href={`/admin/impact-items/${item.id}/edit`}>
                                        <Pencil className="mr-2 h-4 w-4" />
                                        Edit
                                      </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => handleDeleteImpactItem(item.id)}
                                      className="text-destructive"
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Travel Section */}
            <TabsContent value="travel">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Travel Section</CardTitle>
                      <CardDescription>
                        Manage travel section settings and countries visited for business
                      </CardDescription>
                    </div>
                    <Link href="/admin/travel-countries/create">
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Country
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleTravelSubmit} className="space-y-4">
                    <div className="border rounded-lg p-4 space-y-4">
                      <h3 className="text-lg font-semibold">Section Settings</h3>
                      <div>
                        <Label htmlFor="travel_title">Section Title</Label>
                        <Input
                          id="travel_title"
                          value={travelForm.data.title}
                          onChange={(e) => travelForm.setData("title", e.target.value)}
                          placeholder="Travel countries for business purposes"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="travel_description">Description</Label>
                        <Textarea
                          id="travel_description"
                          value={travelForm.data.description}
                          onChange={(e) => travelForm.setData("description", e.target.value)}
                          placeholder="As a global entrepreneur and technology leader, Shahriar Khan has traveled extensively for business purposes..."
                          rows={4}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="travel_map_image">Map Image</Label>
                        <Input
                          id="travel_map_image"
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              travelForm.setData("map_image", file);
                              const reader = new FileReader();
                              reader.onloadend = () => setTravelMapPreview(reader.result as string);
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="mt-1"
                        />
                        {(travelMapPreview || settings?.travel?.map_image) && (
                          <div className="mt-2">
                            <img
                              src={travelMapPreview || settings?.travel?.map_image || ''}
                              alt="Map Preview"
                              className="h-32 object-contain rounded"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <Button type="submit" disabled={travelForm.processing}>
                      {travelForm.processing ? 'Saving...' : 'Save Travel Settings'}
                    </Button>
                  </form>

                  {/* Travel Countries List */}
                  {/* <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Countries List</h3>
                    <p className="text-sm text-muted-foreground mb-4">Countries visited for business purposes</p>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Flag</TableHead>
                          <TableHead>Country Name</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {travelCountries.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                              No countries found. Add your first one!
                            </TableCell>
                          </TableRow>
                        ) : (
                          travelCountries.map((country) => (
                            <TableRow key={country.id}>
                              <TableCell>
                                {(country.flag_url || country.flag_image) && (
                                  <img
                                    src={country.flag_url || country.flag_image || ''}
                                    alt={country.name}
                                    className="h-6 w-9 object-contain"
                                  />
                                )}
                              </TableCell>
                              <TableCell className="font-medium">{country.name}</TableCell>
                              <TableCell>{country.is_active ? 'Active' : 'Inactive'}</TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                      <Link href={`/admin/travel-countries/${country.id}/edit`}>
                                        <Pencil className="mr-2 h-4 w-4" />
                                        Edit
                                      </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => handleDeleteTravelCountry(country.id)}
                                      className="text-destructive"
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div> */}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Corporate Journey Section */}
            <TabsContent value="corporate">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Corporate Journey Section</CardTitle>
                      <CardDescription>Manage philosophy and corporate journey items</CardDescription>
                    </div>
                    <Link href="/admin/corporate-journey/create">
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Journey Item
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleCorporateSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="corp_title">Section Title</Label>
                      <Input
                        className="mt-2"

                        id="corp_title"
                        value={corporateForm.data.title}
                        onChange={(e) => corporateForm.setData("title", e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="philosophy_title">Philosophy Title</Label>
                      <Input
                        className="mt-2"

                        id="philosophy_title"
                        value={corporateForm.data.philosophy_title}
                        onChange={(e) => corporateForm.setData("philosophy_title", e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="logic_theory_title">Logic Theory Title</Label>
                      <Input
                        className="mt-2"

                        id="logic_theory_title"
                        value={corporateForm.data.logic_theory_title}
                        onChange={(e) => corporateForm.setData("logic_theory_title", e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="logic_theory_content_1">Logic Theory Content 1</Label>
                      <Textarea
                        className="mt-2"

                        id="logic_theory_content_1"
                        value={corporateForm.data.logic_theory_content_1}
                        onChange={(e) => corporateForm.setData("logic_theory_content_1", e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="logic_theory_content_2">Logic Theory Content 2</Label>
                      <Textarea
                        className="mt-2"

                        id="logic_theory_content_2"
                        value={corporateForm.data.logic_theory_content_2}
                        onChange={(e) => corporateForm.setData("logic_theory_content_2", e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="logic_1_title">Logic #1 Title</Label>
                      <Input

                        className="mt-2"

                        id="logic_1_title"
                        value={corporateForm.data.logic_1_title}
                        onChange={(e) => corporateForm.setData("logic_1_title", e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="logic_1_content">Logic #1 Content</Label>
                      <Textarea
                        className="mt-2"

                        id="logic_1_content"
                        value={corporateForm.data.logic_1_content}
                        onChange={(e) => corporateForm.setData("logic_1_content", e.target.value)}
                        rows={3}
                      />
                    </div>

                    {/* Image Upload Controls */}
                    <div className="border-t pt-6 mt-6">
                      <h3 className="text-lg font-semibold mb-4">Section Images</h3>
                      
                      <div>
                        <Label htmlFor="philosophy_image">Philosophy Image</Label>
                        <p className="text-sm text-muted-foreground mb-2">The main portrait image in the philosophy section</p>
                        <Input
                          id="philosophy_image"
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              corporateForm.setData("philosophy_image", file);
                              const reader = new FileReader();
                              reader.onloadend = () => setPreviewImages(prev => ({ ...prev, philosophy_image: reader.result as string }));
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="mt-1"
                        />
                        {(previewImages.philosophy_image || settings?.corporate_journey?.philosophy_image) && (
                          <div className="mt-2">
                            <img
                              src={previewImages.philosophy_image || settings?.corporate_journey?.philosophy_image}
                              alt="Philosophy"
                              className="h-32 object-contain rounded"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <Button type="submit" disabled={corporateForm.processing}>
                      {corporateForm.processing ? 'Saving...' : 'Save Corporate Settings'}
                    </Button>
                  </form>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Journey Items</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Step</TableHead>
                          <TableHead>Title</TableHead>
                          <TableHead>Company</TableHead>
                          <TableHead>Order</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {corporateJourney.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                              No journey items found.
                            </TableCell>
                          </TableRow>
                        ) : (
                          corporateJourney.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell>{item.step_number}</TableCell>
                              <TableCell className="font-medium">{item.title}</TableCell>
                              <TableCell>{item.company}</TableCell>
                              <TableCell>{item.order}</TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                      <Link href={`/admin/corporate-journey/${item.id}/edit`}>
                                        <Pencil className="mr-2 h-4 w-4" />
                                        Edit
                                      </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => handleDeleteCorporateItem(item.id)}
                                      className="text-destructive"
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Associates Section */}
            <TabsContent value="associates">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Associates Section</CardTitle>
                      <CardDescription>Manage partners and associates</CardDescription>
                    </div>
                    <Link href="/admin/associates/create">
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Associate
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleAssociatesSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="assoc_title">Section Title</Label>
                      <Input
                        className="mt-2"

                        id="assoc_title"
                        value={associatesForm.data.title}
                        onChange={(e) => associatesForm.setData("title", e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="assoc_description">Description</Label>
                      <Textarea
                        className="mt-2"

                        id="assoc_description"
                        value={associatesForm.data.description}
                        onChange={(e) => associatesForm.setData("description", e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="assoc_background_image">Background Image</Label>
                      <Input
                        className="mt-2"

                        id="assoc_background_image"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            associatesForm.setData("background_image", file);
                          }
                        }}
                      />
                      {settings?.associates?.background_image && (
                        <div className="mt-2">
                          <img
                            src={settings.associates.background_image}
                            alt="Background Preview"
                            className="h-32 object-contain"
                          />
                        </div>
                      )}
                    </div>

                    <Button type="submit" disabled={associatesForm.processing}>
                      {associatesForm.processing ? 'Saving...' : 'Save Associates Settings'}
                    </Button>
                  </form>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Associate List</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Order</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {associates.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                              No associates found.
                            </TableCell>
                          </TableRow>
                        ) : (
                          associates.map((associate) => (
                            <TableRow key={associate.id}>
                              <TableCell className="font-medium">{associate.name}</TableCell>
                              <TableCell>{associate.order}</TableCell>
                              <TableCell>{associate.is_active ? 'Active' : 'Inactive'}</TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                      <Link href={`/admin/associates/${associate.id}/edit`}>
                                        <Pencil className="mr-2 h-4 w-4" />
                                        Edit
                                      </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => handleDeleteAssociate(associate.id)}
                                      className="text-destructive"
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
