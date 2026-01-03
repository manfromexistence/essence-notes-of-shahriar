import { useState } from 'react'
import { Head, Link, router } from '@inertiajs/react'
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { MoreHorizontal, Plus, Pencil, Trash2 } from 'lucide-react'

interface HeroSection {
  id: number
  title: string
  subtitle: string
  description: string
  is_active: boolean
  order: number
}

interface Props {
  heroSections: HeroSection[]
}

export default function HeroSectionsIndex({ heroSections }: Props) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Hero Section Settings</h1>
              <p className="text-muted-foreground">
                Manage your homepage hero section
              </p>
            </div>
          </div>

          {heroSections.length === 0 ? (
            <Card className="rounded-md border">
              <CardContent className="text-center py-16">
                <p className="text-muted-foreground mb-4">
                  No hero section found. Create your first one!
                </p>
                <Link href="/admin/hero-sections/create">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Hero Section
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <Card className="rounded-md border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold">{heroSections[0].title}</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {heroSections[0].subtitle}
                    </p>
                  </div>
                  <Badge variant={heroSections[0].is_active ? 'default' : 'secondary'}>
                    {heroSections[0].is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Description</p>
                    <p className="text-sm mt-1">{heroSections[0].description}</p>
                  </div>
                  <div className="pt-4 border-t">
                    <Link href={`/admin/hero-sections/${heroSections[0].id}/edit`}>
                      <Button className="w-full sm:w-auto">
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit Hero Section
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
