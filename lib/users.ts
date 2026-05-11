export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'employee' | 'admin';
};

export const users: User[] = [
  { id: 'u1', name: 'Simon Zhang', email: 'simon@tmgm.com', password: '123456', role: 'employee' },
  { id: 'u2', name: 'Trainee User', email: 'trainee@tmgm.com', password: '123456', role: 'employee' },
  { id: 'admin', name: 'Supervisor', email: 'admin@tmgm.com', password: 'admin123', role: 'admin' },
];
