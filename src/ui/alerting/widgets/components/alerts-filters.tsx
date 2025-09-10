import { SearchIcon } from 'lucide-react'
import InputComponent from '@/ui/global/widgets/components/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/shadcn/components/select'
import { Label } from '@/ui/shadcn/components/label'

const STATUS_OPTIONS = [
  { value: 'all', label: 'Todos os status' },
  { value: 'active', label: 'Ativo' },
  { value: 'inactive', label: 'Inativo' },
]

interface AlertsFiltersProps {
  searchValue: string
  statusValue: 'all' | 'active' | 'inactive'
  onSearchChange: (search: string) => void
  onStatusFilterChange: (status: 'all' | 'active' | 'inactive') => void
}

export const AlertsFilters = ({
  searchValue,
  statusValue,
  onSearchChange,
  onStatusFilterChange,
}: AlertsFiltersProps) => {
  return (
    <div className='w-full'>
      <div className='rounded-lg border border-gray-200 bg-white p-4'>
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:gap-6'>
          <div className='flex-1'>
            <InputComponent
              label=''
              placeholder='Pesquisar por estação, parâmetro ou status...'
              icon={<SearchIcon size={16} />}
              value={searchValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onSearchChange(e.target.value)
              }
            />
          </div>

          <div className='flex items-center gap-2'>
            <Label htmlFor='status-filter' className='text-sm font-medium text-gray-700'>
              Status:
            </Label>
            <Select value={statusValue} onValueChange={onStatusFilterChange}>
              <SelectTrigger id='status-filter' className='w-32'>
                <SelectValue placeholder='Todos os status' />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}
