import { FormEventHandler, useState } from 'react'
import { Head, Link, useForm } from '@inertiajs/react'
import { toast } from 'sonner'
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft } from 'lucide-react'

export default function CreateAssociate() {
    const [logoPreview, setLogoPreview] = useState<string | null>(null)

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        logo_image: null as File | null,
        url: '',
        order: 0,
        is_active: true,
    })

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault()
        post('/admin/associates', {
            forceFormData: true,
            onSuccess: () => toast.success('Associate created successfully'),
            onError: () => toast.error('Failed to create associate'),
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
                <Head title="Add Associate" />

                <div className="container mx-auto py-8 px-4 max-w-2xl">
                    <div className="mb-8">
                        <Link
                            href="/admin/associates"
                            className="flex items-center text-muted-foreground hover:text-foreground mb-4"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Associates
                        </Link>
                        <h1 className="text-3xl font-bold text-foreground">Add Associate</h1>
                        <p className="text-muted-foreground mt-2">Add a new associate/partner organization</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Associate Details</CardTitle>
                                <CardDescription>Enter the associate/partner information</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Name *</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="e.g., Tech Partners Inc."
                                        className="mt-1"
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-destructive mt-1">{errors.name}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="logo_image">Logo Image *</Label>
                                    <Input
                                        id="logo_image"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0]
                                            if (file) {
                                                setData('logo_image', file)
                                                const reader = new FileReader()
                                                reader.onloadend = () => setLogoPreview(reader.result as string)
                                                reader.readAsDataURL(file)
                                            }
                                        }}
                                        className="mt-1"
                                    />
                                    {errors.logo_image && (
                                        <p className="text-sm text-destructive mt-1">{errors.logo_image}</p>
                                    )}
                                    {logoPreview && (
                                        <div className="mt-2">
                                            <img
                                                src={logoPreview}
                                                alt="Logo preview"
                                                className="h-20 object-contain rounded border p-2"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="url">Website URL</Label>
                                    <Input
                                        id="url"
                                        type="url"
                                        value={data.url}
                                        onChange={(e) => setData('url', e.target.value)}
                                        placeholder="https://example.com"
                                        className="mt-1"
                                    />
                                    {errors.url && (
                                        <p className="text-sm text-destructive mt-1">{errors.url}</p>
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
                            <Link href="/admin/associates">
                                <Button type="button" variant="outline">Cancel</Button>
                            </Link>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Creating...' : 'Create Associate'}
                            </Button>
                        </div>
                    </form>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
