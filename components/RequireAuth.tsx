'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RequireAuth({ children, role }: { children: React.ReactNode; role?: 'employee' | 'admin' }) {
  const router = useRouter();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem('tmgm_user');
    if (!raw) return router.push('/login');
    const user = JSON.parse(raw);
    if (role && user.role !== role) return router.push('/login');
    setOk(true);
  }, [router, role]);

  if (!ok) return null;
  return <>{children}</>;
}
