export interface IGetClientSecretResponse {
  status: boolean;
  setup_intent_secret: string;
}

export interface ISavedAddressesResponse {
  status: boolean;
  data: ISavedAddress[];
}

export interface IAddAddressResponse {
  status: boolean;
  message: string;
  data: ISavedAddress;
}
export interface IAddressByIdResponse
  extends Omit<IAddAddressResponse, "message"> {}

export interface ISavedAddress {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  title: string;
  address: string;
  city: string;
  state_id: string;
  country_id: string;
  state?: string;
  country?: string;
  postal_code: string;
  user_id?: number;
}

export interface IBillingAddress {
  first_name: string;
  last_name: string;
  phone_number: string;
  title: string;
  address: string;
  city: string;
  state_id: number;
  postal_code: string;
  country_id: number;
}
