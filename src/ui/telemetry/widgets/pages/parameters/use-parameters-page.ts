import { useLocation } from "react-router";
import type { ParameterDto } from "@/core/dtos/ParameterDto";

// ‼️‼️‼️‼️ ESSA PAGINA ESTA MOCKADA APENAS POR DEMONSTRAÇÃO, NADA DISSO VAI ESTAR AQUI.

const mockParameters: ParameterDto[] = [
  {
    id: "1",
    name: "Temperatura do Ar",
    unit: "°C",
    factor: 0.1,
    offset: -40.0,
    active: true,
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    name: "Umidade Relativa",
    unit: "%",
    factor: 0.1,
    offset: 0.0,
    active: true,
    createdAt: "2024-01-15T10:35:00Z",
  },
  {
    id: "3",
    name: "Pressão Atmosférica",
    unit: "hPa",
    factor: 0.1,
    offset: 300.0,
    active: true,
    createdAt: "2024-01-15T10:40:00Z",
  },
  {
    id: "4",
    name: "Velocidade do Vento",
    unit: "m/s",
    factor: 0.1,
    offset: 0.0,
    active: false,
    createdAt: "2024-01-15T10:45:00Z",
  },
  {
    id: "5",
    name: "Direção do Vento",
    unit: "°",
    factor: 1.0,
    offset: 0.0,
    active: true,
    createdAt: "2024-01-15T10:50:00Z",
  },
  {
    id: "6",
    name: "Radiação Solar",
    unit: "W/m²",
    factor: 1.0,
    offset: 0.0,
    active: true,
    createdAt: "2024-01-15T10:55:00Z",
  },
  {
    id: "7",
    name: "Precipitação",
    unit: "mm",
    factor: 0.1,
    offset: 0.0,
    active: false,
    createdAt: "2024-01-15T11:00:00Z",
  },
  {
    id: "8",
    name: "Índice UV",
    unit: "índice",
    factor: 0.1,
    offset: 0.0,
    active: true,
    createdAt: "2024-01-15T11:05:00Z",
  },
];

export type ParametersPageProps = {
  items: ParameterDto[];
  nextCursor: string | null;
  prevCursor: string | null;
  limit: number;
  q: string;
  status: string;
};

export function useParametersPage() {
  const { search } = useLocation();

  const searchParams = new URLSearchParams(search);
  const q = searchParams.get("q") || "";
  const status = searchParams.get("status") || "all";
  const limit = parseInt(searchParams.get("limit") || "10");
  const cursor = searchParams.get("cursor");

  const filteredItems = mockParameters.filter((item) => {
    const matchesName = item.name.toLowerCase().includes(q.toLowerCase());
    const matchesStatus =
      status === "all" ||
      (status === "active" && item.active) ||
      (status === "inactive" && !item.active);
    return matchesName && matchesStatus;
  });

  const startIndex = cursor ? parseInt(cursor) : 0;
  const endIndex = startIndex + limit;
  const items = filteredItems.slice(startIndex, endIndex);
  const nextCursor = endIndex < filteredItems.length ? String(endIndex) : null;
  const prevCursor =
    startIndex > 0 ? String(Math.max(0, startIndex - limit)) : null;

  const handleView = (id: string) => {
    console.log("Visualizar parâmetro:", id);
  };

  const handleEdit = (id: string) => {
    console.log("Editar parâmetro:", id);
  };

  const handleToggleStatus = (id: string) => {
    console.log("Alternar status do parâmetro:", id);
  };

  return {
    items,
    nextCursor,
    prevCursor,
    limit,
    q,
    status,
    searchParams,
    onView: handleView,
    onEdit: handleEdit,
    onToggleStatus: handleToggleStatus,
  };
}
