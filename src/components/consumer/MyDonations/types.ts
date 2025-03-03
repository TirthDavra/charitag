export interface IDonationsCharityResponse {
  status: boolean;
  data: IDonationsCharity[];
}

export interface IDonationsCharity {
  charity_name: string;
  id: number;
}
