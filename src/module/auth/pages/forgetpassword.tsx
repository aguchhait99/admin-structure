'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '@iconify-icon/react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { authService } from '@/api/hooks/auth/hooks';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ROUTES } from '@/navigation/sidebar/routes';

const FormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});
const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

const defaultValues = {
  email: '',
};

export default function ForgotPassword() {
  const { mutate: forgotPassword, isPending } = authService.useForgotPassHook();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const payload = {
      ...data,
      baseUrl: `${baseUrl}/auth/`,
    };

    forgotPassword(payload, {
      onSuccess: () => {
        toast.success('Link sent successfully');
      },
    });
  };

  return (
    <div className="mx-auto flex min-h-screen w-full items-center justify-center p-4">
      <Card className="w-full max-w-sm rounded-xl shadow-lg">
        <CardContent className="space-y-3 p-2">
          <div className="flex flex-col space-y-2 text-left">
            <h1 className="tracking-left text-2xl font-normal">Forgot Password?🔒</h1>
            <p className="text-muted-foreground mb-3 text-sm">
              Enter your email and we will send you instructions to reset your password.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email@example.com" {...field} />
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending} className="w-full">
                {isPending && <Icon icon="mdi:loading" className="mr-2 size-4 animate-spin" />}
                Send Reset Link
              </Button>
            </form>
          </Form>

          <div className="mt-2 text-center">
            <Link href={ROUTES.auth.login}>
              <Button variant="link" className="text-sm font-medium text-[#28C76F]">
                <span className="text-xl">&lt;</span> Back to Login
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
