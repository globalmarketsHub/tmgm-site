'use client';

export type Progress = {
  userId: string;
  dayId: number | string;
  seconds: number;
  status: '未开始' | '学习中' | '已完成';
  lastActiveAt?: string;
  completedAt?: string;
};

const KEY = 'tmgm_training_progress_v1';

export function getProgress(): Progress[] {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem(KEY) || '[]');
}

export function saveProgress(row: Progress) {
  const all = getProgress();
  const idx = all.findIndex(x => x.userId === row.userId && String(x.dayId) === String(row.dayId));
  if (idx >= 0) all[idx] = { ...all[idx], ...row };
  else all.push(row);
  localStorage.setItem(KEY, JSON.stringify(all));
}

export function getUserProgress(userId: string, dayId?: number | string) {
  const all = getProgress().filter(x => x.userId === userId);
  return dayId ? all.find(x => String(x.dayId) === String(dayId)) : all;
}

export function formatTime(seconds = 0) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h) return `${h}小时${m}分钟`;
  if (m) return `${m}分钟${s}秒`;
  return `${s}秒`;
}
