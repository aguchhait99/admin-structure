'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { useGetAllSupplierApplications, useGetSupplierApplication, useExportSupplierApplicationsCsv } from '@/api/hooks/supplier-application/hook';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function SuppliersPage() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedApplicationId, setSelectedApplicationId] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const { data: applicationDetail } = useGetSupplierApplication(selectedApplicationId || '');
  const exportCsv = useExportSupplierApplicationsCsv();

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

  const { data, isLoading } = useGetAllSupplierApplications({
    page,
    limit: 10,
    search: debouncedSearch,
    status: 'Active',
    sortField: 'createdAt',
    sortOrder: 'desc',
  });

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Supplier Applications</h1>
        <Button onClick={handleExportCsv} disabled={isExporting}>
          {isExporting ? 'Exporting...' : 'Download CSV'}
        </Button>
      </div>

      <Card className="shadow-sm border-0 bg-muted/30">
        <CardHeader className="pb-4 border-b">
          <div className="flex justify-end items-center">
            <Input
              placeholder="Search by email ..."
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
                  <TableHead className="font-semibold text-foreground">Name</TableHead>
                  <TableHead className="font-semibold text-foreground">Email</TableHead>
                  <TableHead className="font-semibold text-foreground">Company</TableHead>
                  <TableHead className="font-semibold text-foreground">Country</TableHead>
                  <TableHead className="font-semibold text-foreground">Business Type</TableHead>
                  <TableHead className="font-semibold text-foreground">Date</TableHead>
                  <TableHead className="font-semibold text-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                        <span className="text-muted-foreground">Loading supplier applications...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : data?.data?.docs?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12">
                      <div className="text-muted-foreground">
                        <p className="text-lg mb-2">No supplier applications found</p>
                        <p className="text-sm">Try adjusting your search criteria</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  data?.data?.docs?.map((application, index) => (
                    <TableRow
                      key={application._id}
                      className={`hover:bg-muted/50 transition-colors ${index % 2 === 0 ? 'bg-background' : 'bg-muted/10'
                      }`}
                    >
                      <TableCell className="py-4">
                        <div className="text-sm font-medium">{application?.firstName || application?.lastName ? `${application?.firstName} ${application?.lastName}` : 'N/A'}</div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="text-sm font-medium">{application.businessEmail}</div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="font-medium">{application.companyLegalName}</div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="text-sm">{application.countryOfRegistration}</div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="text-sm">{application.businessType}</div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="text-sm text-muted-foreground">
                          {new Date(application.createdAt).toLocaleDateString('en-US', {
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
                          onClick={() => setSelectedApplicationId(application._id)}
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

      <Dialog open={!!selectedApplicationId} onOpenChange={() => setSelectedApplicationId(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle>Supplier Application Details</DialogTitle>
          </DialogHeader>
          {applicationDetail?.data && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">1. Primary Contact Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-bold text-foreground">First Name</label>
                    <p className="text-sm">{applicationDetail.data.firstName || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-foreground">Last Name</label>
                    <p className="text-sm">{applicationDetail.data.lastName || 'N/A'}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">2. Company Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-bold text-foreground">Company legal name</label>
                    <p className="text-sm">{applicationDetail.data.companyLegalName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-foreground">Country of registration</label>
                    <p className="text-sm">{applicationDetail.data.countryOfRegistration}</p>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-foreground">Business email address</label>
                    <p className="text-sm">{applicationDetail.data.businessEmail}</p>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-foreground">Website</label>
                    <p className="text-sm">{applicationDetail.data.website || 'N/A'}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">3. Supplier Profile</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-bold text-foreground">Business type</label>
                    <p className="text-sm">{applicationDetail.data.businessType}</p>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-foreground">Industries / product categories</label>
                    <p className="text-sm">{applicationDetail.data.industries.join(', ')}</p>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-foreground">Years in operation</label>
                    <p className="text-sm">{applicationDetail.data.yearsInOperation}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">4. Trade Capacity (Key Filter)</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-bold text-foreground">Typical MOQ or minimum order value</label>
                      <p className="text-sm">{applicationDetail.data.typicalMOQ}</p>
                    </div>
                    <div>
                      <label className="text-sm font-bold text-foreground">Average order size you fulfil</label>
                      <p className="text-sm">{applicationDetail.data.averageOrderSize}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-foreground">Main export regions</label>
                    <p className="text-sm">{applicationDetail.data.mainExportRegions.join(', ')}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">5. Trade Readiness</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-bold text-foreground">Do you currently export internationally?</label>
                    <p className="text-sm">{applicationDetail.data.exportInternationally}</p>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-foreground">Are you able to provide proforma invoices and shipping documentation?</label>
                    <p className="text-sm">{applicationDetail.data.canProvideDocumentation}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">6. Compliance & Expectations</h3>
                <div>
                  <label className="text-sm font-bold text-foreground">Are you willing to complete business verification (KYB) before trading?</label>
                  <p className="text-sm">{applicationDetail.data.willingToCompleteKYB ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}