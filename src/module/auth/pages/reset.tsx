'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '@iconify-icon/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
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

const FormSchema = z
  .object({
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'Confirm Password must be at least 6 characters long' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });
type Props = {
  token: string;
};

export default function ResetPasswordPage({ token }: Props) {
  const router = useRouter();
  const { mutate: resetMutation, isPending } = authService.useResetPassHook();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });
  console.info(token);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const { password } = data;
    console.info(token);
    const payload = { newPassword: password, authToken: token as string };
    resetMutation(payload, {
      onSuccess: () => {
        router.push(ROUTES.auth.login);
        toast.success('Password reset successfully');
      },
    });
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
      <Card className="w-full max-w-sm shadow-lg">
        <CardContent className="space-y-4 p-4">
          <div className="text-left">
            <h1 className="mb-2 text-2xl font-normal tracking-tight">Reset Password? 🔒</h1>
            <p className="text-muted-foreground text-sm">Set your new password below.</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter new password"
                          {...field}
                        />
                        <span
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-500"
                        >
                          {showPassword ? (
                            <Icon icon="mdi:eye-off" width={18} />
                          ) : (
                            <Icon icon="mdi:eye" width={18} />
                          )}
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirm ? 'text' : 'password'}
                          placeholder="Confirm new password"
                          {...field}
                        />
                        <span
                          onClick={() => setShowConfirm((prev) => !prev)}
                          className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-500"
                        >
                          {showConfirm ? (
                            <Icon icon="mdi:eye-off" width={18} />
                          ) : (
                            <Icon icon="mdi:eye" width={18} />
                          )}
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isPending}
                style={{ backgroundColor: '#28C76F', borderRadius: '7px' }}
                className="w-full"
              >
                {isPending && <Icon icon="mdi:loading" className="mr-2 size-4 animate-spin" />}
                Set New Password
              </Button>
            </form>
          </Form>

          <div className="text-center">
            <Link href={`${ROUTES.auth.login}`}>
              <Button
                variant="link"
                className="text-sm font-medium text-[#28C76F] hover:text-green-700"
              >
                <span className="text-xl">&lt;</span> Back to Login
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
