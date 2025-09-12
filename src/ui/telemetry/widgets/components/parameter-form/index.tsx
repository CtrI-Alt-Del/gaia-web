import { useParameterForm } from "./use-parameter-form";
import { ParameterFormView } from "./parameter-form-view";

export type ParameterFormProps = {
  onCancel: () => void;
};

export function ParameterForm({ onCancel }: ParameterFormProps) {
  const { form, selectedIcon, onSubmit, iconOptions } = useParameterForm();

  return (
    <ParameterFormView
      form={form}
      selectedIcon={selectedIcon}
      onSubmit={onSubmit}
      onCancel={onCancel}
      iconOptions={iconOptions}
    />
  );
}
