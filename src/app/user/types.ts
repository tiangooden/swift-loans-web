export interface User {
  id: number;
  identity: string;
  email?: string;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  dob?: string;
  phone_number?: string;
  trn?: string;
  street_address?: string;
  city?: string;
  country?: string;
  status?: string;
}