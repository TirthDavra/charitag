export interface IPolicy {
  name: string;
  description: string;
  policies_type: string | undefined;
  status: 2 | 1;
}

export const initialPolicy: IPolicy = {
  name: "",
  description: "",
  policies_type: undefined,
  status: 1,
};
