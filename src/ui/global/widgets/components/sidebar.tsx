import {
  ChartLine,
  Bell,
  SlidersHorizontal,
  Settings,
  User,
  ChevronUp,
  RadioTower,
  Newspaper,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/shadcn/components/avatar'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/ui/shadcn/components/sidebar'

type Props = {
  current?:
  | '/dashboard'
  | '/stations'
  | '/parameters'
  | '/alerts'
  | '/reports'
  | '/configuration'
}

export function AppSidebar({ current = '/alerts' }: Props) {
  const isActive = (path: Props['current']) => current === path

  const activeButtonStyles = 'bg-gradient-to-r from-green-100  to-transparent border-r-4 border-green-500'
  const inactiveButtonStyles = 'hover:bg-gray-50'
  const activeIconStyles = 'text-green-600'
  const inactiveIconStyles = 'text-gray-600'
  const activeTextStyles = 'text-gray-700 font-medium'
  const inactiveTextStyles = 'text-gray-700'

  const getButtonStyles = (path: Props['current']) =>
    `flex items-center gap-3 px-4 py-3 transition ${isActive(path) ? activeButtonStyles : inactiveButtonStyles}`

  const getIconStyles = (path: Props['current']) =>
    `w-5 h-5 ${isActive(path) ? activeIconStyles : inactiveIconStyles}`

  const getTextStyles = (path: Props['current']) =>
    isActive(path) ? activeTextStyles : inactiveTextStyles

  return (
    <Sidebar className='w-64 bg-white border-r border-gray-200'>
      <SidebarHeader className='p-6'>
        <div className='flex items-center gap-1'>
          <img
            src='../../../../../public/images/logo.png'
            alt='Logo'
            className='w-9 h-9 border-2 border-gray-200 rounded-lg'
          />
          <span className='text-lg font-bold text-gray-800 leading-none'>Gaia</span>
        </div>
      </SidebarHeader>

      <SidebarContent className='px-0'>
        <SidebarGroup className='p-0 mx-0'>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className='w-full rounded-none'>
                  <a
                    href='/dashboard'
                    className={getButtonStyles('/dashboard')}
                    aria-current={isActive('/dashboard') ? 'page' : undefined}
                  >
                    <ChartLine className={getIconStyles('/dashboard')} />
                    <span className={getTextStyles('/dashboard')}>Dashboard</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild className='w-full rounded-none'>
                  <a
                    href='/stations'
                    className={getButtonStyles('/stations')}
                    aria-current={isActive('/stations') ? 'page' : undefined}
                  >
                    <RadioTower className={getIconStyles('/stations')} />
                    <span className={getTextStyles('/stations')}>Estações</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild className='w-full rounded-none'>
                  <a
                    href='/parameters'
                    className={getButtonStyles('/parameters')}
                    aria-current={isActive('/parameters') ? 'page' : undefined}
                  >
                    <SlidersHorizontal className={getIconStyles('/parameters')} />
                    <span className={getTextStyles('/parameters')}>Parâmetros</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive className='w-full rounded-none'>
                  <a
                    href='/alerts'
                    className={getButtonStyles('/alerts')}
                    aria-current='page'
                  >
                    <Bell className={getIconStyles('/alerts')} />
                    <span className={getTextStyles('/alerts')}>Alertas</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild className='w-full rounded-none'>
                  <a
                    href='/reports'
                    className={getButtonStyles('/reports')}
                    aria-current={isActive('/reports') ? 'page' : undefined}
                  >
                    <Newspaper className={getIconStyles('/reports')} />
                    <span className={getTextStyles('/reports')}>Relatórios</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild className='w-full rounded-none'>
                  <a
                    href='/configuration'
                    className={getButtonStyles('/configuration')}
                    aria-current={isActive('/configuration') ? 'page' : undefined}
                  >
                    <Settings className={getIconStyles('/configuration')} />
                    <span className={getTextStyles('/configuration')}>Configuração</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className='p-4'>
        <div className='border-t border-gray-200 pt-4'>
          <div className='flex items-center gap-3'>
            <Avatar className='w-10 h-10'>
              <AvatarImage src='https://github.com/shadcn.png' alt='Thigszin' />
              <AvatarFallback className='bg-gradient-to-br from-pink-200 to-pink-300 text-pink-600 font-medium'>
                T
              </AvatarFallback>
            </Avatar>

            <div className='flex-1 min-w-0'>
              <p className='text-sm font-medium text-gray-800 truncate'>Thigszin</p>
              <p className='text-xs text-gray-500 truncate'>Administrador</p>
            </div>

            <ChevronUp className='w-4 h-4 text-gray-400' />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
