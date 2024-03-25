export interface Specification {
  id: string;
  fileName: string;
  json: string;
  parseFiles: ParseFile[];
  user: string;
}

export interface ParseFile {
  parseFileName: string;
  parseFileId: string;
}
