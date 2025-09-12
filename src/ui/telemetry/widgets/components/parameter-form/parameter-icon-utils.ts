import {
  Thermometer,
  Droplets,
  Wind,
  Sun,
  Cloud,
  Gauge,
  Eye,
  Zap,
  Activity,
} from "lucide-react";

export type ParameterIconInfo = {
  Icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  badgeColor: string;
  iconBgColor: string;
};

export function getParameterIconFromUnit(unit: string): ParameterIconInfo {
  const unitLower = unit.toLowerCase();

  // Temperatura
  if (
    unitLower.includes("°c") ||
    unitLower.includes("°f") ||
    unitLower.includes("kelvin") ||
    unitLower.includes("k")
  ) {
    return {
      Icon: Thermometer,
      iconColor: "text-red-500",
      badgeColor: "bg-red-50 ring-red-200",
      iconBgColor: "bg-red-100",
    };
  }

  // Umidade e Precipitação
  if (
    unitLower.includes("%") ||
    unitLower.includes("umidade") ||
    unitLower.includes("humidity")
  ) {
    return {
      Icon: Droplets,
      iconColor: "text-blue-500",
      badgeColor: "bg-blue-50 ring-blue-200",
      iconBgColor: "bg-blue-100",
    };
  }

  // Pressão
  if (
    unitLower.includes("hpa") ||
    unitLower.includes("pa") ||
    unitLower.includes("bar") ||
    unitLower.includes("atm") ||
    unitLower.includes("pressão")
  ) {
    return {
      Icon: Gauge,
      iconColor: "text-purple-500",
      badgeColor: "bg-purple-50 ring-purple-200",
      iconBgColor: "bg-purple-100",
    };
  }

  // Vento
  if (
    unitLower.includes("m/s") ||
    unitLower.includes("km/h") ||
    unitLower.includes("mph") ||
    unitLower.includes("vento") ||
    unitLower.includes("wind")
  ) {
    return {
      Icon: Wind,
      iconColor: "text-gray-500",
      badgeColor: "bg-gray-50 ring-gray-200",
      iconBgColor: "bg-gray-100",
    };
  }

  // Radiação Solar e UV
  if (
    unitLower.includes("w/m²") ||
    unitLower.includes("w/m2") ||
    unitLower.includes("lux") ||
    unitLower.includes("radiação") ||
    unitLower.includes("uv") ||
    unitLower.includes("índice")
  ) {
    return {
      Icon: Sun,
      iconColor: "text-yellow-500",
      badgeColor: "bg-yellow-50 ring-yellow-200",
      iconBgColor: "bg-yellow-100",
    };
  }

  // Precipitação
  if (
    unitLower.includes("mm") ||
    unitLower.includes("cm") ||
    unitLower.includes("inch") ||
    unitLower.includes("precipitação") ||
    unitLower.includes("rain")
  ) {
    return {
      Icon: Droplets,
      iconColor: "text-teal-500",
      badgeColor: "bg-teal-50 ring-teal-200",
      iconBgColor: "bg-teal-100",
    };
  }

  // Direção (graus)
  if (
    unitLower.includes("°") ||
    unitLower.includes("graus") ||
    unitLower.includes("degrees") ||
    unitLower.includes("direção")
  ) {
    return {
      Icon: Activity,
      iconColor: "text-sky-500",
      badgeColor: "bg-sky-50 ring-sky-200",
      iconBgColor: "bg-sky-100",
    };
  }

  // Energia e Potência
  if (
    unitLower.includes("watt") ||
    unitLower.includes("w") ||
    unitLower.includes("energia") ||
    unitLower.includes("power")
  ) {
    return {
      Icon: Zap,
      iconColor: "text-orange-500",
      badgeColor: "bg-orange-50 ring-orange-200",
      iconBgColor: "bg-orange-100",
    };
  }

  // Visibilidade
  if (
    unitLower.includes("km") ||
    unitLower.includes("m") ||
    unitLower.includes("visibilidade") ||
    unitLower.includes("visibility")
  ) {
    return {
      Icon: Eye,
      iconColor: "text-indigo-500",
      badgeColor: "bg-indigo-50 ring-indigo-200",
      iconBgColor: "bg-indigo-100",
    };
  }

  // Padrão para unidades não reconhecidas
  return {
    Icon: Cloud,
    iconColor: "text-gray-400",
    badgeColor: "bg-gray-50 ring-gray-200",
    iconBgColor: "bg-gray-100",
  };
}

export function getBadgeColorFromUnit(
  unit: string
):
  | "stone"
  | "blue"
  | "sky"
  | "teal"
  | "green"
  | "yellow"
  | "orange"
  | "red"
  | "violet"
  | "purple"
  | "indigo" {
  const unitLower = unit.toLowerCase();

  if (
    unitLower.includes("°c") ||
    unitLower.includes("°f") ||
    unitLower.includes("kelvin")
  )
    return "blue";
  if (unitLower.includes("%") || unitLower.includes("umidade")) return "green";
  if (
    unitLower.includes("hpa") ||
    unitLower.includes("pa") ||
    unitLower.includes("bar")
  )
    return "violet";
  if (
    unitLower.includes("m/s") ||
    unitLower.includes("km/h") ||
    unitLower.includes("mph")
  )
    return "orange";
  if (
    unitLower.includes("w/m²") ||
    unitLower.includes("w/m2") ||
    unitLower.includes("lux")
  )
    return "yellow";
  if (
    unitLower.includes("mm") ||
    unitLower.includes("cm") ||
    unitLower.includes("precipitação")
  )
    return "teal";
  if (unitLower.includes("°") || unitLower.includes("graus")) return "sky";
  if (unitLower.includes("watt") || unitLower.includes("w")) return "orange";
  if (unitLower.includes("km") || unitLower.includes("visibilidade"))
    return "indigo";

  return "stone";
}
