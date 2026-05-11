'use client';

import { useRouter } from 'next/navigation';

export default function Topbar({ role }: { role?: string }) {
  const router = useRouter();

  function logout() {
    localStorage.removeItem('tmgm_user');
    router.push('/login');
  }

  return (
    <div className="topbar">
      <div className="logo">
        <div className="logo-mark">TM</div>
        <div>TMGM Training</div>
      </div>
      <div style={{display:'flex', gap:12, alignItems:'center'}}>
        <span className="badge">{role === 'admin' ? 'Supervisor 后台' : 'Employee 门户'}</span>
        <button className="btn dark" onClick={logout}>退出</button>
      </div>
    </div>
  );
}
