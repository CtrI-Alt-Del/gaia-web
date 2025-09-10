export interface AlertRule {
  id: string
  name: string
  icon: string
  condition: string
  conditionLabel: string
  message: string
  messageLabel: string
  severity: 'critical' | 'alert' | 'warning'
  target: string
  targetLabel: string
  status: 'active' | 'inactive'
}

export interface AlertFilters {
  search: string
  status: 'all' | 'active' | 'inactive'
}

export interface AlertStats {
  total: number
  active: number
  critical: number
  bySeverity: Record<string, number>
}

export const useAlerts = () => {
  const alerts: AlertRule[] = [
    {
      id: '1',
      name: 'Temperatura Alta',
      icon: 'thermometer',
      condition: 'Temperatura > 35°C',
      conditionLabel: 'Limite de disparo',
      message: 'Temperatura acima do nível crítico',
      messageLabel: 'Mensagem de notificação de alerta',
      severity: 'critical',
      target: 'Todas as Estações',
      targetLabel: 'Parâmetro de temperatura',
      status: 'active',
    },
    {
      id: '2',
      name: 'Umidade Baixa',
      icon: 'droplets',
      condition: 'Umidade < 30%',
      conditionLabel: 'Limite mínimo',
      message: 'Umidade abaixo do nível recomendado',
      messageLabel: 'Notificação de aviso',
      severity: 'alert',
      target: 'Região Urbana',
      targetLabel: 'Parâmetro de umidade',
      status: 'active',
    },
    {
      id: '3',
      name: 'Qualidade do Ar Ruim',
      icon: 'cloud-rain',
      condition: 'PM2.5 > 50 µg/m³',
      conditionLabel: 'Limite de qualidade do ar',
      message: 'Qualidade do ar excede níveis seguros',
      messageLabel: 'Alerta de aviso de saúde',
      severity: 'critical',
      target: 'Estação ST-001',
      targetLabel: 'Parâmetro PM2.5',
      status: 'active',
    },
    {
      id: '4',
      name: 'Níveis Altos de CO2',
      icon: 'trending-up',
      condition: 'CO2 > 1000 ppm',
      conditionLabel: 'Limite de dióxido de carbono',
      message: 'Concentração de CO2 acima do normal',
      messageLabel: 'Alerta ambiental',
      severity: 'alert',
      target: 'Zona Industrial',
      targetLabel: 'Parâmetro CO2',
      status: 'active',
    },
    {
      id: '5',
      name: 'Queda de Pressão',
      icon: 'arrow-down',
      condition: 'Pressão < 950 hPa',
      conditionLabel: 'Aviso de baixa pressão',
      message: 'Pressão atmosférica abaixo do normal',
      messageLabel: 'Alerta do sistema meteorológico',
      severity: 'alert',
      target: 'Região Costeira',
      targetLabel: 'Parâmetro de pressão',
      status: 'inactive',
    },
  ]

  // Função para filtrar alertas
  const filterAlerts = (alerts: AlertRule[], filters: AlertFilters): AlertRule[] => {
    return alerts.filter((alert) => {
      const matchesSearch =
        alert.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        alert.condition.toLowerCase().includes(filters.search.toLowerCase()) ||
        alert.message.toLowerCase().includes(filters.search.toLowerCase()) ||
        alert.target.toLowerCase().includes(filters.search.toLowerCase())

      const matchesStatus = filters.status === 'all' || alert.status === filters.status

      return matchesSearch && matchesStatus
    })
  }

  // Função para calcular estatísticas
  const calculateStats = (alerts: AlertRule[]): AlertStats => {
    const active = alerts.filter((alert) => alert.status === 'active').length
    const critical = alerts.filter((alert) => alert.severity === 'critical').length

    const bySeverity = alerts.reduce(
      (acc, alert) => {
        acc[alert.severity] = (acc[alert.severity] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return {
      total: alerts.length,
      active,
      critical,
      bySeverity,
    }
  }

  // Função para buscar alerta por ID
  const getAlertById = (id: string): AlertRule | undefined => {
    return alerts.find((alert) => alert.id === id)
  }

  // Função para criar novo alerta
  const createAlert = (newAlert: Omit<AlertRule, 'id'>): AlertRule => {
    const id = (alerts.length + 1).toString()
    return { ...newAlert, id }
  }

  // Função para atualizar alerta
  const updateAlert = (id: string, updates: Partial<AlertRule>): AlertRule | null => {
    const alertIndex = alerts.findIndex((alert) => alert.id === id)
    if (alertIndex === -1) return null

    return { ...alerts[alertIndex], ...updates }
  }

  // Função para deletar alerta
  const deleteAlert = (id: string): boolean => {
    const alertIndex = alerts.findIndex((alert) => alert.id === id)
    if (alertIndex === -1) return false

    alerts.splice(alertIndex, 1)
    return true
  }

  return {
    // Dados
    alerts,
    stats: calculateStats(alerts),

    // Funções de filtro
    filterAlerts,

    // Funções CRUD
    getAlertById,
    createAlert,
    updateAlert,
    deleteAlert,
  }
}
