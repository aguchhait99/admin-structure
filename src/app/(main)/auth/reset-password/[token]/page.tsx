import ResetPasswordPage from '@/module/auth/pages/reset';

export default async function Page({ params }: { params: Promise<{ token: string }> }) {
  const resolvedParams = await params;
  const token = resolvedParams.token;

  return <ResetPasswordPage token={token} />;
}
