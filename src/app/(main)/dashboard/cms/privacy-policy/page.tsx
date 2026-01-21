'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { useGetCmsBySlug, useCmsUpdate } from '@/api/hooks/cms/hook';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import RichTextEditor from '@/components/ui/rich-text-editor';

export default function PrivacyPolicyPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { data, isLoading } = useGetCmsBySlug('privacy-policy');
  const updateMutation = useCmsUpdate();

  useEffect(() => {
    if (data?.data) {
      setTitle(data.data.title);
      setContent(data.data.content);
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data?.data?._id) return;

    try {
      await updateMutation.mutateAsync({
        id: data.data._id,
        title,
        content,
      });
      toast.success('Privacy Policy updated successfully');
    } catch (error) {
      toast.error('Failed to update Privacy Policy');
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
        <h1 className="text-2xl font-bold">Privacy Policy</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Update Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <RichTextEditor value={content} onChange={setContent} />
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
