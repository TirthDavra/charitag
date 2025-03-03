import { IUserDetails } from "@/api/auth/types";

export interface User {
  error?: string | undefined;
  message?: string;
  token?: string;
  name?: string | null | undefined;
  role?: string;
  email?: string;
  userDetails?: IUserDetails;
}
