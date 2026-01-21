'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { useFaqDelete, useFaqSave, useFaqStatusChange, useFaqUpdate, useGetAllFaq, useGetFaq } from '@/api/hooks/faq/hook';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import RichTextEditor from '@/components/ui/rich-text-editor';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';


const faqSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  answer: z.string().min(1, 'Answer is required'),
});

type FaqFormData = z.infer<typeof faqSchema>;

export default function FaqPage() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('All');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [statusChangeData, setStatusChangeData] = useState<{ id: string, currentStatus: string } | null>(null);
  const [selectedFaqId, setSelectedFaqId] = useState<string | null>(null);

  const faqSaveMutation = useFaqSave();
  const faqUpdateMutation = useFaqUpdate();
  const faqDeleteMutation = useFaqDelete();
  const faqStatusChangeMutation = useFaqStatusChange();
  const { data: faqDetail } = useGetFaq(selectedFaqId || '');

  const { register, handleSubmit, formState: { errors }, reset, setValue, control } = useForm<FaqFormData>({
    resolver: zodResolver(faqSchema),
  });

  const handleEdit = (faq: any) => {
    setSelectedFaqId(faq._id);
    setValue('question', faq.question);
    setValue('answer', faq.answer || '');
    setIsEditDialogOpen(true);
  };

  const handleView = (faqId: string) => {
    setSelectedFaqId(faqId);
    setIsViewDialogOpen(true);
  };

  const handleDelete = (faqId: string) => {
    setSelectedFaqId(faqId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedFaqId) {
      faqDeleteMutation.mutate(selectedFaqId, {
        onSuccess: () => {
          toast.success('FAQ deleted successfully');
          setIsDeleteDialogOpen(false);
          setSelectedFaqId(null);
        },
        onError: () => {
          toast.error('Failed to delete FAQ');
        },
      });
    }
  };

  const handleStatusChange = (faqId: string, currentStatus: string) => {
    setStatusChangeData({ id: faqId, currentStatus });
    setIsStatusDialogOpen(true);
  };

  const confirmStatusChange = () => {
    if (statusChangeData) {
      const newStatus = statusChangeData.currentStatus === 'Active' ? 'Inactive' : 'Active';
      faqStatusChangeMutation.mutate(
        { id: statusChangeData.id, status: newStatus },
        {
          onSuccess: () => {
            toast.success(`FAQ ${newStatus.toLowerCase()} successfully`);
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading } = useGetAllFaq({
    page,
    limit: 10,
    search: debouncedSearch,
    status: statusFilter === 'All' ? '' : statusFilter,
    sortField: 'createdAt',
    sortOrder: 'desc',
  });

  const onSubmit = (formData: FaqFormData) => {
    if (isEditDialogOpen && selectedFaqId) {
      faqUpdateMutation.mutate(
        { ...formData, id: selectedFaqId, type: 'FAQ' },
        {
          onSuccess: () => {
            toast.success('FAQ updated successfully');
            reset();
            setIsEditDialogOpen(false);
            setSelectedFaqId(null);
          },
          onError: () => {
            toast.error('Failed to update FAQ');
          },
        },
      );
    } else {
      faqSaveMutation.mutate({ ...formData, type: 'FAQ' }, {
        onSuccess: () => {
          toast.success('FAQ created successfully');
          reset();
          setIsAddDialogOpen(false);
        },
        onError: () => {
          toast.error('Failed to create FAQ');
        },
      });
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
        <h1 className="text-2xl font-bold">FAQ Management</h1>
        <Button onClick={() => {
          reset();
          setIsAddDialogOpen(true);
        }}>
          Add FAQ
        </Button>
      </div>

      <Card className="shadow-sm border-0 bg-muted/30">
        <CardHeader className="pb-4 border-b">
          <div className="flex justify-end items-center">
            <div className="flex gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Search FAQs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-sm"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/20 hover:bg-muted/20">
                  <TableHead className="font-semibold text-foreground">Question</TableHead>
                  <TableHead className="font-semibold text-foreground">Status</TableHead>
                  <TableHead className="font-semibold text-foreground">Date</TableHead>
                  <TableHead className="font-semibold text-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-12">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                        <span className="text-muted-foreground">Loading FAQs...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : data?.data?.docs?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-12">
                      <div className="text-muted-foreground">
                        <p className="text-lg mb-2">No FAQs found</p>
                        <p className="text-sm">Try adjusting your search criteria</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  data?.data?.docs?.map((faq, index) => (
                    <TableRow
                      key={faq._id}
                      className={`hover:bg-muted/50 transition-colors ${index % 2 === 0 ? 'bg-background' : 'bg-muted/10'
                      }`}
                    >
                      <TableCell className="py-4">
                        <div className="font-medium">{faq.question}</div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="cursor-pointer" onClick={() => handleStatusChange(faq._id, faq.status)}>
                          {getStatusBadge(faq.status)}
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="text-sm text-muted-foreground">
                          {new Date(faq.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleView(faq._id)}
                          >
                            View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(faq)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(faq._id)}
                          >
                            Delete
                          </Button>
                        </div>
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
                Showing {((page - 1) * 10) + 1} to {Math.min(page * 10, data.data.meta.totalDocs)} of {data.data.meta.totalDocs} entries
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

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New FAQ</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="question" className="mb-2 block">Question</Label>
              <Input
                {...register('question')}
                placeholder="Enter FAQ question"
              />
              {errors.question && (
                <p className="text-red-500 text-sm mt-1">{errors.question.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="answer" className="mb-2 block">Answer</Label>
              <Controller
                name="answer"
                control={control}
                render={({ field }) => (
                  <RichTextEditor
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Enter FAQ answer"
                  />
                )}
              />
              {errors.answer && (
                <p className="text-red-500 text-sm mt-1">{errors.answer.message}</p>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={faqSaveMutation.isPending}>
                {faqSaveMutation.isPending ? 'Creating...' : 'Create FAQ'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit FAQ</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="question" className="mb-2 block">Question</Label>
              <Input
                {...register('question')}
                placeholder="Enter FAQ question"
              />
              {errors.question && (
                <p className="text-red-500 text-sm mt-1">{errors.question.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="answer" className="mb-2 block">Answer</Label>
              <Controller
                name="answer"
                control={control}
                render={({ field }) => (
                  <RichTextEditor
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Enter FAQ answer"
                  />
                )}
              />
              {errors.answer && (
                <p className="text-red-500 text-sm mt-1">{errors.answer.message}</p>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={faqUpdateMutation.isPending}>
                {faqUpdateMutation.isPending ? 'Updating...' : 'Update FAQ'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle>FAQ Details</DialogTitle>
          </DialogHeader>
          {faqDetail?.data && (
            <div className="space-y-4">
              <div>
                <Label className="mb-2 block font-medium">Question</Label>
                <p className="text-sm">{faqDetail.data.question}</p>
              </div>
              <div>
                <Label className="mb-2 block font-medium">Answer</Label>
                <div
                  className="text-sm prose dark:prose-invert [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 break-words"
                  style={{
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                    wordBreak: 'break-word',
                  }}
                  dangerouslySetInnerHTML={{ __html: faqDetail.data.answer }}
                />
              </div>
              <div>
                <Label className="mb-2 block font-medium">Status</Label>
                <p className="text-sm">{getStatusBadge(faqDetail.data.status)}</p>
              </div>
            </div>
          )}

        </DialogContent>
      </Dialog>

      <AlertDialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Change Status</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to change this FAQ status to {statusChangeData?.currentStatus === 'Active' ? 'Inactive' : 'Active'}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmStatusChange} disabled={faqStatusChangeMutation.isPending}>
              {faqStatusChangeMutation.isPending ? 'Changing...' : 'Change Status'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete FAQ</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this FAQ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} disabled={faqDeleteMutation.isPending}>
              {faqDeleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}