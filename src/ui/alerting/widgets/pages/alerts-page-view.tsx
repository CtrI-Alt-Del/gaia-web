import { AlertsFilters } from '../components/alerts-filters'
import { AlertsTable } from '../components/alerts-table'
import type { AlertRule, AlertFilters, AlertStats } from './use-alerts'

interface AlertsPageViewProps {
  alerts: AlertRule[]
  stats: AlertStats
  filters: AlertFilters
  error: string | null
  onSearchChange: (search: string) => void
  onStatusFilterChange: (status: 'all' | 'active' | 'inactive') => void
  onViewAlert: (alertId: string) => void
  onEditAlert: (alertId: string) => void
  onDeleteAlert: (alertId: string) => void
  onClearError: () => void
}

export const AlertsPageView = ({
  alerts,
  stats,
  filters,
  error,
  onSearchChange,
  onStatusFilterChange,
  onViewAlert,
  onEditAlert,
  onDeleteAlert,
  onClearError,
}: AlertsPageViewProps) => {
  return (
    <div className='p-6'>
      {/* Error Message */}
      {error && (
        <div className='mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between'>
          <span className='text-red-800'>{error}</span>
          <button
            type='button'
            onClick={onClearError}
            className='text-red-600 hover:text-red-800 cursor-pointer'
          >
            ✕
          </button>
        </div>
      )}

      <div className='mb-6'>
        <AlertsFilters
          searchValue={filters.search}
          statusValue={filters.status}
          onSearchChange={onSearchChange}
          onStatusFilterChange={onStatusFilterChange}
        />
      </div>

      <AlertsTable
        alerts={alerts}
        stats={stats}
        onViewAlert={onViewAlert}
        onEditAlert={onEditAlert}
        onDeleteAlert={onDeleteAlert}
      />
    </div>
  )
}
