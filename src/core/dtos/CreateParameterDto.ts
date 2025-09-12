export type CreateParameterDto = {
  name: string;
  description?: string | null;
  unit: string;
  factor: number;
  offset: number;
  active: boolean;
  iconType?: string;
};
