'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { mediaUrl } from '@/api/endpoints/endpoints';
import { useGetContactUsCms, useUpdateContactUsCms } from '@/api/hooks/contact-us-cms/hook';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function ContactUsCmsPage() {
  const [pageTitle, setPageTitle] = useState('');
  const [headerText, setHeaderText] = useState('');
  const [description, setDescription] = useState('');
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>('');

  const { data, isLoading } = useGetContactUsCms();
  const updateMutation = useUpdateContactUsCms();

  useEffect(() => {
    if (data?.data) {
      setPageTitle(data.data.pageTitle);
      setHeaderText(data.data.headerText);
      setDescription(data.data.description);
      if (data.data.bannerImage) {
        setPreviewImage(mediaUrl(data.data.bannerImage, 'contact-us-cms'));
      }
    }
  }, [data]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data?.data?._id) return;

    try {
      await updateMutation.mutateAsync({
        id: data.data._id,
        pageTitle,
        headerText,
        description,
        bannerImage: bannerImage || undefined,
      });
      toast.success('Contact Us CMS updated successfully');
    } catch (error) {
      toast.error('Failed to update Contact Us CMS');
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Contact Us CMS</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Update Contact Us Page Content</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="pageTitle">Page Title</Label>
              <Input
                id="pageTitle"
                value={pageTitle}
                onChange={(e) => setPageTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="headerText">Header Text</Label>
              <Input
                id="headerText"
                value={headerText}
                onChange={(e) => setHeaderText(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bannerImage">Banner Image</Label>
              <Input
                id="bannerImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {previewImage && (
                <div className="mt-2">
                  <Image
                    src={previewImage}
                    alt="Banner preview"
                    width={300}
                    height={150}
                    className="rounded-md object-cover"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={updateMutation.isPending}>
                {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

