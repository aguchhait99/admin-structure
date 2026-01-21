'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { mediaUrl } from '@/api/endpoints/endpoints';
import { useProfileUpdateWithImage } from '@/api/hooks/user/hook';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';


const profileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  profileImage: z.any().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function ProfileForm() {
  const { user } = useAuth();
  const profileUpdateMutation = useProfileUpdateWithImage();
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: ProfileFormData) => {
    if (!user?._id) return;

    const formData = new FormData();
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);

    if (data.profileImage && data.profileImage[0]) {
      formData.append('profileImage', data.profileImage[0]);
    }

    profileUpdateMutation.mutate(
      formData,
      {
        onSuccess: () => {
          toast.success('Profile updated successfully');
        },
        onError: () => {
          toast.error('Failed to update profile');
        },
      },
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className="mb-2 block">First Name</Label>
              <Input {...register('firstName')} />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
            </div>
            <div>
              <Label htmlFor="lastName" className="mb-2 block">Last Name</Label>
              <Input {...register('lastName')} />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
            </div>
          </div>
          <div>
            <Label htmlFor="email" className="mb-2 block">Email</Label>
            <Input value={user?.email || ''} readOnly className="bg-muted" />
          </div>
          <div>
            <Label htmlFor="profileImage" className="mb-2 block">Profile Image</Label>
            <div className="space-y-2">
              {(previewImage || user?.profileImage) && (
                <div className="w-20 h-20 rounded-full overflow-hidden border">
                  <Image
                    src={previewImage || mediaUrl(user?.profileImage || '')}
                    alt="Profile preview"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <Input
                type="file"
                accept="image/*"
                {...register('profileImage')}
                onChange={handleImageChange}
              />
            </div>
          </div>
          <Button type="submit" disabled={profileUpdateMutation.isPending}>
            {profileUpdateMutation.isPending ? 'Updating...' : 'Update Profile'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}