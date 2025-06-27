import React from 'react';
import { FilterOptions } from '../types';
import { Users, Settings } from 'lucide-react';

interface FilterControlsProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  filters,
  onFiltersChange
}) => {
  const handleDaysInactiveChange = (days: number) => {
    onFiltersChange({
      ...filters,
      daysInactive: days
    });
  };

  return (
    <div className="card mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          Dashboard Filters
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        {/* Inactive Days Threshold */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Users className="w-4 h-4 inline mr-1" />
            Inactive Days Threshold
          </label>
          <select
            value={filters.daysInactive}
            onChange={(e) => handleDaysInactiveChange(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cursor-500 focus:border-cursor-500"
          >
            <option value={1}>1 day</option>
            <option value={3}>3 days</option>
            <option value={7}>7 days</option>
            <option value={14}>14 days</option>
            <option value={30}>30 days</option>
            <option value={60}>60 days</option>
          </select>
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700">
          <strong>Current Settings:</strong> Users inactive for more than {filters.daysInactive} days will be marked as inactive.
        </p>
      </div>
    </div>
  );
};

export default FilterControls; 