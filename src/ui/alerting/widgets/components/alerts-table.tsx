import {
  Thermometer,
  Droplets,
  CloudRain,
  TrendingUp,
  ArrowDown,
  AlertTriangle,
  Circle,
  Eye,
  Edit,
  Trash2,
  Plus,
} from 'lucide-react'
import type { AlertRule, AlertStats } from '../pages/use-alerts'
import { Button } from '@/ui/shadcn/components/button'
import { Input } from '@/ui/shadcn/components/input'
import { Label } from '@/ui/shadcn/components/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/shadcn/components/select'
import { Modal, type ModalRef } from '@/ui/global/widgets/components/modal'
import { useRef } from 'react'

const getIcon = (iconName: string) => {
  const iconMap = {
    thermometer: Thermometer,
    droplets: Droplets,
    'cloud-rain': CloudRain,
    'trending-up': TrendingUp,
    'arrow-down': ArrowDown,
  }

  const IconComponent = iconMap[iconName as keyof typeof iconMap] || Thermometer
  return <IconComponent className='w-4 h-4' />
}

const getSeverityIcon = (severity: string) => {
  if (severity === 'critical') {
    return <AlertTriangle className='w-3 h-3' />
  }
  return <Circle className='w-3 h-3' />
}

const getSeverityColor = (severity: string) => {
  if (severity === 'critical') {
    return 'bg-red-100 text-red-800 border-red-200'
  }
  return 'bg-yellow-100 text-yellow-800 border-yellow-200'
}

const getStatusColor = (status: string) => {
  if (status === 'active') {
    return 'bg-green-100 text-green-800 border-green-200'
  }
  return 'bg-gray-100 text-gray-800 border-gray-200'
}

interface AlertRowProps {
  alert: AlertRule
  onView: (alertId: string) => void
  onEdit: (alertId: string) => void
  onDelete: (alertId: string) => void
}

const AlertRow = ({ alert, onView, onEdit, onDelete }: AlertRowProps) => {
  return (
    <tr key={alert.id} className='hover:bg-gray-50'>
      {/* Nome */}
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='flex items-center'>
          <div className='flex-shrink-0 w-8 h-8 bg-gray-100 rounded flex items-center justify-center mr-3'>
            {getIcon(alert.icon)}
          </div>
          <div className='text-sm font-medium text-gray-900'>{alert.name}</div>
        </div>
      </td>

      {/* Condição */}
      <td className='px-6 py-4'>
        <div>
          <div className='text-sm text-gray-900'>{alert.condition}</div>
          <div className='text-xs text-gray-500'>{alert.conditionLabel}</div>
        </div>
      </td>

      {/* Mensagem */}
      <td className='px-6 py-4'>
        <div>
          <div className='text-sm text-gray-900'>{alert.message}</div>
          <div className='text-xs text-gray-500'>{alert.messageLabel}</div>
        </div>
      </td>

      {/* Severidade */}
      <td className='px-6 py-4 whitespace-nowrap'>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getSeverityColor(alert.severity)}`}
        >
          {getSeverityIcon(alert.severity)}
          <span className='ml-1'>
            {alert.severity === 'critical' ? 'Crítico' : 'Alerta'}
          </span>
        </span>
      </td>

      {/* Alvo */}
      <td className='px-6 py-4 text-center'>
        <div className='flex flex-col items-center'>
          <div className='text-sm text-gray-900 font-medium'>{alert.target}</div>
          <div className='text-xs text-gray-500'>{alert.targetLabel}</div>
        </div>
      </td>

      {/* Status */}
      <td className='px-6 py-4 whitespace-nowrap text-center'>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(alert.status)}`}
        >
          <Circle className='w-2 h-2 mr-1' />
          {alert.status === 'active' ? 'Ativo' : 'Inativo'}
        </span>
      </td>

      {/* Ações */}
      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-center'>
        <div className='flex space-x-3 justify-center'>
          <button
            type='button'
            onClick={() => onView(alert.id)}
            className='bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-900 rounded p-1 transition-colors cursor-pointer'
          >
            <Eye className='w-4 h-4' />
          </button>
          <button
            type='button'
            onClick={() => onEdit(alert.id)}
            className='bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 rounded p-1 transition-colors cursor-pointer'
          >
            <Edit className='w-4 h-4' />
          </button>
          {alert.status === 'active' && (
            <button
              type='button'
              onClick={() => onDelete(alert.id)}
              className='bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-900 rounded p-1 transition-colors cursor-pointer'
            >
              <Trash2 className='w-4 h-4' />
            </button>
          )}
        </div>
      </td>
    </tr>
  )
}

