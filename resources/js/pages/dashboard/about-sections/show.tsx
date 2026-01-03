import { Head, Link } from '@inertiajs/react'
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'

interface AboutSection {
  id: number
  section_type: string
  title: string
  content: string | null
  image: string | null
  additional_data: any
  order: number
  is_active: boolean
}

interface Props {
  aboutSection: AboutSection
}

export default function ShowAboutSection({ aboutSection }: Props) {
  return (
    <>
      <Head title={`${aboutSection.title} - Admin`} />
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
              <Link href="/admin/about-sections">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{aboutSection.title}</h1>
                <p className="text-muted-foreground">View about section details</p>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Section Details</CardTitle>
                <CardDescription>Details of the about section</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <strong>Section Type:</strong> {aboutSection.section_type}
                </div>

                <div className="space-y-2">
                  <strong>Title:</strong> {aboutSection.title}
                </div>

                <div className="space-y-2">
                  <strong>Content:</strong>
                  <div className="whitespace-pre-wrap">{aboutSection.content}</div>
                </div>

                {aboutSection.image && (
                  <div className="space-y-2">
                    <strong>Image:</strong>
                    <img src={aboutSection.image} alt={aboutSection.title} className="max-w-xs" />
                  </div>
                )}

                {aboutSection.additional_data && (
                  <div className="space-y-2">
                    <strong>Additional Data:</strong>
                    <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(aboutSection.additional_data, null, 2)}</pre>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <strong>Display Order:</strong> {aboutSection.order}
                  </div>

                  <div className="space-y-2">
                    <strong>Active:</strong> {aboutSection.is_active ? 'Yes' : 'No'}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Link href={`/admin/about-sections/${aboutSection.section_type}/edit`}>
                <Button type="button">Edit Section</Button>
              </Link>
              <Link href="/admin/about-sections">
                <Button type="button" variant="outline">Back to List</Button>
              </Link>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}