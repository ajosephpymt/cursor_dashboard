import React, { useState } from 'react';
import { User } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { ChevronUp, ChevronDown, Mail, Clock } from 'lucide-react';
import clsx from 'clsx';

interface UserTableProps {
  users: User[];
  title: string;
  showInactiveDays?: boolean;
  onUserClick?: (user: User) => void;
  hideMetrics?: boolean;
  columns?: Array<'name' | 'edits' | 'tabs' | 'lastActive'>;
  compact?: boolean;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  title,
  showInactiveDays = false,
  onUserClick,
  hideMetrics = false,
  columns = ['name', 'edits', 'tabs', 'lastActive'],
  compact = false
}) => {
  const [sortBy, setSortBy] = useState<'name' | 'edits' | 'tabs' | 'lastActive'>('edits');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleSort = (column: typeof sortBy) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const sortedUsers = [...users].sort((a, b) => {
    let aValue: any, bValue: any;
    
    switch (sortBy) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'edits':
        aValue = a.totalEdits;
        bValue = b.totalEdits;
        break;
      case 'tabs':
        aValue = a.totalTabs;
        bValue = b.totalTabs;
        break;
      case 'lastActive':
        aValue = a.lastActive.getTime();
        bValue = b.lastActive.getTime();
        break;
      default:
        return 0;
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getSortIcon = (column: typeof sortBy) => {
    if (sortBy !== column) return null;
    return sortOrder === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              {!hideMetrics && (
                <>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('edits')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Total Edits</span>
                      {getSortIcon('edits')}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('tabs')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Total Tabs</span>
                      {getSortIcon('tabs')}
                    </div>
                  </th>
                </>
              )}
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('lastActive')}
              >
                <div className="flex items-center space-x-1">
                  <span>Last Active</span>
                  {getSortIcon('lastActive')}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedUsers.map((user) => (
              <tr 
                key={user.email} 
                className={clsx(
                  'hover:bg-gray-50 cursor-pointer transition-colors',
                  !user.isActive && 'bg-red-50'
                )}
                onClick={() => onUserClick?.(user)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img 
                        className="h-10 w-10 rounded-full" 
                        src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`} 
                        alt={user.name}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Mail className="w-3 h-3 mr-1" />
                        {user.email}
                      </div>
                    </div>
                  </div>
                </td>
                {!hideMetrics && (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatNumber(user.totalEdits)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatNumber(user.totalTabs)}
                    </td>
                  </>
                )}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {user.lastActive && user.lastActive.getTime() > 0
                      ? user.lastActive.toLocaleDateString()
                      : 'Never'}
                  </div>
                  {showInactiveDays && !user.isActive && user.lastActive && user.lastActive.getTime() > 0 && (
                    <div className="text-xs text-red-600 mt-1">
                      Inactive for {Math.floor((Date.now() - user.lastActive.getTime()) / (1000 * 60 * 60 * 24))} days
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable; 