export interface User {
  id?: string;
  identity: string;
  alias?: string | null;
  first_name?: string | null;
  middle_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  dob?: Date | null;
  phone_number?: string | null;
  trn?: string | null;
  street_address?: string | null;
  city?: string | null;
  country?: string | null;
  status?: string | null;
  is_deleted?: boolean | null;
  deleted_at?: Date | null;
  created_at?: Date | null;
  updated_at?: Date | null;
}