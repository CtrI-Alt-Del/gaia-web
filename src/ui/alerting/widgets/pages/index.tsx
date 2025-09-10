import { AlertsPageView } from './alerts-page-view'
import { useAlerts, type AlertFilters } from './use-alerts'
import { useState, useMemo } from 'react'

export const AlertsPage = () => {
  const { alerts, stats, filterAlerts, getAlertById, deleteAlert } = useAlerts()

  const [filters, setFilters] = useState<AlertFilters>({
    search: '',
    status: 'all',
  })

  const [error, setError] = useState<string | null>(null)

  const filteredAlerts = useMemo(() => {
    return filterAlerts(alerts, filters)
  }, [alerts, filters, filterAlerts])

  const handleSearchChange = (search: string) => {
    setFilters((prev) => ({ ...prev, search }))
  }

  const handleStatusFilterChange = (status: 'all' | 'active' | 'inactive') => {
    setFilters((prev) => ({ ...prev, status }))
  }

  const handleViewAlert = (alertId: string) => {
    try {
      const alert = getAlertById(alertId)
      if (alert) {
        console.log('Visualizando alerta:', alert)
      } else {
        setError('Alerta não encontrado')
      }
    } catch {
      setError('Erro ao visualizar alerta')
    }
  }

  const handleEditAlert = (alertId: string) => {
    try {
      const alert = getAlertById(alertId)
      if (alert) {
        console.log('Editando alerta:', alert)
      } else {
        setError('Alerta não encontrado')
      }
    } catch {
      setError('Erro ao editar alerta')
    }
  }

  const handleDeleteAlert = async (alertId: string) => {
    try {
      setError(null)

      const success = deleteAlert(alertId)
      if (success) {
        console.log('Alerta deletado com sucesso')
      } else {
        setError('Erro ao deletar alerta')
      }
    } catch {
      setError('Erro ao deletar alerta')
    }
  }

  return (
    <AlertsPageView
      alerts={filteredAlerts}
      stats={stats}
      filters={filters}
      error={error}
      onSearchChange={handleSearchChange}
      onStatusFilterChange={handleStatusFilterChange}
      onViewAlert={handleViewAlert}
      onEditAlert={handleEditAlert}
      onDeleteAlert={handleDeleteAlert}
      onClearError={() => setError(null)}
    />
  )
}
