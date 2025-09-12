import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  getParameterIconFromUnit,
  type ParameterIconInfo,
} from "./parameter-icon-utils";

const parameterSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .min(2, "Nome deve ter pelo menos 2 caracteres"),
  description: z.string().optional(),
  unit: z.string().min(1, "Unidade é obrigatória"),
  factor: z
    .number()
    .min(0.001, "Fator deve ser maior que 0")
    .max(1000, "Fator deve ser menor que 1000"),
  offset: z
    .number()
    .min(-1000, "Offset deve ser maior que -1000")
    .max(1000, "Offset deve ser menor que 1000"),
  active: z.boolean(),
  iconType: z.string().min(1, "Ícone é obrigatório"),
});

export type ParameterFormData = z.infer<typeof parameterSchema>;

export const iconOptions: Array<{
  value: string;
  label: string;
  iconInfo: ParameterIconInfo;
}> = [
  {
    value: "thermometer",
    label: "Temperatura",
    iconInfo: getParameterIconFromUnit("°C"),
  },
  {
    value: "droplets",
    label: "Umidade/Precipitação",
    iconInfo: getParameterIconFromUnit("%"),
  },
  {
    value: "gauge",
    label: "Pressão",
    iconInfo: getParameterIconFromUnit("hPa"),
  },
  { value: "wind", label: "Vento", iconInfo: getParameterIconFromUnit("m/s") },
  {
    value: "sun",
    label: "Radiação Solar",
    iconInfo: getParameterIconFromUnit("W/m²"),
  },
  {
    value: "activity",
    label: "Direção",
    iconInfo: getParameterIconFromUnit("°"),
  },
  { value: "zap", label: "Energia", iconInfo: getParameterIconFromUnit("W") },
  {
    value: "eye",
    label: "Visibilidade",
    iconInfo: getParameterIconFromUnit("km"),
  },
  { value: "cloud", label: "Geral", iconInfo: getParameterIconFromUnit("") },
];

export function useParameterForm() {
  const form = useForm<ParameterFormData>({
    resolver: zodResolver(parameterSchema),
    defaultValues: {
      name: "",
      description: "",
      unit: "",
      factor: 1,
      offset: 0,
      active: true,
      iconType: "cloud",
    },
  });

  const watchedIconType = form.watch("iconType");
  const selectedIcon =
    iconOptions.find((option) => option.value === watchedIconType) ||
    iconOptions[0];

  const onSubmit = (data: ParameterFormData) => {
    console.log("Dados do formulário:", data);
  };

  return {
    form,
    selectedIcon,
    onSubmit,
    iconOptions,
  };
}
