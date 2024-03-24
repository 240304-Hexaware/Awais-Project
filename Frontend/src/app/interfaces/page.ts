export interface Page {
  content: number;
  pageNumber: number;
  pageSize: number;
}

export interface SortFields {
  field: string;
  direction: Direction;
}

export enum Direction {
  asc = 'ASC',
  desc = 'DESC',
}

