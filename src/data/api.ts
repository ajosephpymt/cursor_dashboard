import { getToken } from '../utils/auth';

export const fetchUsageData = async (startDate: number, endDate: number) => {
  const token = getToken();
  const res = await fetch('/api/cursor/usage', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ startDate, endDate })
  });
  return res.json();
};

export const fetchTeamMembers = async () => {
  const token = getToken();
  const res = await fetch('/api/cursor/members', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
};

export const login = async (email: string, password: string) => {
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Auth failed');
  return data;
}; 