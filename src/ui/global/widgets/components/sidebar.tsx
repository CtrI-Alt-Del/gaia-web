import {
  BarChart3,
  Bell,
  Filter,
  Settings,
  User,
  ChevronUp,
} from "lucide-react";
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
} from "@/ui/shadcn/components/sidebar";

type Props = { current?: "/dashboard" | "/stations" | "/parameters" | "/alerts" | "/reports" | "/configuration" };

export function AppSidebar({ current = "/alerts" }: Props) {
  const isActive = (path: Props["current"]) => current === path;

  return (
    <Sidebar className="w-64 bg-white border-r border-gray-200">
      {/* Header */}
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          {/* Marca (quadrado roxo com ponto verde) */}
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg grid place-items-center">
            <div className="w-4 h-4 bg-green-400 rounded-sm" />
          </div>
          <span className="text-lg font-bold text-gray-800 leading-none">Gaia</span>
        </div>
      </SidebarHeader>

      {/* Menu */}
      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>

              <SidebarMenuItem>
                <SidebarMenuButton asChild className="w-full">
                  <a
                    href="/dashboard"
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg transition
                                ${isActive("/dashboard")
                                  ? "bg-gradient-to-r from-green-100 to-transparent"
                                  : "hover:bg-gray-50"}`}
                    aria-current={isActive("/dashboard") ? "page" : undefined}
                  >
                    <BarChart3 className={`w-5 h-5 ${isActive("/dashboard") ? "text-green-600" : "text-gray-600"}`} />
                    <span className="text-gray-700">Dashboard</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild className="w-full">
                  <a
                    href="/stations"
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg transition
                                ${isActive("/stations")
                                  ? "bg-gradient-to-r from-green-100 to-transparent"
                                  : "hover:bg-gray-50"}`}
                    aria-current={isActive("/stations") ? "page" : undefined}
                  >
                    {/* “barrinhas” das estações */}
                    <div className="w-5 h-5 flex items-end justify-center text-gray-600">
                      <div className="w-1 h-4 bg-gray-600 rounded-full" />
                      <div className="w-1 h-4 bg-gray-600 rounded-full mx-1" />
                      <div className="w-1 h-1 bg-gray-600 rounded-full" />
                    </div>
                    <span className="text-gray-700">Estações</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild className="w-full">
                  <a
                    href="/parameters"
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg transition
                                ${isActive("/parameters")
                                  ? "bg-gradient-to-r from-green-100 to-transparent"
                                  : "hover:bg-gray-50"}`}
                    aria-current={isActive("/parameters") ? "page" : undefined}
                  >
                    <Filter className={`w-5 h-5 ${isActive("/parameters") ? "text-green-600" : "text-gray-600"}`} />
                    <span className="text-gray-700">Parâmetros</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                {/* Item ativo “Alertas” com highlight idêntico ao mock */}
                <SidebarMenuButton asChild isActive className="w-full">
                  <a
                    href="/alerts"
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg bg-gradient-to-r from-green-100 to-transparent`}
                    aria-current="page"
                  >
                    <Bell className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700 font-medium">Alertas</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild className="w-full">
                  <a
                    href="/reports"
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg transition
                                ${isActive("/reports")
                                  ? "bg-gradient-to-r from-green-100 to-transparent"
                                  : "hover:bg-gray-50"}`}
                    aria-current={isActive("/reports") ? "page" : undefined}
                  >
                    <div className="w-5 h-5 flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-gray-600 rounded-full flex items-center justify-center">
                        <div className="w-1 h-2 bg-gray-600 rounded-full" />
                        <div className="w-1 h-1 bg-gray-600 rounded-full ml-0.5" />
                      </div>
                    </div>
                    <span className="text-gray-700">Relatórios</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild className="w-full">
                  <a
                    href="/configuration"
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg transition
                                ${isActive("/configuration")
                                  ? "bg-gradient-to-r from-green-100 to-transparent"
                                  : "hover:bg-gray-50"}`}
                    aria-current={isActive("/configuration") ? "page" : undefined}
                  >
                    <Settings className={`w-5 h-5 ${isActive("/configuration") ? "text-green-600" : "text-gray-600"}`} />
                    <span className="text-gray-700">Configuração</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-4">
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-200 to-pink-300 grid place-items-center">
              <User className="w-6 h-6 text-pink-600" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">Thigszin</p>
              <p className="text-xs text-gray-500 truncate">Administrador</p>
            </div>

            <ChevronUp className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
