'use client';

import Link from 'next/link';
import Topbar from '@/components/Topbar';
import RequireAuth from '@/components/RequireAuth';
import { courses } from '@/data/courses';
import { getUserProgress, formatTime } from '@/lib/storage';
import { useEffect, useState } from 'react';

export default function EmployeePage() {
  const [user, setUser] = useState<any>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('tmgm_user') || '{}'));
    const t = setInterval(()=>setTick(x=>x+1), 1000);
    return ()=>clearInterval(t);
  }, []);

  return (
    <RequireAuth role="employee">
      <main className="page">
        <Topbar role="employee" />
        <div className="container">
          <section className="hero">
            <h1 className="title">欢迎回来，{user?.name}</h1>
            <p className="sub">8天入职培训任务 · 每日独立学习 · 系统记录有效操作时间</p>
          </section>

          <div className="grid">
            {courses.map(c => {
              const p = user ? getUserProgress(user.id, c.id) : undefined;
              const percent = p?.status === '已完成' ? 100 : Math.min(90, Math.floor((p?.seconds || 0) / 18));
              return (
                <Link className="card" href={`/employee/day/${c.id}`} key={c.id}>
                  <h3>Day {c.id}</h3>
                  <strong>{c.title}</strong>
                  <p className="muted">{c.desc}</p>
                  <p>状态：{p?.status || '未开始'}</p>
                  <p>时间：{formatTime(p?.seconds || 0)}</p>
                  <div className="progress"><span style={{width:`${percent}%`}} /></div>
                </Link>
              );
            })}
            <Link className="card" href="/employee/comprehensive">
              <h3>综合学习</h3>
              <strong>综合资料 / 测验</strong>
              <p className="muted">用于后续整合活动规则、产品规则、违规交易、客户沟通案例。</p>
              <div className="progress"><span style={{width:'15%'}} /></div>
            </Link>
          </div>
        </div>
      </main>
    </RequireAuth>
  );
}
