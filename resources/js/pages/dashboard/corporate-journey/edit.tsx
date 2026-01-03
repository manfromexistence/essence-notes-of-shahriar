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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft } from 'lucide-react'

interface CorporateJourneyItem {
    id: number
    step_number: number
    title: string
    company: string
    description: string
    icon_image: string | null
    icon_url: string | null
    order: number
    is_active: boolean
}

interface Props {
    item: CorporateJourneyItem
}

export default function EditCorporateJourneyItem({ item }: Props) {
    const [imagePreview, setImagePreview] = useState<string | null>(item.icon_url || item.icon_image)
    const [processing, setProcessing] = useState(false)

    const { data, setData, errors } = useForm({
        step_number: item.step_number || 1,
        title: item.title || '',
        company: item.company || '',
        description: item.description || '',
        icon_image: null as File | null,
        order: item.order || 0,
        is_active: item.is_active ?? true,
    })

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault()
        setProcessing(true)
        router.post(`/admin/corporate-journey/${item.id}`, {
            ...data,
            _method: 'PUT',
        }, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Corporate journey item updated successfully')
                setProcessing(false)
            },
            onError: () => {
                toast.error('Failed to update corporate journey item')
                setProcessing(false)
            },
        })
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
                <Head title={`Edit ${item.title}`} />

                <div className="container mx-auto py-8 px-4 max-w-2xl">
                    <div className="mb-8">
                        <Link
                            href="/admin/corporate-journey"
                            className="flex items-center text-muted-foreground hover:text-foreground mb-4"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Corporate Journey
                        </Link>
                        <h1 className="text-3xl font-bold text-foreground">Edit Corporate Journey Item</h1>
                        <p className="text-muted-foreground mt-2">Update the corporate journey step information</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Journey Step Details</CardTitle>
                                <CardDescription>Edit the corporate journey step information</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="step_number">Step Number *</Label>
                                        <Input
                                            id="step_number"
                                            type="number"
                                            value={data.step_number}
                                            onChange={(e) => setData('step_number', parseInt(e.target.value) || 1)}
                                            min={1}
                                            className="mt-1"
                                        />
                                        {errors.step_number && (
                                            <p className="text-sm text-destructive mt-1">{errors.step_number}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="order">Display Order</Label>
                                        <Input
                                            id="order"
                                            type="number"
                                            value={data.order}
                                            onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
                                            className="mt-1"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="title">Title *</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="e.g., Founded Alpha Innovations"
                                        className="mt-1"
                                    />
                                    {errors.title && (
                                        <p className="text-sm text-destructive mt-1">{errors.title}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="company">Company *</Label>
                                    <Input
                                        id="company"
                                        value={data.company}
                                        onChange={(e) => setData('company', e.target.value)}
                                        placeholder="e.g., Alpha Innovations Ltd."
                                        className="mt-1"
                                    />
                                    {errors.company && (
                                        <p className="text-sm text-destructive mt-1">{errors.company}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="description">Description *</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Describe this step in the corporate journey..."
                                        rows={4}
                                        className="mt-1"
                                    />
                                    {errors.description && (
                                        <p className="text-sm text-destructive mt-1">{errors.description}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="icon_image">Icon/Logo Image</Label>
                                    <Input
                                        id="icon_image"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0]
                                            if (file) {
                                                setData('icon_image', file)
                                                const reader = new FileReader()
                                                reader.onloadend = () => setImagePreview(reader.result as string)
                                                reader.readAsDataURL(file)
                                            }
                                        }}
                                        className="mt-1"
                                    />
                                    {imagePreview && (
                                        <div className="mt-2">
                                            <img
                                                src={imagePreview || undefined}
                                                alt="Icon preview"
                                                className="h-20 object-contain rounded border"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="is_active"
                                        checked={data.is_active}
                                        onCheckedChange={(checked) => setData('is_active', checked)}
                                    />
                                    <Label htmlFor="is_active">Active</Label>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex justify-end gap-4">
                            <Link href="/admin/corporate-journey">
                                <Button type="button" variant="outline">Cancel</Button>
                            </Link>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Updating...' : 'Update Item'}
                            </Button>
                        </div>
                    </form>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
