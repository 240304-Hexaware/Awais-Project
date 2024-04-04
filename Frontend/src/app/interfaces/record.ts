export interface Record {
  id: string;
  name: string;
  records: [];
}

export interface Records {
  id: string;
  user: string;
  fields: any;
  date: Date;
  specificationName: string;
  specificationId: string;
  parseFileName: string;
  parseFileId: string;
}
