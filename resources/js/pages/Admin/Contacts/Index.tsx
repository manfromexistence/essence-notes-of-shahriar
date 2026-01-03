import { Head, Link, router } from '@inertiajs/react'
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Eye, Trash2, Mail, MailOpen } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Contact {
  id: number
  first_name: string
  last_name: string
  email: string
  phone: string | null
  message: string
  is_read: boolean
  status: string
  created_at: string
  updated_at: string
}

interface Props {
  contacts: {
    data: Contact[]
    links: any[]
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}

export default function ContactsIndex({ contacts }: Props) {
  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this contact message?')) {
      router.delete(`/admin/contacts/${id}`)
    }
  }

  const handleStatusChange = (id: number, newStatus: string) => {
    router.put(`/admin/contacts/${id}`, {
      status: newStatus,
    }, {
      preserveScroll: true,
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100'
      case 'new':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100'
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
      case 'in_progress':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-100'
      case 'resolved':
        return 'bg-green-100 text-green-800 hover:bg-green-100'
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100'
    }
  }

  return (
    <>
      <Head title="Contact Messages - Admin" />
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
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Contact Messages</h1>
                <p className="text-muted-foreground">
                  Manage contact form submissions from your website
                </p>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Messages</CardTitle>
                <CardDescription>
                  {contacts.total} total message{contacts.total !== 1 ? 's' : ''}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Status</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contacts.data.length > 0 ? (
                      contacts.data.map((contact) => (
                        <TableRow key={contact.id} className={!contact.is_read ? 'bg-muted/50' : ''}>
                          <TableCell>
                            <Select
                              defaultValue={contact.status}
                              onValueChange={(value) => handleStatusChange(contact.id, value)}
                            >
                              <SelectTrigger className={`w-[130px] h-8 ${getStatusColor(contact.status)} border-0`}>
                                <SelectValue placeholder="Status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="new">New</SelectItem>
                                <SelectItem value="contacted">Approached</SelectItem>
                                <SelectItem value="in_progress">In Progress</SelectItem>
                                <SelectItem value="resolved">Resolved</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              {!contact.is_read && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                              {contact.first_name} {contact.last_name}
                            </div>
                          </TableCell>
                          <TableCell>{contact.email}</TableCell>
                          <TableCell className="max-w-[300px] truncate" title={contact.message}>
                            {contact.message}
                          </TableCell>
                          <TableCell className="whitespace-nowrap">
                            {formatDistanceToNow(new Date(contact.created_at), {
                              addSuffix: true,
                            })}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Link href={`/admin/contacts/${contact.id}`}>
                                <Button size="icon" variant="ghost" title="View Details">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </Link>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="text-destructive hover:text-destructive"
                                onClick={() => handleDelete(contact.id)}
                                title="Delete"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No results.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>

                {/* Pagination */}
                {contacts.last_page > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-6">
                    {contacts.links.map((link, index) => (
                      <Button
                        key={index}
                        size="sm"
                        variant={link.active ? 'default' : 'outline'}
                        disabled={!link.url}
                        onClick={() => link.url && router.visit(link.url)}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}
