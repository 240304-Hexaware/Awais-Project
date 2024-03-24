export interface User {
  id: number | null;
  name: string;
  email: string;
  password: string;
  roles: string;
  blocked: boolean;
}

export interface UserPage {
  id: number;
  name: string;
  email: string;
  roles: string;
  blocked: boolean;
}

export interface SortFields {
  field: string;
  direction: Direction;
}

export enum Direction {
  asc = 'ASC',
  desc = 'DESC',
}