interface AlertsTableProps {
  alerts: AlertRule[]
  stats: AlertStats
  onViewAlert: (alertId: string) => void
  onEditAlert: (alertId: string) => void
  onDeleteAlert: (alertId: string) => void
}

export const AlertsTable = ({
  alerts,
  stats,
  onViewAlert,
  onEditAlert,
  onDeleteAlert,
}: AlertsTableProps) => {
  const modalRef = useRef<ModalRef>(null)

  // Usar stats do Model ao invés de calcular aqui

  const handleCreateAlert = () => {
    modalRef.current?.open()
  }

  return (
    <div className='bg-white rounded-lg shadow-sm border'>
      {/* Header */}
      <div className='px-6 py-4 border-b border-gray-200'>
        <div className='flex items-center justify-between'>
          <h2 className='text-lg font-semibold text-gray-900'>Regras de Alerta</h2>
          <Button
            onClick={handleCreateAlert}
            className='bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg shadow-sm transition-colors flex items-center gap-2 cursor-pointer'
          >
            <Plus className='w-4 h-4' />
            Novo Alerta
          </Button>
        </div>

        {/* Estatísticas dos alertas */}
        <div className='mt-2 flex gap-4 text-xs text-gray-600'>
          <span>Total: {stats.total}</span>
          <span>Ativos: {stats.active}</span>
          <span>Críticos: {stats.critical}</span>
          {Object.entries(stats.bySeverity).map(([severity, count]) => (
            <span key={severity}>
              {severity === 'critical' ? 'Críticos' : 'Alertas'}: {count}
            </span>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead className='bg-gray-50'>
            <tr>
              {[
                'NOME',
                'CONDIÇÃO',
                'MENSAGEM',
                'SEVERIDADE',
                'ALVO',
                'STATUS',
                'AÇÕES',
              ].map((header) => (
                <th
                  key={header}
                  className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    header === 'STATUS' || header === 'AÇÕES' || header === 'ALVO'
                      ? 'text-center'
                      : 'text-left'
                  }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {/* Map principal para listar todos os alertas */}
            {alerts.map((alert) => (
              <AlertRow
                key={alert.id}
                alert={alert}
                onView={onViewAlert}
                onEdit={onEditAlert}
                onDelete={onDeleteAlert}
              />
            ))}

            {/* Exemplo de map condicional - só mostra se não há alertas */}
            {alerts.length === 0 && (
              <tr>
                <td colSpan={7} className='px-6 py-8 text-center text-gray-500'>
                  Nenhum alerta configurado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal para criar novo alerta */}
      <Modal
        ref={modalRef}
        title='Criar Novo Alerta'
        size='lg'
        hideScrollbar={true}
        onOpen={() => console.log('Modal de novo alerta aberto')}
        onClose={() => console.log('Modal de novo alerta fechado')}
      >
        {(close) => (
          <div className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='alert-name'>Nome do Alerta</Label>
                <Input id='alert-name' placeholder='Ex: Temperatura Alta' />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='alert-icon'>Ícone</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder='Selecione um ícone' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='thermometer'>Termômetro</SelectItem>
                    <SelectItem value='droplets'>Gotas</SelectItem>
                    <SelectItem value='cloud-rain'>Nuvem com chuva</SelectItem>
                    <SelectItem value='trending-up'>Seta para cima</SelectItem>
                    <SelectItem value='arrow-down'>Seta para baixo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='alert-condition'>Condição</Label>
                <Input id='alert-condition' placeholder='Ex: Temperatura > 35°C' />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='alert-severity'>Severidade</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder='Selecione a severidade' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='alert'>Alerta</SelectItem>
                    <SelectItem value='critical'>Crítico</SelectItem>
                    <SelectItem value='warning'>Aviso</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='alert-message'>Mensagem</Label>
              <textarea
                id='alert-message'
                className='flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                rows={3}
                placeholder='Ex: Temperatura acima do nível crítico'
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='alert-target'>Alvo</Label>
                <Input id='alert-target' placeholder='Ex: Todas as Estações' />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='alert-status'>Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder='Selecione o status' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='active'>Ativo</SelectItem>
                    <SelectItem value='inactive'>Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className='flex justify-end space-x-3 pt-4 border-t border-gray-200'>
              <Button
                variant='outline'
                onClick={close}
                className='px-6 py-2 cursor-pointer'
              >
                Cancelar
              </Button>
              <Button
                onClick={close}
                className='px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white cursor-pointer'
              >
                Criar Alerta
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
