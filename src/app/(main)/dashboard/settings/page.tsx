'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { useGetSettings, useUpdateSettings } from '@/api/hooks/settings/hook';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const settingsSchema = z.object({
  contactNo: z
    .string()
    .min(1, 'Contact number is required')
    .regex(/^\+?[0-9]{10,15}$/, 'Invalid phone number format'),
  contactEmail: z
    .string()
    .min(1, 'Contact email is required')
    .email('Invalid email address'),
  businessRegistrationNo: z
    .string()
    .min(1, 'Business registration number is required'),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
  const { data, isLoading } = useGetSettings();
  const updateMutation = useUpdateSettings();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      contactNo: '',
      contactEmail: '',
      businessRegistrationNo: '',
    },
  });

  useEffect(() => {
    if (data?.data) {
      setValue('contactNo', data.data.contactNo || '');
      setValue('contactEmail', data.data.contactEmail || '');
      setValue('businessRegistrationNo', data.data.businessRegistrationNo || '');
    }
  }, [data, setValue]);

  const onSubmit = async (formData: SettingsFormData) => {
    if (!data?.data?._id) return;

    try {
      await updateMutation.mutateAsync({
        id: data.data._id,
        ...formData,
      });
      toast.success('Settings updated successfully');
    } catch (error) {
      toast.error('Failed to update settings');
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="contactNo">Contact Number</Label>
              <Input
                id="contactNo"
                {...register('contactNo')}
                placeholder="+1234567890"
              />
              {errors.contactNo && (
                <p className="text-sm text-red-500">
                  {errors.contactNo.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input
                id="contactEmail"
                type="email"
                {...register('contactEmail')}
                placeholder="info@example.com"
              />
              {errors.contactEmail && (
                <p className="text-sm text-red-500">
                  {errors.contactEmail.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessRegistrationNo">
                Business Registration Number
              </Label>
              <Input
                id="businessRegistrationNo"
                {...register('businessRegistrationNo')}
                placeholder="Enter registration number"
              />
              {errors.businessRegistrationNo && (
                <p className="text-sm text-red-500">
                  {errors.businessRegistrationNo.message}
                </p>
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
