'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { users } from '@/lib/users';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('simon@tmgm.com');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');

  function login(e: React.FormEvent) {
    e.preventDefault();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return setError('账号或密码错误');
    localStorage.setItem('tmgm_user', JSON.stringify(user));
    router.push(user.role === 'admin' ? '/admin' : '/employee');
  }

  return (
    <main className="page login-wrap">
      <form className="login-card" onSubmit={login}>
        <div className="logo" style={{marginBottom:24}}>
          <div className="logo-mark">TM</div>
          <div>TMGM Training</div>
        </div>
        <h1 className="title" style={{fontSize:32}}>员工培训系统登录</h1>
        <p className="sub">Chelsea Blue × TMGM 风格内部培训后台</p>
        <input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="邮箱" />
        <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="密码" />
        {error && <p style={{color:'#ffb4b4'}}>{error}</p>}
        <button className="btn" style={{width:'100%', marginTop:8}}>登录</button>
        <p className="muted" style={{lineHeight:1.7}}>管理员：admin@tmgm.com / admin123<br/>员工：simon@tmgm.com / 123456</p>
      </form>
    </main>
  );
}
