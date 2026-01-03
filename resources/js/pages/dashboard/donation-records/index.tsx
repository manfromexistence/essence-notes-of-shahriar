import { useState } from 'react'
import { Head, Link, router, useForm } from '@inertiajs/react'
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MoreHorizontal, Trash2, Eye, Mail, Phone, DollarSign, Calendar, MessageSquare } from 'lucide-react'
import { toast } from 'sonner'

interface Donation {
  id: number
  title: string
}

interface DonationRecord {
  id: number
  donation_id: number | null
  donor_name: string
  donor_email: string
  donor_mobile: string | null
  amount: string
  message: string | null
  status: 'pending' | 'contacted' | 'completed' | 'cancelled'
  admin_notes: string | null
  created_at: string
  donation?: Donation
}

interface Props {
  records: DonationRecord[]
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  contacted: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
}

export default function DonationRecordsIndex({ records }: Props) {
  const [selectedRecord, setSelectedRecord] = useState<DonationRecord | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false)

  const statusForm = useForm({
    status: '' as string,
    admin_notes: '',
  })

  const safeRecords = Array.isArray(records) ? records : []

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this donation record?')) {
      router.delete(`/admin/donation-records/${id}`, {
        onSuccess: () => toast.success('Donation record deleted successfully'),
      })
    }
  }

  const handleViewRecord = (record: DonationRecord) => {
    setSelectedRecord(record)
    setIsViewModalOpen(true)
  }

  const handleStatusUpdate = (record: DonationRecord) => {
    setSelectedRecord(record)
    statusForm.setData({
      status: record.status,
      admin_notes: record.admin_notes || '',
    })
    setIsStatusModalOpen(true)
  }

  const submitStatusUpdate = () => {
    if (selectedRecord) {
      statusForm.post(`/admin/donation-records/${selectedRecord.id}/status`, {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Status updated successfully')
          setIsStatusModalOpen(false)
          setSelectedRecord(null)
        },
      })
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // Calculate stats
  const totalRecords = safeRecords.length
  const pendingRecords = safeRecords.filter(r => r.status === 'pending').length
  const completedRecords = safeRecords.filter(r => r.status === 'completed').length
  const totalAmount = safeRecords.reduce((sum, r) => sum + parseFloat(r.amount), 0)

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <Head title="Donation Records" />
        
        <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Donation Records</h1>
              <p className="text-muted-foreground">
                Manage donation interests submitted from the frontend
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Records</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalRecords}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <Calendar className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{pendingRecords}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <DollarSign className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{completedRecords}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalAmount.toLocaleString()}</div>
              </CardContent>
            </Card>
          </div>

          {/* Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Donation Records</CardTitle>
              <CardDescription>
                View and manage all donation interests from users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Donor</TableHead>
                    <TableHead>Campaign</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {safeRecords.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No donation records found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    safeRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.donor_name}</TableCell>
                        <TableCell>{record.donation?.title || 'General Donation'}</TableCell>
                        <TableCell className="font-semibold text-green-600">
                          ${parseFloat(record.amount).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1 text-sm">
                            <span className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {record.donor_email}
                            </span>
                            {record.donor_mobile && (
                              <span className="flex items-center gap-1">
                                <Phone className="h-3 w-3" />
                                {record.donor_mobile}
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            className={`${statusColors[record.status]} cursor-pointer`}
                            onClick={() => handleStatusUpdate(record)}
                          >
                            {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDate(record.created_at)}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewRecord(record)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusUpdate(record)}>
                                <Calendar className="mr-2 h-4 w-4" />
                                Update Status
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete(record.id)}
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
        </div>

        {/* View Modal */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Donation Record Details</DialogTitle>
              <DialogDescription>
                Full details of the donation interest
              </DialogDescription>
            </DialogHeader>
            {selectedRecord && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Donor Name</Label>
                    <p className="font-medium">{selectedRecord.donor_name}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Amount</Label>
                    <p className="font-medium text-green-600">
                      ${parseFloat(selectedRecord.amount).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Email</Label>
                    <p className="font-medium">{selectedRecord.donor_email}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Mobile</Label>
                    <p className="font-medium">{selectedRecord.donor_mobile || 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Campaign</Label>
                    <p className="font-medium">{selectedRecord.donation?.title || 'General Donation'}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Status</Label>
                    <Badge className={statusColors[selectedRecord.status]}>
                      {selectedRecord.status.charAt(0).toUpperCase() + selectedRecord.status.slice(1)}
                    </Badge>
                  </div>
                </div>
                {selectedRecord.message && (
                  <div>
                    <Label className="text-muted-foreground">Message</Label>
                    <p className="mt-1 p-3 bg-muted rounded-md">{selectedRecord.message}</p>
                  </div>
                )}
                {selectedRecord.admin_notes && (
                  <div>
                    <Label className="text-muted-foreground">Admin Notes</Label>
                    <p className="mt-1 p-3 bg-muted rounded-md">{selectedRecord.admin_notes}</p>
                  </div>
                )}
                <div>
                  <Label className="text-muted-foreground">Submitted At</Label>
                  <p className="font-medium">{formatDate(selectedRecord.created_at)}</p>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                Close
              </Button>
              <Button onClick={() => {
                setIsViewModalOpen(false)
                if (selectedRecord) handleStatusUpdate(selectedRecord)
              }}>
                Update Status
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Status Update Modal */}
        <Dialog open={isStatusModalOpen} onOpenChange={setIsStatusModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Status</DialogTitle>
              <DialogDescription>
                Update the status and add notes for this donation record
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={statusForm.data.status} 
                  onValueChange={(value) => statusForm.setData('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin_notes">Admin Notes</Label>
                <Textarea
                  id="admin_notes"
                  value={statusForm.data.admin_notes}
                  onChange={(e) => statusForm.setData('admin_notes', e.target.value)}
                  placeholder="Add any notes about this donation..."
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsStatusModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={submitStatusUpdate} disabled={statusForm.processing}>
                {statusForm.processing ? 'Saving...' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SidebarInset>
    </SidebarProvider>
  )
}
