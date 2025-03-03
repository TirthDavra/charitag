export interface IPaymentsMethodsResponse {
  status: boolean;
  data: IPaymentsMethods[];
}

export interface IPaymentsMethods {
  id: number;
  stripe_card_id: string;
  user_id: number;
  stripe_customer_id: string;
  card_holder_name: string;
  brand: string;
  exp_month: number;
  exp_year: number;
  last4: string;
  cvc_check: string;
  country: string;
  card_type: string;
  is_default: number;
  deleted_at: null;
  created_at: string;
  updated_at: string;
}
