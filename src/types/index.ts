export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  lastActive: Date;
  totalEdits: number;
  totalTabs: number;
  isActive: boolean;
}

export interface UserActivity {
  userId: string;
  date: Date;
  edits: number;
  tabs: number;
}

export interface DashboardMetrics {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  totalEdits: number;
  totalTabs: number;
  topPerformers: User[];
  inactiveUsersList: User[];
}

export interface FilterOptions {
  daysInactive: number;
  dateRange: {
    start: Date;
    end: Date;
  };
} 