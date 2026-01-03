import { FormEventHandler, useState } from 'react'
import { Head, Link, useForm, router } from '@inertiajs/react'
import { toast } from 'sonner'
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'

interface Video {
  id: number
  title: string
  description: string | null
  video_url: string
  thumbnail: string | null
  platform: string | null
  category: string | null
  duration: string | null
  is_short: boolean
  views: number
  publish_date: string | null
  order: number
}

interface Props {
  video: Video
}

// Helper function to format date for HTML input
const formatDateForInput = (dateValue: string | null): string => {
  if (!dateValue) return new Date().toISOString().split('T')[0]
  try {
    const date = new Date(dateValue)
    if (isNaN(date.getTime())) return new Date().toISOString().split('T')[0]
    return date.toISOString().split('T')[0]
  } catch {
    return new Date().toISOString().split('T')[0]
  }
}

export default function EditVideo({ video }: Props) {
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(video.thumbnail)
  const [processing, setProcessing] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)

  const { data, setData } = useForm({
    title: video.title || '',
    description: video.description || '',
    video_url: video.video_url || '',
    platform: video.platform || 'YouTube',
    category: video.category || '',
    duration: video.duration || '',
    is_short: video.is_short || false,
    views: video.views || 0,
    publish_date: formatDateForInput(video.publish_date),
    order: video.order || 0,
  })

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    setProcessing(true)
    
    // Prepare form data, only include thumbnail if a new file is selected
    const formData: Record<string, any> = {
      title: data.title,
      description: data.description,
      video_url: data.video_url,
      platform: data.platform,
      category: data.category,
      duration: data.duration,
      is_short: data.is_short,
      views: data.views,
      publish_date: data.publish_date,
      order: data.order,
      _method: 'PUT',
    }

    // Only include thumbnail if a new file is selected
    if (thumbnailFile) {
      formData.thumbnail = thumbnailFile
    }
    
    router.post(`/admin/videos/${video.id}`, formData, {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Video updated successfully')
        setProcessing(false)
      },
      onError: (errors) => {
        setErrors(errors)
        toast.error('Failed to update video')
        setProcessing(false)
      },
    })
  }

  return (
    <>
      <Head title={`Edit ${video.title} - Admin`} />
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
              <Link href="/admin/videos">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Edit Video</h1>
                <p className="text-muted-foreground">Update your video</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Video Details</CardTitle>
                  <CardDescription>Edit the details of your video</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={data.title}
                      onChange={(e) => setData('title', e.target.value)}
                      placeholder="Enter video title"
                      required
                    />
                    {errors.title && (
                      <p className="text-sm text-red-600">{errors.title}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={data.description}
                      onChange={(e) => setData('description', e.target.value)}
                      placeholder="Enter video description"
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="video_url">Video URL</Label>
                    <Input
                      id="video_url"
                      value={data.video_url}
                      onChange={(e) => setData('video_url', e.target.value)}
                      placeholder="https://youtube.com/watch?v=..."
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="thumbnail">Thumbnail</Label>
                    <Input
                      id="thumbnail"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          setThumbnailFile(file)
                          const reader = new FileReader()
                          reader.onloadend = () => {
                            setThumbnailPreview(reader.result as string)
                          }
                          reader.readAsDataURL(file)
                        } else {
                          setThumbnailFile(null)
                          setThumbnailPreview(video.thumbnail)
                        }
                      }}
                    />
                    {errors.thumbnail && <p className="text-sm text-red-600">{errors.thumbnail}</p>}
                    
                    {/* Current Thumbnail Preview */}
                    {thumbnailPreview && (
                      <div className="mt-2 space-y-2">
                        <p className="text-sm text-muted-foreground">Current Thumbnail:</p>
                        <img
                          src={thumbnailPreview}
                          alt="Thumbnail preview"
                          className="max-w-xs rounded-md border shadow-sm"
                          onError={(e) => {
                            // If image fails to load, hide it
                            (e.target as HTMLImageElement).style.display = 'none'
                          }}
                        />
                      </div>
                    )}
                    {!thumbnailPreview && video.thumbnail && (
                      <div className="mt-2 space-y-2">
                        <p className="text-sm text-muted-foreground">Current Thumbnail:</p>
                        <img
                          src={video.thumbnail}
                          alt="Current thumbnail"
                          className="max-w-xs rounded-md border shadow-sm"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none'
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="platform">Platform</Label>
                      <Input
                        id="platform"
                        value={data.platform}
                        onChange={(e) => setData('platform', e.target.value)}
                        placeholder="YouTube, Vimeo, etc."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        value={data.category}
                        onChange={(e) => setData('category', e.target.value)}
                        placeholder="e.g., Tutorial, Vlog"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration (e.g., 10:30)</Label>
                      <Input
                        id="duration"
                        value={data.duration}
                        onChange={(e) => setData('duration', e.target.value)}
                        placeholder="10:30"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="views">Views</Label>
                      <Input
                        id="views"
                        type="number"
                        value={data.views}
                        onChange={(e) => setData('views', parseInt(e.target.value) || 0)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="publish_date">Publish Date</Label>
                    <Input
                      id="publish_date"
                      type="date"
                      value={data.publish_date}
                      onChange={(e) => setData('publish_date', e.target.value)}
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_short"
                      checked={data.is_short}
                      onCheckedChange={(checked) => setData('is_short', checked)}
                    />
                    <Label htmlFor="is_short">Short Video (&lt; 60 seconds)</Label>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button type="submit" disabled={processing}>
                  {processing ? 'Updating...' : 'Update Video'}
                </Button>
                <Link href="/admin/videos">
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
