export class PredictionRequest {
  id: number | undefined;
  name: string;
  description: string | null;
  status: Status;
  telephone: string;
  excelFile: string;

  constructor(name: string, description: string | null, status: Status, telephone: string, excelFile: string) {
    this.name = name;
    this.description = description;
    this.telephone = telephone;
    this.excelFile = excelFile;
    this.status = status
  }
}

export enum Status {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  DECLINED = "DECLINED",
  DONE = "DONE"
}
