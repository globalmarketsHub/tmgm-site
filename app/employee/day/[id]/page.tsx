'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Topbar from '@/components/Topbar';
import RequireAuth from '@/components/RequireAuth';
import ActiveTimer from '@/components/ActiveTimer';
import { courses, day1Sections } from '@/data/courses';

export default function DayPage() {
  const params = useParams();
  const id = Number(params.id);
  const course = courses.find(c => c.id === id);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('tmgm_user') || '{}'));
  }, []);

  return (
    <RequireAuth role="employee">
      <main className="page">
        <Topbar role="employee" />
        <div className="container course">
          <Link href="/employee" className="badge">← 返回员工首页</Link>
          <div style={{height:18}} />
          <section className="hero">
            <h1 className="title">Day {id} · {course?.title}</h1>
            <p className="sub">{course?.desc}</p>
          </section>

          {user?.id && <ActiveTimer userId={user.id} dayId={id} />}

          {id === 1 ? (
            <>
              {day1Sections.map((s, i) => (
                <section className="section" key={i}>
                  <h2>{s.title}</h2>
                  <p>{s.body}</p>
                </section>
              ))}
              <section className="section">
                <h2>课后任务</h2>
                <ol>
                  <li>用客户能听懂的话解释“点差就是交易成本”。</li>
                  <li>举例说明杠杆、保证金、爆仓比例之间的关系。</li>
                  <li>说明为什么持仓过夜可能产生库存费。</li>
                  <li>整理常见产品：外汇、黄金、原油、股指、股票的区别。</li>
                </ol>
              </section>
            </>
          ) : (
            <section className="section">
              <h2>内容待同步</h2>
              <p>该模块框架已建立，后续可上传 PDF、图片、视频或测验题。</p>
            </section>
          )}
        </div>
      </main>
    </RequireAuth>
  );
}
