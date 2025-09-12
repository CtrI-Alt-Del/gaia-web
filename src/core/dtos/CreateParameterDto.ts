export type CreateParameterDto = {
  name: string;
  unit: string;
  factor: number;
  offset: number;
  active: boolean;
  iconType?: string;
};
