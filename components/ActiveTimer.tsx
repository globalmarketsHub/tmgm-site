'use client';

import { useEffect, useRef, useState } from 'react';
import { getUserProgress, saveProgress, formatTime } from '@/lib/storage';

export default function ActiveTimer({ userId, dayId }: { userId: string; dayId: number | string }) {
  const [seconds, setSeconds] = useState(0);
  const lastAction = useRef(Date.now());

  useEffect(() => {
    const existing = getUserProgress(userId, dayId);
    setSeconds(existing?.seconds || 0);

    const markActive = () => { lastAction.current = Date.now(); };
    const events = ['mousemove','mousedown','keydown','scroll','touchstart','click'];
    events.forEach(e => window.addEventListener(e, markActive));

    const timer = setInterval(() => {
      const active = Date.now() - lastAction.current < 60_000 && document.visibilityState === 'visible';
      if (!active) return;
      setSeconds(prev => {
        const next = prev + 1;
        saveProgress({
          userId,
          dayId,
          seconds: next,
          status: next > 5 ? '学习中' : '未开始',
          lastActiveAt: new Date().toISOString()
        });
        return next;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      events.forEach(e => window.removeEventListener(e, markActive));
    };
  }, [userId, dayId]);

  function complete() {
    saveProgress({
      userId,
      dayId,
      seconds,
      status: '已完成',
      lastActiveAt: new Date().toISOString(),
      completedAt: new Date().toISOString()
    });
    alert('已标记为完成');
  }

  return (
    <div className="section" style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:16}}>
      <div>
        <div className="muted">有效学习时间（防挂机）</div>
        <h2 style={{margin:'4px 0 0'}}>{formatTime(seconds)}</h2>
      </div>
      <button className="btn" onClick={complete}>标记完成</button>
    </div>
  );
}
