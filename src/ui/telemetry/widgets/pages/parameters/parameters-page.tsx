import { Link, Form, useLocation } from "react-router";
import type { ParameterDto } from "@/core/dtos/ParameterDto";
import { Input } from "@/ui/shadcn/components/input";
import { Button } from "@/ui/shadcn/components/button";
import { Badge } from "@/ui/shadcn/components/badge";
import { StatusPill } from "@/ui/shadcn/components/status-pill";
import {
  Table,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  TableFooter,
} from "@/ui/shadcn/components/table";
import { Pencil, Power, Thermometer, Droplets, Wind, Sun, Cloud, Gauge } from "lucide-react";

export type ParametersPageProps = {
  items: ParameterDto[];
  nextCursor: string | null;
  prevCursor: string | null;
  limit: number;
  q: string;
};

// ‼️‼️‼️‼️ ESSA PAGINA ESTA MOCKADA APENAS POR DEMONSTRAÇÃO, NADA DISSO VAI ESTAR AQUI.

const mockParameters: ParameterDto[] = [
  {
    id: "1",
    name: "Temperatura do Ar",
    unit: "°C",
    factor: 0.1,
    offset: -40.0,
    active: true,
    createdAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "2",
    name: "Umidade Relativa",
    unit: "%",
    factor: 0.1,
    offset: 0.0,
    active: true,
    createdAt: "2024-01-15T10:35:00Z"
  },
  {
    id: "3",
    name: "Pressão Atmosférica",
    unit: "hPa",
    factor: 0.1,
    offset: 300.0,
    active: true,
    createdAt: "2024-01-15T10:40:00Z"
  },
  {
    id: "4",
    name: "Velocidade do Vento",
    unit: "m/s",
    factor: 0.1,
    offset: 0.0,
    active: false,
    createdAt: "2024-01-15T10:45:00Z"
  },
  {
    id: "5",
    name: "Direção do Vento",
    unit: "°",
    factor: 1.0,
    offset: 0.0,
    active: true,
    createdAt: "2024-01-15T10:50:00Z"
  },
  {
    id: "6",
    name: "Radiação Solar",
    unit: "W/m²",
    factor: 1.0,
    offset: 0.0,
    active: true,
    createdAt: "2024-01-15T10:55:00Z"
  },
  {
    id: "7",
    name: "Precipitação",
    unit: "mm",
    factor: 0.1,
    offset: 0.0,
    active: false,
    createdAt: "2024-01-15T11:00:00Z"
  },
  {
    id: "8",
    name: "Índice UV",
    unit: "índice",
    factor: 0.1,
    offset: 0.0,
    active: true,
    createdAt: "2024-01-15T11:05:00Z"
  }
];

const getParameterIcon = (name: string) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('temperatura')) return {
    Icon: Thermometer,
    iconColor: 'text-red-500',
    badgeColor: 'bg-red-50 ring-red-200',
    iconBgColor: 'bg-red-100'
  };
  if (lowerName.includes('umidade') || lowerName.includes('precipitação')) return {
    Icon: Droplets,
    iconColor: 'text-blue-500',
    badgeColor: 'bg-blue-50 ring-blue-200',
    iconBgColor: 'bg-blue-100'
  };
  if (lowerName.includes('vento')) return {
    Icon: Wind,
    iconColor: 'text-gray-500',
    badgeColor: 'bg-gray-50 ring-gray-200',
    iconBgColor: 'bg-gray-100'
  };
  if (lowerName.includes('radiação') || lowerName.includes('uv')) return {
    Icon: Sun,
    iconColor: 'text-yellow-500',
    badgeColor: 'bg-yellow-50 ring-yellow-200',
    iconBgColor: 'bg-yellow-100'
  };
  if (lowerName.includes('pressão')) return {
    Icon: Gauge,
    iconColor: 'text-purple-500',
    badgeColor: 'bg-purple-50 ring-purple-200',
    iconBgColor: 'bg-purple-100'
  };
  return {
    Icon: Cloud,
    iconColor: 'text-gray-400',
    badgeColor: 'bg-gray-50 ring-gray-200',
    iconBgColor: 'bg-gray-100'
  };
};

const getBadgeColor = (unit: string): 'stone' | 'blue' | 'sky' | 'teal' | 'green' | 'yellow' | 'orange' | 'red' | 'violet' => {
  const unitColors: Record<string, 'stone' | 'blue' | 'sky' | 'teal' | 'green' | 'yellow' | 'orange' | 'red' | 'violet'> = {
    '°C': 'blue',
    '%': 'green',
    'hPa': 'violet',
    'm/s': 'orange',
    '°': 'sky',
    'W/m²': 'yellow',
    'mm': 'teal',
    'índice': 'red'
  };
  return unitColors[unit] || 'stone';
};

const getParameterInfo = (name: string) => {
  const info: Record<string, { description: string; category: string }> = {
    'Temperatura do Ar': {
      description: 'Medição da temperatura ambiente',
      category: 'Temperatura'
    },
    'Umidade Relativa': {
      description: 'Percentual de umidade no ar',
      category: 'Umidade'
    },
    'Pressão Atmosférica': {
      description: 'Pressão exercida pela atmosfera',
      category: 'Pressão'
    },
    'Velocidade do Vento': {
      description: 'Velocidade do movimento do ar',
      category: 'Vento'
    },
    'Direção do Vento': {
      description: 'Direção de onde vem o vento',
      category: 'Vento'
    },
    'Radiação Solar': {
      description: 'Intensidade da radiação solar',
      category: 'Radiação'
    },
    'Precipitação': {
      description: 'Quantidade de chuva acumulada',
      category: 'Precipitação'
    },
    'Índice UV': {
      description: 'Índice de radiação ultravioleta',
      category: 'Radiação'
    }
  };
  return info[name] || { description: 'Parâmetro meteorológico', category: 'Geral' };
};

