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
import type { AlarmRule, AlarmStats } from '../pages/use-alarms'
import { Button } from '@/ui/shadcn/components/button'
import { Modal, type ModalRef } from '@/ui/global/widgets/components/modal'
import { useRef } from 'react'
import { CreateAlarmForm } from './create-alarm-form'

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

interface AlarmRowProps {
  alarm: AlarmRule
  onView: (alarmId: string) => void
  onEdit: (alarmId: string) => void
  onDelete: (alarmId: string) => void
}

const AlarmRow = ({ alarm, onView, onEdit, onDelete }: AlarmRowProps) => {
  return (
    <tr key={alarm.id} className='border-t border-stone-200 hover:bg-gray-50'>
      <td className='px-4 py-3'>
        <div className='flex items-center gap-3'>
          <div className='flex-shrink-0 w-8 h-8 bg-gray-100 rounded flex items-center justify-center'>
            {getIcon(alarm.icon)}
          </div>
          <div className='text-sm font-medium text-gray-900'>{alarm.name}</div>
        </div>
      </td>

      <td className='px-4 py-3'>
        <div>
          <div className='text-sm text-gray-900'>{alarm.condition}</div>
          <div className='text-xs text-gray-500'>{alarm.conditionLabel}</div>
        </div>
      </td>

      <td className='px-4 py-3'>
        <div>
          <div className='text-sm text-gray-900'>{alarm.message}</div>
          <div className='text-xs text-gray-500'>{alarm.messageLabel}</div>
        </div>
      </td>

      <td className='px-4 py-3'>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getSeverityColor(alarm.severity)}`}
        >
          {getSeverityIcon(alarm.severity)}
          <span className='ml-1'>
            {alarm.severity === 'critical' ? 'Crítico' : 'Alarme'}
          </span>
        </span>
      </td>

      <td className='px-4 py-3 text-center'>
        <div className='flex flex-col items-center'>
          <div className='text-sm text-gray-900 font-medium'>{alarm.target}</div>
          <div className='text-xs text-gray-500'>{alarm.targetLabel}</div>
        </div>
      </td>

      <td className='px-4 py-3 text-center'>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(alarm.status)}`}
        >
          <Circle className='w-2 h-2 mr-1' />
          {alarm.status === 'active' ? 'Ativo' : 'Inativo'}
        </span>
      </td>

      <td className='px-4 py-3 text-center'>
        <div className='flex space-x-3 justify-center'>
          <button
            type='button'
            onClick={() => onView(alarm.id)}
            className='bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-900 rounded p-1 transition-colors cursor-pointer'
          >
            <Eye className='w-4 h-4' />
          </button>
          <button
            type='button'
            onClick={() => onEdit(alarm.id)}
            className='bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 rounded p-1 transition-colors cursor-pointer'
          >
            <Edit className='w-4 h-4' />
          </button>
          {alarm.status === 'active' && (
            <button
              type='button'
              onClick={() => onDelete(alarm.id)}
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

interface AlarmsTableProps {
  alarms: AlarmRule[]
  stats: AlarmStats
  onViewAlarm: (alarmId: string) => void
  onEditAlarm: (alarmId: string) => void
  onDeleteAlarm: (alarmId: string) => void
}

export const AlarmsTable = ({
  alarms,
  stats,
  onViewAlarm,
  onEditAlarm,
  onDeleteAlarm,
}: AlarmsTableProps) => {
  const modalRef = useRef<ModalRef>(null)

  const handleCreateAlarm = () => {
    modalRef.current?.open()
  }

  return (
    <div className='bg-white rounded-lg shadow-sm border'>
      <div className='px-6 py-4 border-b border-gray-200'>
        <div className='flex items-center justify-between'>
          <h2 className='text-lg font-semibold text-gray-900'>Regras de Alarme</h2>
          <Button
            onClick={handleCreateAlarm}
            className='bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg shadow-sm transition-colors flex items-center gap-2 cursor-pointer'
          >
            <Plus className='w-4 h-4' />
            Novo Alarme
          </Button>
        </div>

        <div className='mt-2 flex gap-4 text-xs text-gray-600'>
          <span>Total: {stats.total}</span>
          <span>Ativos: {stats.active}</span>
          <span>Críticos: {stats.critical}</span>
          {Object.entries(stats.bySeverity).map(([severity, count]) => (
            <span key={severity}>
              {severity === 'critical' ? 'Críticos' : 'Alarmes'}: {count}
            </span>
          ))}
        </div>
      </div>

      <div className='overflow-x-auto rounded-lg border border-stone-200'>
        <table className='min-w-full text-left text-sm'>
          <thead className='bg-stone-50 text-stone-700'>
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
                  className={`px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${
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
          <tbody>
            {alarms.map((alarm) => (
              <AlarmRow
                key={alarm.id}
                alarm={alarm}
                onView={onViewAlarm}
                onEdit={onEditAlarm}
                onDelete={onDeleteAlarm}
              />
            ))}

            {alarms.length === 0 && (
              <tr>
                <td colSpan={7} className='px-4 py-8 text-center text-gray-500'>
                  Nenhum alarme configurado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal
        ref={modalRef}
        title='Criar Novo Alarme'
        size='lg'
        hideScrollbar={true}
        onOpen={() => console.log('Modal de novo alarme aberto')}
        onClose={() => console.log('Modal de novo alarme fechado')}
      >
        {(close) => <CreateAlarmForm onClose={close} />}
      </Modal>
    </div>
  )
}
