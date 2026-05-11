import './globals.css';

export const metadata = {
  title: 'TMGM Training Portal',
  description: 'TMGM employee training portal',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