const urlWith = (params: Record<string, string>) => {
  const searchParams = new URLSearchParams(window.location.search);
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }
  });
  return `?${searchParams.toString()}`;
};

export function ParametersPage() {
  const { search } = useLocation();

  const searchParams = new URLSearchParams(search);
  const q = searchParams.get('q') || '';
  const status = searchParams.get('status') || 'all';
  const limit = parseInt(searchParams.get('limit') || '10');
  const cursor = searchParams.get('cursor');

  const filteredItems = mockParameters.filter(item => {
    const matchesName = item.name.toLowerCase().includes(q.toLowerCase());
    const matchesStatus = status === 'all' ||
      (status === 'active' && item.active) ||
      (status === 'inactive' && !item.active);
    return matchesName && matchesStatus;
  });

  const startIndex = cursor ? parseInt(cursor) : 0;
  const endIndex = startIndex + limit;
  const items = filteredItems.slice(startIndex, endIndex);
  const nextCursor = endIndex < filteredItems.length ? String(endIndex) : null;
  const prevCursor = startIndex > 0 ? String(Math.max(0, startIndex - limit)) : null;

  return (
    <section className="container mx-auto p-4 pt-16">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold">Parâmetros Meteorológicos</h1>
          <p className="text-sm text-stone-600">Filtros por nome e status</p>
        </div>

        <Form method="get" replace className="flex flex-wrap items-end gap-2">
          <div className="flex flex-col">
            <label htmlFor="q" className="text-xs text-stone-600">
              Filtrar por nome
            </label>
            <Input id="q" name="q" defaultValue={q} placeholder="Ex.: Temperatura" className="h-9 w-56" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="status" className="text-xs text-stone-600">
              Status
            </label>
            <select
              id="status"
              name="status"
              defaultValue={searchParams.get('status') || 'all'}
              className="h-9 rounded-md border border-stone-300 px-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos</option>
              <option value="active">Ativos</option>
              <option value="inactive">Inativos</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="limit" className="text-xs text-stone-600">
              Itens por página
            </label>
            <select
              id="limit"
              name="limit"
              defaultValue={String(limit ?? 10)}
              className="h-9 rounded-md border border-stone-300 px-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[5, 10, 20, 50].map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
          <Button type="submit" className="h-9">
            Aplicar
          </Button>
        </Form>
      </div>

      <div className="rounded-lg border border-stone-200">
        <Table>
          <TableCaption>Parâmetros Meteorológicos</TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead>NOME</TableHead>
              <TableHead>DESCRIÇÃO</TableHead>
              <TableHead>UNIDADE</TableHead>
              <TableHead>FATOR</TableHead>
              <TableHead>OFFSET</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead className="text-right">AÇÕES</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {items.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-stone-500 py-10">
                  Nenhum parâmetro encontrado.
                </TableCell>
              </TableRow>
            )}

            {items.map((p) => {
              const { Icon: IconComponent, iconColor, badgeColor } = getParameterIcon(p.name);
              const { description, category } = getParameterInfo(p.name);
              const color = getBadgeColor(p.unit);

              return (
                <TableRow key={p.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex size-9 items-center justify-center rounded-xl ring-1 ${badgeColor}`}
                      >
                        <IconComponent className={`size-5 ${iconColor}`} />
                      </span>
                      <div className="leading-tight">
                        <div className="font-medium">{p.name}</div>
                        <div className="text-xs text-stone-500">
                          Criado em {new Date(p.createdAt).toLocaleString("pt-BR")}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="text-stone-800">{description}</div>
                    <div className="text-xs text-stone-500">{category}</div>
                  </TableCell>

                  <TableCell>
                    <Badge color={color} className="capitalize">
                      {p.unit}
                    </Badge>
                  </TableCell>

                  <TableCell className="tabular-nums">{p.factor}</TableCell>
                  <TableCell className="tabular-nums">{p.offset}</TableCell>

                  <TableCell>
                    <StatusPill active={p.active} />
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="inline-flex items-center justify-end gap-3 text-sm">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 text-stone-700 hover:underline"
                      >
                        <Pencil className="size-4" /> Editar
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 text-red-700 hover:underline"
                      >
                        <Power className="size-4" /> {p.active ? "Desativar" : "Ativar"}
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={4} className="text-xs text-stone-600">
                Mostrando até {limit} itens • Nome: {q ? `"${q}"` : "nenhum"} • Status: {status === 'all' ? 'todos' : status === 'active' ? 'ativos' : 'inativos'}
              </TableCell>
              <TableCell colSpan={3} className="text-right">
                <nav className="inline-flex items-center gap-2">
                  <Link
                    to={prevCursor ? urlWith({ cursor: prevCursor }) : "#"}
                    aria-disabled={!prevCursor}
                    className={`rounded-full border px-3 py-1.5 text-sm ${prevCursor ? "hover:bg-stone-50" : "pointer-events-none opacity-50"
                      }`}
                  >
                    Anterior
                  </Link>
                  <Link
                    to={nextCursor ? urlWith({ cursor: nextCursor }) : "#"}
                    aria-disabled={!nextCursor}
                    className={`rounded-full border px-3 py-1.5 text-sm ${nextCursor ? "hover:bg-stone-50" : "pointer-events-none opacity-50"
                      }`}
                  >
                    Próxima
                  </Link>
                </nav>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </section>
  );
}
