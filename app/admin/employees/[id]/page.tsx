'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import Topbar from '@/components/Topbar';
import RequireAuth from '@/components/RequireAuth';
import { users } from '@/lib/users';
import { courses } from '@/data/courses';
import { getProgress, formatTime } from '@/lib/storage';

export default function EmployeeDetailPage() {
  const params = useParams();
  const id = String(params.id);
  const employee = users.find(u => u.id === id);
  const progress = getProgress();

  return (
    <RequireAuth role="admin">
      <main className="page">
        <Topbar role="admin" />
        <div className="container">
          <Link href="/admin" className="badge">← 返回管理员后台</Link>
          <div style={{height:18}} />
          <section className="hero">
            <h1 className="title">{employee?.name} 的学习详情</h1>
            <p className="sub">{employee?.email}</p>
          </section>
          <section className="section">
            <table className="table">
              <thead><tr><th>Day</th><th>课程</th><th>状态</th><th>有效时间</th><th>最后操作</th><th>完成时间</th></tr></thead>
              <tbody>
                {courses.map(c => {
                  const p = progress.find(x => x.userId === id && Number(x.dayId) === c.id);
                  return (
                    <tr key={c.id}>
                      <td>Day {c.id}</td>
                      <td>{c.title}</td>
                      <td>{p?.status || '未开始'}</td>
                      <td>{formatTime(p?.seconds || 0)}</td>
                      <td>{p?.lastActiveAt || '-'}</td>
                      <td>{p?.completedAt || '-'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        </div>
      </main>
    </RequireAuth>
  );
}
