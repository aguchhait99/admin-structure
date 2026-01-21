'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '@iconify-icon/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { setCookie } from 'nookies';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import LoginWrapper from '../components/LoginWrapper';

import { setOAuthAppAccessToken } from '@/api/axiosInstance/axiosInstance';
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
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/navigation/sidebar/routes';

const FormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

export default function Loginpage() {
  const { mutate: login, isPending } = authService.useAuthLoginHook();
  const { setHasToken } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const storageTokenKeyName = process.env.NEXT_PUBLIC_TOKEN_NAME;
  const storageRefreshTokenKeyName = process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME;

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const { email, password } = data;
    login(
      { email, password },
      {
        onSuccess: (data) => {
          setCookie(null, storageTokenKeyName as string, data.data.accessToken, {
            path: '/',
          });
          setCookie(null, storageRefreshTokenKeyName as string, data.data.refreshToken, {
            path: '/',
          });
          setOAuthAppAccessToken(data.data.accessToken);
          // queryClient.invalidateQueries({ queryKey: ['userDetails'] });
          setHasToken(data.data.accessToken);

          toast.success('Signed in successfully');

          // const returnUrl = router.query.returnUrl;
          // const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/dashboards';
          router.push(ROUTES.dashboard);
        },
      },
    );
  };

  return (
    <LoginWrapper>
      <div className="flex min-h-screen w-full items-center justify-center p-2">
        <Card className="w-full max-w-sm shadow-lg">
          <CardContent className="space-y-1 p-3">
            <div className="flex flex-col space-y-2 text-left">
              <h1 className="tracking-left text-2xl font-normal">Welcome to Admin! 👋</h1>
              <p className="text-muted-foreground mb-5 text-sm">
                Please sign-in to your account and start the adventure
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
                        <Input placeholder="you@example.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            {...field}
                            className="pr-10"
                          />
                          <span
                            className="absolute inset-y-0 right-3 flex cursor-pointer items-center text-gray-500"
                            onClick={() => setShowPassword((prev) => !prev)}
                          >
                            <Icon
                              icon={showPassword ? 'mdi:eye-off' : 'mdi:eye'}
                              className="size-5"
                            />
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                <div className="text-right">
                  <Link
                    href="/auth/forgotPassword"
                    className="text-sm text-[#28C76F] hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <Button type="submit" disabled={isPending} className="w-full">
                  {isPending && <Icon icon="mdi:loading" className="mr-2 size-4 animate-spin" />}
                  Log In
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </LoginWrapper>
  );
}
