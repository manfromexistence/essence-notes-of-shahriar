import { useState } from 'react'
import { Head, router } from '@inertiajs/react'
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Pencil, Trash2, Plus } from 'lucide-react'

interface SocialMediaLink {
  id: number
  platform: string
  label: string
  url: string
  icon: string
  order: number
  is_active: boolean
}

interface AvailablePlatform {
  label: string
  icon: string
}

interface Props {
  socialLinks: SocialMediaLink[]
  availablePlatforms: Record<string, AvailablePlatform>
  displayLimit: number
  indexPageSettingId: number | null
}

interface SortableItemProps {
  link: SocialMediaLink
  onEdit: (link: SocialMediaLink) => void
  onDelete: (id: number) => void
  onToggleActive: (id: number, isActive: boolean) => void
  isToggling: boolean
}

function SortableItem({ link, onEdit, onDelete, onToggleActive, isToggling }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: link.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} className="bg-card border border-border rounded-lg p-3 md:p-4 mb-3 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
        <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing self-center sm:self-auto">
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
          <div>
            <p className="text-xs sm:text-sm font-medium text-muted-foreground">Platform</p>
            <p className="text-sm sm:text-base font-semibold text-foreground capitalize">{link.platform}</p>
          </div>
          <div>
            <p className="text-xs sm:text-sm font-medium text-muted-foreground">Label</p>
            <p className="text-sm sm:text-base text-foreground">{link.label}</p>
          </div>
          <div className="sm:col-span-2 lg:col-span-2">
            <p className="text-xs sm:text-sm font-medium text-muted-foreground">URL</p>
            <p className="text-sm sm:text-base text-foreground truncate">{link.url}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Switch
            checked={link.is_active}
            disabled={isToggling}
            onCheckedChange={(checked) => onToggleActive(link.id, checked)}
          />
          <Button variant="ghost" size="icon" onClick={() => onEdit(link)}>
            <Pencil className="h-4 w-4 text-foreground" />
          </Button>
          <Button variant="destructive" size="icon" onClick={() => onDelete(link.id)}>
            <Trash2 className="h-4 w-4 text-white" />
          </Button>
        </div>
      </div>
    </div>
  )
}


