import React, { useState, useEffect } from 'react';
import { Users, Edit3, FolderOpen, TrendingUp } from 'lucide-react';
import MetricCard from './components/MetricCard';
import FilterControls from './components/FilterControls';
import { FilterOptions, User } from './types';
import { isAuthenticated, removeToken } from './utils/auth';
import AuthForm from './components/AuthForm';
import { fetchUsageData, fetchTeamMembers } from './data/api';
import UserTable from './components/UserTable';

const App: React.FC = () => {
  const [authed, setAuthed] = useState(isAuthenticated());
  const [filters, setFilters] = useState<FilterOptions>({
    daysInactive: 7,
    dateRange: {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      end: new Date()
    }
  });

  const [teamMembers, setTeamMembers] = useState<User[]>([]);
  const [usageData, setUsageData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [leaderboardMetric, setLeaderboardMetric] = useState<'edits' | 'tabs'>('edits');

  useEffect(() => {
    if (!authed) return;
    setLoading(true);
    setError(null);
    fetchTeamMembers()
      .then(data => {
        setTeamMembers(data.teamMembers || []);
      })
      .catch(() => setError('Failed to fetch team members'));

    const startDate = filters.dateRange.start.getTime();
    const endDate = filters.dateRange.end.getTime();
    fetchUsageData(startDate, endDate)
      .then(data => {
        setUsageData(data.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch usage data');
        setLoading(false);
      });
  }, [filters, authed]);

  if (!authed) {
    return <AuthForm onAuth={() => setAuthed(true)} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cursor-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-red-600">{error}</div>
      </div>
    );
  }

  // Merge teamMembers and usageData by email
  const mergedUsers: User[] = teamMembers.map(member => {
    // Find all usage records for this user
    const userUsage = usageData.filter((u: any) => u.email === member.email);

    // Find the most recent activity date
    const lastActive = userUsage.length
      ? new Date(Math.max(...userUsage.map((u: any) => new Date(u.date).getTime())))
      : new Date(0);

    // Calculate stats
    const totalUserEdits = userUsage.reduce((sum, u) => sum + (u.totalLinesAdded || 0) + (u.totalLinesDeleted || 0), 0);
    const totalUserTabs = userUsage.reduce((sum, u) => sum + (u.totalTabsShown || 0), 0);

    // Determine active/inactive
    const inactiveThresholdMs = filters.daysInactive * 24 * 60 * 60 * 1000;
    const isActive = lastActive.getTime() > 0
      ? (Date.now() - lastActive.getTime()) < inactiveThresholdMs
      : false;

    return {
      id: member.id || member.email,
      name: member.name || '',
      email: member.email,
      avatar: member.avatar,
      lastActive,
      totalEdits: totalUserEdits,
      totalTabs: totalUserTabs,
      isActive
    };
  });

  const totalUsers = mergedUsers.length;
  const activeUsers = mergedUsers.filter(u => u.isActive);
  const inactiveUsers = mergedUsers.filter(u => !u.isActive);
  const totalEdits = mergedUsers.reduce((sum, u) => sum + (u.totalEdits || 0), 0);
  const totalTabs = mergedUsers.reduce((sum, u) => sum + (u.totalTabs || 0), 0);

  const engagementRate = totalUsers > 0 ? (activeUsers.length / totalUsers) * 100 : 0;

  // Sort by totalEdits (descending)
  const leaderboardByEdits = [...mergedUsers].sort((a, b) => b.totalEdits - a.totalEdits);

  // Sort by totalTabs (descending)
  const leaderboardByTabs = [...mergedUsers].sort((a, b) => b.totalTabs - a.totalTabs);

  const leaderboard = leaderboardMetric === 'edits'
    ? leaderboardByEdits
    : leaderboardByTabs;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-cursor-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <div>
              <h1 className="text-2xl font-bold text-gray-900">Cursor Internal Dashboard</h1>
              <p className="text-sm text-gray-500">Track user engagement and performance metrics</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <button className="btn-secondary mb-2" onClick={() => { removeToken(); setAuthed(false); }}>
                Logout
              </button>
              <span className="text-xs text-gray-400">Last updated<br />
                <span className="text-gray-700 font-medium">
                  {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </span>
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FilterControls filters={filters} onFiltersChange={setFilters} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Users"
            value={totalUsers}
            icon={Users}
            color="blue"
            change={{ value: 0, isPositive: true }}
          />
          <MetricCard
            title="Active Users"
            value={activeUsers.length}
            icon={TrendingUp}
            color="green"
            change={{ value: 0, isPositive: true }}
          />
          <MetricCard
            title="Total Edits"
            value={new Intl.NumberFormat().format(totalEdits)}
            icon={Edit3}
            color="purple"
            change={{ value: 0, isPositive: true }}
          />
          <MetricCard
            title="Total Tabs"
            value={new Intl.NumberFormat().format(totalTabs)}
            icon={FolderOpen}
            color="orange"
            change={{ value: 0, isPositive: true }}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <span className="text-3xl mr-2">⚠️</span>
              <div>
                <div className="text-lg font-semibold">{inactiveUsers.length}</div>
                <div className="text-gray-500 text-sm">
                  Inactive Users<br />
                  {((inactiveUsers.length / mergedUsers.length) * 100).toFixed(1)}% of total
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center">
              <span className="text-3xl mr-2">📈</span>
              <div>
                <div className="text-lg font-semibold">{engagementRate.toFixed(1)}%</div>
                <div className="text-gray-500 text-sm">Engagement Rate<br />Active in last {filters.daysInactive} days</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <select
              value={leaderboardMetric}
              onChange={e => setLeaderboardMetric(e.target.value as 'edits' | 'tabs')}
              className="mr-2"
            >
              <option value="edits">Most Edits</option>
              <option value="tabs">Most Tabs</option>
            </select>
            <span className="font-bold text-lg">
              Leaderboard: Most {leaderboardMetric === 'edits' ? 'Edits' : 'Tabs'}
            </span>
          </div>
          <UserTable users={leaderboard.slice(0, 10)} title="" />
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <UserTable users={activeUsers} title="Active Users" columns={['name', 'edits', 'tabs', 'lastActive']} />
          </div>
          <div>
            <UserTable
              users={inactiveUsers}
              title="Inactive Users"
              columns={['name', 'lastActive']}
              compact
              hideMetrics
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App; 