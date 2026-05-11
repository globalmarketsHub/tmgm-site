'use client';

import Link from 'next/link';
import Topbar from '@/components/Topbar';
import RequireAuth from '@/components/RequireAuth';

export default function ComprehensivePage() {
  return (
    <RequireAuth role="employee">
      <main className="page">
        <Topbar role="employee" />
        <div className="container course">
          <Link href="/employee" className="badge">← 返回员工首页</Link>
          <div style={{height:18}} />
          <section className="hero">
            <h1 className="title">综合学习 / 综合测验</h1>
            <p className="sub">后续可放：活动规则、点差返佣、违规交易、客户异议处理、产品测验。</p>
          </section>
          <section className="section">
            <h2>当前状态</h2>
            <p>综合模块已预留。下一步可以接入题库、视频、PDF阅读器与考试评分。</p>
          </section>
        </div>
      </main>
    </RequireAuth>
  );
}
