import { users } from '@/lib/users';
import EmployeeDetailClient from './EmployeeDetailClient';

export function generateStaticParams() {
  return users
    .filter(user => user.role === 'employee')
    .map(user => ({ id: user.id }));
}

export default function EmployeeDetailPage({ params }: { params: { id: string } }) {
  return <EmployeeDetailClient id={params.id} />;
}
