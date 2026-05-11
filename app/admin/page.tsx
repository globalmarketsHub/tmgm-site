'use client';

import Link from 'next/link';
import * as XLSX from 'xlsx';
import Topbar from '@/components/Topbar';
import RequireAuth from '@/components/RequireAuth';
import { users } from '@/lib/users';
import { courses } from '@/data/courses';
import { getProgress, formatTime } from '@/lib/storage';
import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    const progress = getProgress();
    const employees = users.filter(u => u.role === 'employee');
    const data = employees.flatMap(emp => courses.map(c => {
      const p = progress.find(x => x.userId === emp.id && Number(x.dayId) === c.id);
      return {
        员工姓名: emp.name,
        邮箱: emp.email,
        Day: `Day ${c.id}`,
        模块名称: c.title,
        状态: p?.status || '未开始',
        有效学习时间: formatTime(p?.seconds || 0),
        秒数: p?.seconds || 0,
        最后操作时间: p?.lastActiveAt || '',
        完成时间: p?.completedAt || '',
        userId: emp.id
      };
    }));
    setRows(data);
  }, []);

  function exportExcel() {
    const sheet = XLSX.utils.json_to_sheet(rows.map(({userId, ...r}) => r));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, sheet, 'Training Report');
    XLSX.writeFile(wb, 'TMGM员工培训进度报告.xlsx');
  }

  const totalSeconds = rows.reduce((sum, r) => sum + (r.秒数 || 0), 0);
  const completed = rows.filter(r => r.状态 === '已完成').length;

  return (
    <RequireAuth role="admin">
      <main className="page">
        <Topbar role="admin" />
        <div className="container">
          <section className="hero">
            <h1 className="title">监督者后台</h1>
            <p className="sub">查看员工8天培训进度、有效浏览操作时间、完成情况，并导出Excel报告。</p>
            <button className="btn" onClick={exportExcel}>导出 Excel 报告</button>
          </section>

          <div className="kpi">
            <div className="card"><div className="muted">员工人数</div><strong>{users.filter(u=>u.role==='employee').length}</strong></div>
            <div className="card"><div className="muted">课程模块</div><strong>{courses.length}</strong></div>
            <div className="card"><div className="muted">已完成模块</div><strong>{completed}</strong></div>
            <div className="card"><div className="muted">总有效时间</div><strong>{formatTime(totalSeconds)}</strong></div>
          </div>

          <section className="section">
            <h2>员工进度报告</h2>
            <table className="table">
              <thead><tr><th>员工</th><th>Day</th><th>模块</th><th>状态</th><th>有效时间</th><th>详情</th></tr></thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i}>
                    <td>{r.员工姓名}</td><td>{r.Day}</td><td>{r.模块名称}</td><td>{r.状态}</td><td>{r.有效学习时间}</td>
                    <td><Link className="badge" href={`/admin/employees/${r.userId}`}>查看</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </main>
    </RequireAuth>
  );
}
