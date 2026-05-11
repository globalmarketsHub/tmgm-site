import { courses } from '@/data/courses';
import DayPageClient from './DayPageClient';

export function generateStaticParams() {
  return courses.map(course => ({ id: String(course.id) }));
}

export default function DayPage({ params }: { params: { id: string } }) {
  return <DayPageClient id={Number(params.id)} />;
}
