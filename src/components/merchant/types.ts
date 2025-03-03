export interface FeatureImage {
  id: number;
  filename?: string;
  path: string;
  thumbnail_path: string;
  medium_path: string;
  reference_id?: number | null;
  type?: number;
  action_by?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface MultiSelectValuetypes {
  value: string;
  label: string;
}