export default function SocialMediaLinksIndex({ socialLinks: initialLinks, availablePlatforms, displayLimit: initialDisplayLimit, indexPageSettingId }: Props) {
  const [links, setLinks] = useState<SocialMediaLink[]>(initialLinks)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingLink, setEditingLink] = useState<SocialMediaLink | null>(null)
  const [displayLimit, setDisplayLimit] = useState(initialDisplayLimit)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [togglingId, setTogglingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    platform: '',
    label: '',
    url: '',
    icon: '',
    is_active: true,
  })

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) {
      return
    }

    const oldIndex = links.findIndex((link) => link.id === active.id)
    const newIndex = links.findIndex((link) => link.id === over.id)

    const newLinks = arrayMove(links, oldIndex, newIndex)
    setLinks(newLinks)

    const orders = newLinks.map((link, index) => ({
      id: link.id,
      order: index,
    }))

    try {
      const response = await fetch('/admin/social-media-links/reorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        body: JSON.stringify({ orders }),
      })

      const result = await response.json()

      if (!response.ok) {
        toast.error(result.message || 'Failed to update order')
        setLinks(initialLinks)
        return
      }

      if (result.success) {
        toast.success('Order updated successfully')
      } else {
        toast.error(result.message || 'Failed to update order')
        setLinks(initialLinks)
      }
    } catch (error) {
      console.error('Reorder error:', error)
      toast.error('An error occurred while updating order')
      setLinks(initialLinks)
    }
  }

  const openCreateDialog = () => {
    setEditingLink(null)
    setFormData({
      platform: '',
      label: '',
      url: '',
      icon: '',
      is_active: true,
    })
    setIsDialogOpen(true)
  }

  const openEditDialog = (link: SocialMediaLink) => {
    setEditingLink(link)
    setFormData({
      platform: link.platform,
      label: link.label,
      url: link.url,
      icon: link.icon || link.platform,
      is_active: link.is_active,
    })
    setIsDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingLink) {
        const submitData = {
          platform: formData.platform,
          label: formData.label,
          url: formData.url,
          icon: formData.icon || formData.platform,
          is_active: Boolean(formData.is_active),
          _method: 'PUT',
        }

        const response = await fetch(`/admin/social-media-links/${editingLink.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
          },
          body: JSON.stringify(submitData),
        })

        const result = await response.json()
        if (result.success) {
          // Update local state immediately
          setLinks(links.map(link =>
            link.id === editingLink.id
              ? { ...link, ...submitData, id: editingLink.id, order: link.order }
              : link
          ))
          toast.success('Social media link updated successfully')
          setIsDialogOpen(false)
          setEditingLink(null)
        } else {
          toast.error(result.message || 'Failed to update social media link')
        }
      } else {
        const response = await fetch('/admin/social-media-links', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
          },
          body: JSON.stringify(formData),
        })

        const result = await response.json()
        if (result.success) {
          toast.success('Social media link created successfully')
          router.reload()
        } else {
          toast.error(result.message || 'Failed to create social media link')
        }
        setIsDialogOpen(false)
      }
    } catch (error) {
      toast.error('An error occurred')
    }
  }

  const openDeleteDialog = (id: number) => {
    setDeletingId(id)
    setDeleteDialogOpen(true)
  }

  const handleDelete = async () => {
    if (!deletingId) return

    setIsDeleting(true)
    try {
      const response = await fetch(`/admin/social-media-links/${deletingId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        body: JSON.stringify({ _method: 'DELETE' }),
      })

      const result = await response.json()
      if (result.success) {
        toast.success('Social media link deleted successfully')
        setLinks(links.filter(link => link.id !== deletingId))
      } else {
        toast.error(result.message || 'Failed to delete social media link')
      }
    } catch (error) {
      toast.error('An error occurred')
    } finally {
      setIsDeleting(false)
      setDeleteDialogOpen(false)
      setDeletingId(null)
    }
  }

  const handleToggleActive = async (id: number, isActive: boolean) => {
    setTogglingId(id)
    // Optimistically update UI
    setLinks(links.map(link =>
      link.id === id ? { ...link, is_active: isActive } : link
    ))

    try {
      const response = await fetch(`/admin/social-media-links/${id}/toggle-active`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        body: JSON.stringify({ is_active: isActive }),
      })

      const result = await response.json()
      if (result.success) {
        toast.success(`Social media link ${isActive ? 'activated' : 'deactivated'} successfully`)
      } else {
        // Revert on failure
        setLinks(links.map(link =>
          link.id === id ? { ...link, is_active: !isActive } : link
        ))
        toast.error(result.message || 'Failed to update status')
      }
    } catch (error) {
      // Revert on error
      setLinks(links.map(link =>
        link.id === id ? { ...link, is_active: !isActive } : link
      ))
      toast.error('An error occurred')
    } finally {
      setTogglingId(null)
    }
  }

  const handlePlatformChange = (platform: string) => {
    const platformInfo = availablePlatforms[platform]
    setFormData({
      ...formData,
      platform,
      label: platformInfo?.label || platform,
      icon: platformInfo?.icon || platform,
    })
  }

  const handleUpdateDisplayLimit = async (newLimit: number) => {
    if (!indexPageSettingId) {
      toast.error('Index page setting not found')
      return
    }

    try {
      const response = await fetch('/admin/social-media-links/update-display-limit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        body: JSON.stringify({
          display_limit: newLimit,
          index_page_setting_id: indexPageSettingId
        }),
      })

      const result = await response.json()
      if (result.success) {
        setDisplayLimit(newLimit)
        toast.success('Display limit updated successfully')
      } else {
        toast.error(result.message || 'Failed to update display limit')
      }
    } catch (error) {
      toast.error('An error occurred')
    }
  }


  return (
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
        <Head title="Social Media Links Management" />

        <div className="max-w-6xl mx-auto py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex-1">
                  <CardTitle className="text-xl sm:text-2xl">Social Media Links</CardTitle>
                  <CardDescription className="text-sm sm:text-base mt-1.5">
                    Manage your social media links. Drag to reorder. Only the first {displayLimit} active link{displayLimit !== 1 ? 's' : ''} will be shown on the
                    homepage.
                  </CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="displayLimit" className="text-sm whitespace-nowrap">Show on Homepage:</Label>
                    <Select
                      value={displayLimit.toString()}
                      onValueChange={(value) => handleUpdateDisplayLimit(parseInt(value))}
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={openCreateDialog} className="w-full sm:w-auto">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Social Link
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {links.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No social media links found. Click "Add Social Link" to create one.
                </div>
              ) : (
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                  <SortableContext items={links.map((link) => link.id)} strategy={verticalListSortingStrategy}>
                    {links.map((link) => (
                      <SortableItem
                        key={link.id}
                        link={link}
                        onEdit={openEditDialog}
                        onDelete={openDeleteDialog}
                        onToggleActive={handleToggleActive}
                        isToggling={togglingId === link.id}
                      />
                    ))}
                  </SortableContext>
                </DndContext>
              )}
            </CardContent>
          </Card>

          {/* Create/Edit Dialog */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-w-lg w-[95vw] sm:w-full max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-lg sm:text-xl">{editingLink ? 'Edit Social Media Link' : 'Add Social Media Link'}</DialogTitle>
                <DialogDescription className="text-sm sm:text-base">
                  {editingLink
                    ? 'Update the social media link details below.'
                    : 'Fill in the details to add a new social media link.'}
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="platform">Platform</Label>
                  <Select
                    value={formData.platform}
                    onValueChange={handlePlatformChange}
                    disabled={!!editingLink}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a platform" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(availablePlatforms).map(([key, platform]) => (
                        <SelectItem key={key} value={key}>
                          {platform.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="label">Label</Label>
                  <Input
                    id="label"
                    value={formData.label}
                    onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="url">URL</Label>
                  <Input
                    id="url"
                    type="url"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    placeholder="https://example.com/profile"
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                  <Label htmlFor="is_active">Active</Label>
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">{editingLink ? 'Update' : 'Create'}</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Social Media Link</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this social media link? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="bg-destructive text-white hover:bg-destructive/90"
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
