'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { useCmsStatusChange, useGetAllCms } from '@/api/hooks/cms/hook';
import { ICmsDoc } from '@/api/hooks/cms/schema';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function PageManagementPage() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [statusChangeData, setStatusChangeData] = useState<{ id: string, currentStatus: string } | null>(null);
  const router = useRouter();
  const statusChangeMutation = useCmsStatusChange();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading } = useGetAllCms({
    page,
    limit: 10,
    search: debouncedSearch,
    status: '',
    sortField: 'createdAt',
    sortOrder: 'desc',
  });

  const handleStatusChange = (id: string, currentStatus: string) => {
    setStatusChangeData({ id, currentStatus });
    setIsStatusDialogOpen(true);
  };

  const confirmStatusChange = () => {
    if (statusChangeData) {
      const newStatus = statusChangeData.currentStatus === 'Active' ? 'Inactive' : 'Active';
      statusChangeMutation.mutate(
        { id: statusChangeData.id, status: newStatus },
        {
          onSuccess: () => {
            toast.success(`Page ${newStatus.toLowerCase()} successfully`);
            setIsStatusDialogOpen(false);
            setStatusChangeData(null);
          },
          onError: () => {
            toast.error('Failed to change status');
          },
        },
      );
    }
  };

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
        <h1 className="text-2xl font-bold">Page Management</h1>
      </div>

      <Card className="shadow-sm border-0 bg-muted/30">
        <CardHeader className="pb-4 border-b">
          <div className="flex justify-end items-center">
            <Input
              placeholder="Search pages..."
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
                  <TableHead className="font-semibold text-foreground">Title</TableHead>
                  <TableHead className="font-semibold text-foreground">Slug</TableHead>
                  <TableHead className="font-semibold text-foreground">Status</TableHead>
                  <TableHead className="font-semibold text-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-12">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                        <span className="text-muted-foreground">Loading pages...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : data?.data?.docs?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-12">
                      <div className="text-muted-foreground">
                        <p className="text-lg mb-2">No pages found</p>
                        <p className="text-sm">Try adjusting your search criteria</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  data?.data?.docs?.map((pageItem: ICmsDoc, index: number) => (
                    <TableRow
                      key={pageItem._id}
                      className={`hover:bg-muted/50 transition-colors ${index % 2 === 0 ? 'bg-background' : 'bg-muted/10'
                      }`}
                    >
                      <TableCell className="py-4">
                        <div className="text-sm font-medium">{pageItem.title}</div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="text-sm">{pageItem.slug}</div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="cursor-pointer" onClick={() => handleStatusChange(pageItem._id, pageItem.status)}>
                          {getStatusBadge(pageItem.status)}
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => router.push(`/dashboard/page-management/${pageItem._id}`)}
                        >
                          Edit
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
                Showing {(page - 1) * 10 + 1} to {Math.min(page * 10, data.data.meta.totalDocs)} of{' '}
                {data.data.meta.totalDocs} entries
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
    </div>
  );
}