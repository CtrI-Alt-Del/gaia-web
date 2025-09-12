import { Button } from "@/ui/shadcn/components/button";
import { Input } from "@/ui/shadcn/components/input";
import { Label } from "@/ui/shadcn/components/label";
import { Checkbox } from "@/ui/shadcn/components/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/shadcn/components/select";
import type { ParameterFormData, iconOptions } from "./use-parameter-form";

export type ParameterFormViewProps = {
  form: any;
  selectedIcon: any;
  onSubmit: (data: ParameterFormData) => void;
  onCancel: () => void;
  iconOptions: typeof iconOptions;
};

export function ParameterFormView({
  form,
  selectedIcon,
  onSubmit,
  onCancel,
  iconOptions,
}: ParameterFormViewProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3">
          <span
            className={`inline-flex size-12 items-center justify-center rounded-xl ring-1 ${selectedIcon.iconInfo.badgeColor}`}
          >
            <selectedIcon.iconInfo.Icon className={`size-6 ${selectedIcon.iconInfo.iconColor}`} />
          </span>
          <div className="text-center">
            <div className="text-sm font-medium text-gray-700">Preview do Ícone</div>
            <div className="text-xs text-gray-500">{selectedIcon.label}</div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Nome *</Label>
        <Input
          id="name"
          {...register("name")}
          placeholder="Ex: Temperatura do Ar"
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Input
          id="description"
          {...register("description")}
          placeholder="Ex: Medição da temperatura ambiente"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="unit">Unidade *</Label>
        <Input
          id="unit"
          {...register("unit")}
          placeholder="Ex: °C, %, hPa, m/s"
          className={errors.unit ? "border-red-500" : ""}
        />
        {errors.unit && (
          <p className="text-sm text-red-500">{errors.unit.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="iconType">Ícone *</Label>
        <Select
          value={watch("iconType")}
          onValueChange={(value) => setValue("iconType", value)}
        >
          <SelectTrigger className={errors.iconType ? "border-red-500" : ""}>
            <SelectValue placeholder="Selecione um ícone" />
          </SelectTrigger>
          <SelectContent>
            {iconOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex size-6 items-center justify-center rounded-lg ring-1 ${option.iconInfo.badgeColor}`}
                  >
                    <option.iconInfo.Icon className={`size-4 ${option.iconInfo.iconColor}`} />
                  </span>
                  <span>{option.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.iconType && (
          <p className="text-sm text-red-500">{errors.iconType.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="factor">Fator *</Label>
          <Input
            id="factor"
            type="number"
            step="0.001"
            {...register("factor", { valueAsNumber: true })}
            className={errors.factor ? "border-red-500" : ""}
          />
          {errors.factor && (
            <p className="text-sm text-red-500">{errors.factor.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="offset">Offset *</Label>
          <Input
            id="offset"
            type="number"
            step="0.001"
            {...register("offset", { valueAsNumber: true })}
            className={errors.offset ? "border-red-500" : ""}
          />
          {errors.offset && (
            <p className="text-sm text-red-500">{errors.offset.message}</p>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="active"
          {...register("active")}
          checked={watch("active")}
        />
        <Label htmlFor="active" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Parâmetro ativo
        </Label>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="cursor-pointer"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          className="min-w-[100px] cursor-pointer"
        >
          Salvar
        </Button>
      </div>
    </form>
  );
}
