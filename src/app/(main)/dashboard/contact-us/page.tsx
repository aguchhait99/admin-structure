'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { useGetAllContactUs, useGetContactUs, useExportContactUsCsv } from '@/api/hooks/contact-us/hook';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function ContactUsPage() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState<'All' | 'Buyer' | 'Seller'>('All');
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const exportCsv = useExportContactUsCsv();

  const handleExportCsv = async () => {
    setIsExporting(true);
    try {
      await exportCsv();
      toast.success('CSV exported successfully');
    } catch (error) {
      toast.error('Failed to export CSV');
    } finally {
      setIsExporting(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading } = useGetAllContactUs({
    page,
    limit: 10,
    search: debouncedSearch,
    type: typeFilter === 'All' ? '' : typeFilter,
    sortField: 'createdAt',
    sortOrder: 'desc',
  });

  const { data: contactDetail } = useGetContactUs(selectedContactId || '');

  const getStatusBadge = (status: string) => {
    const variants = {
      Active: 'default',
      Inactive: 'secondary',
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'secondary'}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Contact us</h1>
        <Button onClick={handleExportCsv} disabled={isExporting}>
          {isExporting ? 'Exporting...' : 'Download CSV'}
        </Button>
      </div>

      <Card className="shadow-sm border-0 bg-muted/30">
        <CardHeader className="pb-4 border-b">
          <div className="flex justify-between items-center gap-3 flex-wrap">
            <div className="flex gap-3">
              <Select value={typeFilter} onValueChange={(val: 'All' | 'Buyer' | 'Seller') => setTypeFilter(val)}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All types</SelectItem>
                  <SelectItem value="Buyer">Buyer</SelectItem>
                  <SelectItem value="Seller">Seller</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Input
              placeholder="Search by name, email ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/20 hover:bg-muted/20">
                  <TableHead className="font-semibold text-foreground">Type</TableHead>
                  <TableHead className="font-semibold text-foreground">Name</TableHead>
                  <TableHead className="font-semibold text-foreground">Email</TableHead>
                  <TableHead className="font-semibold text-foreground">Subject</TableHead>
                  <TableHead className="font-semibold text-foreground">Date</TableHead>
                  <TableHead className="font-semibold text-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary" />
                        <span className="text-muted-foreground">Loading contact requests...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : data?.data?.docs?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12">
                      <div className="text-muted-foreground">
                        <p className="text-lg mb-2">No contact requests found</p>
                        <p className="text-sm">Try adjusting your filters or search</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  data?.data?.docs?.map((contact, index) => (
                    <TableRow
                      key={contact._id}
                      className={`hover:bg-muted/50 transition-colors ${index % 2 === 0 ? 'bg-background' : 'bg-muted/10'
                      }`}
                    >
                      <TableCell className="py-4">
                        <span className="text-sm font-medium">{contact.type}</span>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="font-medium">
                          {contact.firstName} {contact.lastName}
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="text-sm">{contact.email}</div>
                      </TableCell>
                      <TableCell className="py-4 max-w-xs">
                        <div className="text-sm truncate" title={contact.subject}>
                          {contact.subject}
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="text-sm text-muted-foreground">
                          {new Date(contact.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedContactId(contact._id)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  )) || []
                )}
              </TableBody>
            </Table>
          </div>
          {data?.data?.meta && (
            <div className="flex items-center justify-between px-6 py-4 border-t">
              <div className="text-sm text-muted-foreground">
                Showing {(page - 1) * 10 + 1} to{' '}
                {Math.min(page * 10, data.data.meta.totalDocs)} of {data.data.meta.totalDocs} entries
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(page - 1)}
                  disabled={!data.data.meta.hasPrevPage}
                >
                  Previous
                </Button>
                <span className="text-sm font-medium">
                  Page {page} of {Math.ceil(data.data.meta.totalDocs / 10)}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(page + 1)}
                  disabled={!data.data.meta.hasNextPage}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selectedContactId} onOpenChange={() => setSelectedContactId(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="font-bold">Contact details</DialogTitle>
          </DialogHeader>
          {contactDetail?.data && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-bold text-foreground">Type</Label>
                  <p className="text-sm font-medium mt-1">{contactDetail.data.type}</p>
                </div>
                <div>
                  <Label className="text-sm font-bold text-foreground">Status</Label>
                  <div className="mt-1">{getStatusBadge(contactDetail.data.status)}</div>
                </div>
                <div>
                  <Label className="text-sm font-bold text-foreground">Name</Label>
                  <p className="text-sm font-medium mt-1">
                    {contactDetail.data.firstName} {contactDetail.data.lastName}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-bold text-foreground">Email</Label>
                  <p className="text-sm mt-1">{contactDetail.data.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-bold text-foreground">Received On</Label>
                  <p className="text-sm mt-1">
                    {new Date(contactDetail.data.createdAt).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-bold text-foreground">Subject</Label>
                <p className="text-sm font-medium mt-1">{contactDetail.data.subject}</p>
              </div>
              <div>
                <Label className="text-sm font-bold text-foreground">Message</Label>
                <p className="text-sm mt-1 whitespace-pre-wrap break-words">
                  {contactDetail.data.message}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div >
  );
}


