import { FormEventHandler, useState } from 'react'
import { Head, Link, useForm, router } from '@inertiajs/react'
import { toast } from 'sonner'
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'

export default function CreateCertificate() {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { data, setData } = useForm({
    name: '',
    issuing_organization: '',
    issue_date: '',
    expiry_date: '',
    credential_id: '',
    credential_url: '',
    image: null as File | null,
    order: 0,
  })

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    setProcessing(true)

    router.post('/admin/certificates', data, {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Certificate created successfully')
        setProcessing(false)
      },
      onError: (errors) => {
        setErrors(errors)
        toast.error('Failed to create certificate')
        setProcessing(false)
      },
    })
  }

  return (
    <>
      <Head title="Create Certificate - Admin" />
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
              <Link href="/admin/certificates">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Create Certificate</h1>
                <p className="text-muted-foreground">Add a new certificate to your profile</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Certificate Details</CardTitle>
                  <CardDescription>Enter the details of your certificate</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Certificate Name *</Label>
                    <Input
                      id="name"
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                      placeholder="e.g., AWS Solutions Architect"
                      required
                    />
                    {errors.name && (
                      <p className="text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="issuing_organization">Issuing Organization *</Label>
                    <Input
                      id="issuing_organization"
                      value={data.issuing_organization}
                      onChange={(e) => setData('issuing_organization', e.target.value)}
                      placeholder="e.g., Amazon Web Services"
                      required
                    />
                    {errors.issuing_organization && (
                      <p className="text-sm text-red-600">{errors.issuing_organization}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="issue_date">Issue Date *</Label>
                      <Input
                        id="issue_date"
                        type="date"
                        value={data.issue_date}
                        onChange={(e) => setData('issue_date', e.target.value)}
                        required
                      />
                      {errors.issue_date && (
                        <p className="text-sm text-red-600">{errors.issue_date}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="expiry_date">Expiry Date (optional)</Label>
                      <Input
                        id="expiry_date"
                        type="date"
                        value={data.expiry_date}
                        onChange={(e) => setData('expiry_date', e.target.value)}
                      />
                      {errors.expiry_date && (
                        <p className="text-sm text-red-600">{errors.expiry_date}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="credential_id">Credential ID</Label>
                      <Input
                        id="credential_id"
                        value={data.credential_id}
                        onChange={(e) => setData('credential_id', e.target.value)}
                        placeholder="e.g., AWS-SAA-C03-123456"
                      />
                      {errors.credential_id && (
                        <p className="text-sm text-red-600">{errors.credential_id}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="order">Display Order</Label>
                      <Input
                        id="order"
                        type="number"
                        value={data.order}
                        onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
                        min={0}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="credential_url">Credential URL</Label>
                    <Input
                      id="credential_url"
                      value={data.credential_url}
                      onChange={(e) => setData('credential_url', e.target.value)}
                      placeholder="https://www.credential.net/..."
                    />
                    {errors.credential_url && (
                      <p className="text-sm text-red-600">{errors.credential_url}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Certificate Image</Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          setData('image', file)
                          const reader = new FileReader()
                          reader.onloadend = () => {
                            setImagePreview(reader.result as string)
                          }
                          reader.readAsDataURL(file)
                        }
                      }}
                    />
                    {errors.image && <p className="text-sm text-red-600">{errors.image}</p>}
                    {imagePreview && (
                      <div className="mt-2">
                        <img
                          src={imagePreview}
                          alt="Certificate preview"
                          className="max-w-xs rounded-md border"
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button type="submit" disabled={processing}>
                  {processing ? 'Creating...' : 'Create Certificate'}
                </Button>
                <Link href="/admin/certificates">
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
