import { FormEventHandler, useState } from 'react'
import { Head, Link, useForm, router } from '@inertiajs/react'
import { toast } from 'sonner'
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CharacterLimitInput } from '@/components/ui/character-limit-input'
import { ArrowLeft, Pencil, Check, X } from 'lucide-react'

interface SocialLinkSetting {
  platform: string
  label: string
  is_active: boolean
}

interface HeroSection {
  id: number
  title: string
  subtitle: string | null
  subtitle_max_length: number
  tagline: string | null
  tagline_max_length: number
  description: string | null
  description_max_length: number
  image_url: string | null
  social_links: Record<string, string>
  social_link_settings: SocialLinkSetting[] | null
  font_settings: Record<string, string> | null
  is_active: boolean
  order: number
}

interface AvailablePlatform {
  label: string
  icon: string
}

interface Props {
  heroSection: HeroSection
  availablePlatforms: Record<string, AvailablePlatform>
}

export default function EditHeroSection({ heroSection, availablePlatforms }: Props) {
  const [imagePreview, setImagePreview] = useState<string | null>(heroSection.image_url)
  const [processing, setProcessing] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [socialLinkSettings, setSocialLinkSettings] = useState<SocialLinkSetting[]>(
    heroSection.social_link_settings || []
  )
  const [editingLabel, setEditingLabel] = useState<string | null>(null)
  const [tempLabel, setTempLabel] = useState('')
  const socialLinks = heroSection.social_links || {}

  // Initialize social links with all available platforms
  const initialSocialLinks: Record<string, string> = {}
  Object.keys(availablePlatforms).forEach(platform => {
    initialSocialLinks[platform] = socialLinks[platform] || ''
  })

  const { data, setData } = useForm({
    title: heroSection.title || '',
    subtitle: heroSection.subtitle || '',
    tagline: heroSection.tagline || '',
    description: heroSection.description || '',
    image_url: null as File | null,
    social_links: initialSocialLinks,
    social_link_settings: socialLinkSettings,
    is_active: heroSection.is_active || false,
  })

  // Get the active status for a platform
  const isPlatformActive = (platform: string): boolean => {
    const setting = socialLinkSettings.find(s => s.platform === platform)
    return setting ? setting.is_active : true // Default to active if no setting
  }

  // Get the label for a platform
  const getPlatformLabel = (platform: string): string => {
    const setting = socialLinkSettings.find(s => s.platform === platform)
    return setting?.label || availablePlatforms[platform]?.label || platform
  }

  // Toggle social link active status
  const handleToggleSocialLink = async (platform: string, isActive: boolean) => {
    try {
      const response = await fetch(`/admin/hero-sections/${heroSection.id}/toggle-social-link`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        body: JSON.stringify({ platform, is_active: isActive }),
      })

      const result = await response.json()
      if (result.success) {
        setSocialLinkSettings(result.social_link_settings)
        toast.success(`${getPlatformLabel(platform)} ${isActive ? 'enabled' : 'disabled'}`)
      } else {
        toast.error('Failed to update social link status')
      }
    } catch (error) {
      toast.error('Failed to update social link status')
    }
  }

  // Start editing a label
  const startEditingLabel = (platform: string) => {
    setEditingLabel(platform)
    setTempLabel(getPlatformLabel(platform))
  }

  // Save the edited label
  const saveLabel = async (platform: string) => {
    try {
      const response = await fetch(`/admin/hero-sections/${heroSection.id}/update-social-link-label`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        body: JSON.stringify({ platform, label: tempLabel }),
      })

      const result = await response.json()
      if (result.success) {
        setSocialLinkSettings(result.social_link_settings)
        toast.success('Label updated')
      } else {
        toast.error('Failed to update label')
      }
    } catch (error) {
      toast.error('Failed to update label')
    }
    setEditingLabel(null)
  }

  // Cancel editing
  const cancelEditingLabel = () => {
    setEditingLabel(null)
    setTempLabel('')
  }

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    setProcessing(true)

    router.post(`/admin/hero-sections/${heroSection.id}`, {
      title: data.title,
      subtitle: data.subtitle,
      tagline: data.tagline,
      description: data.description,
      image_url: data.image_url,
      social_links: data.social_links,
      is_active: data.is_active,
      _method: 'PUT',
    }, {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Hero section updated successfully')
        setProcessing(false)
      },
      onError: (errors) => {
        setErrors(errors)
        toast.error('Failed to update hero section')
        setProcessing(false)
      },
    })
  }

  return (
    <>
      <Head title={`Edit ${heroSection.title} - Admin`} />
      <SidebarProvider
        style={
          {
            '--sidebar-width': 'calc(var(--spacing) * 72)',
            '--header-height': 'calc(var(--spacing) * 12)',
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="sidebar" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
            <div className="flex items-center gap-4">
              <Link href="/admin/hero-sections">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Edit Hero Section</h1>
                <p className="text-muted-foreground">Update your hero section</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Edit the details of your hero section</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CharacterLimitInput
                    id="title"
                    label="Title (Site Name)"
                    value={data.title}
                    maxLength={300}
                    onChange={(value) => setData('title', value)}
                    placeholder="Enter site title"
                    error={errors.title}
                  />

                  <CharacterLimitInput
                    id="subtitle"
                    label="Subtitle"
                    value={data.subtitle}
                    maxLength={heroSection.subtitle_max_length || 1000}
                    onChange={(value) => setData('subtitle', value)}
                    placeholder="Enter subtitle"
                    error={errors.subtitle}
                  />

                  <CharacterLimitInput
                    id="tagline"
                    label="Tagline"
                    value={data.tagline}
                    maxLength={heroSection.tagline_max_length || 300}
                    onChange={(value) => setData('tagline', value)}
                    placeholder="Enter tagline"
                    error={errors.tagline}
                  />

                  <CharacterLimitInput
                    id="description"
                    label="Description"
                    value={data.description}
                    maxLength={heroSection.description_max_length || 1000}
                    onChange={(value) => setData('description', value)}
                    placeholder="Enter description"
                    multiline
                    rows={4}
                    error={errors.description}
                  />

                  <div className="space-y-2">
                    <Label htmlFor="image_url">Image</Label>
                    <Input
                      id="image_url"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          setData('image_url', file)
                          const reader = new FileReader()
                          reader.onloadend = () => {
                            setImagePreview(reader.result as string)
                          }
                          reader.readAsDataURL(file)
                        }
                      }}
                    />
                    {errors.image_url && <p className="text-sm text-red-600">{errors.image_url}</p>}
                    {imagePreview && (
                      <div className="mt-2">
                        <img
                          src={imagePreview}
                          alt="Image preview"
                          className="max-w-xs rounded-md border"
                        />
                      </div>
                    )}
                  </div>

                  {/* <div className="space-y-4">
                    <Label>Social Media Links</Label>
                    <p className="text-sm text-muted-foreground">
                      Add URLs for your social media profiles. Toggle each link on/off and customize labels.
                    </p>

                    {Object.entries(availablePlatforms).map(([platform, info]) => (
                      <div key={platform} className="space-y-2 rounded-lg border p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {editingLabel === platform ? (
                              <div className="flex items-center gap-2">
                                <Input
                                  value={tempLabel}
                                  onChange={(e) => setTempLabel(e.target.value)}
                                  className="h-7 w-32"
                                  maxLength={200}
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() => saveLabel(platform)}
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={cancelEditingLabel}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ) : (
                              <>
                                <Label htmlFor={platform} className="text-sm font-medium">
                                  {getPlatformLabel(platform)}
                                </Label>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => startEditingLabel(platform)}
                                >
                                  <Pencil className="h-3 w-3" />
                                </Button>
                              </>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              {isPlatformActive(platform) ? 'Active' : 'Inactive'}
                            </span>
                            <Switch
                              checked={isPlatformActive(platform)}
                              onCheckedChange={(checked) => handleToggleSocialLink(platform, checked)}
                              disabled={!data.social_links[platform]}
                            />
                          </div>
                        </div>
                        <Input
                          id={platform}
                          value={data.social_links[platform] || ''}
                          onChange={(e) => setData('social_links', { ...data.social_links, [platform]: e.target.value })}
                          placeholder={`https://${platform}.com/username`}
                          className={!isPlatformActive(platform) && data.social_links[platform] ? 'opacity-50' : ''}
                        />
                      </div>
                    ))}
                  </div> */}

                  {/* <div className="flex items-center space-x-2">
                    <Switch
                      id="is_active"
                      checked={data.is_active}
                      onCheckedChange={(checked) => setData('is_active', checked)}
                    />
                    <Label htmlFor="is_active">Active</Label>
                  </div> */}
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button type="submit" disabled={processing}>
                  {processing ? 'Updating...' : 'Update Hero Section'}
                </Button>
                <Link href="/admin/hero-sections">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}
