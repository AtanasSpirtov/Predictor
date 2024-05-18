import {PredictionRequest} from "./PredictionRequest";

export class PredictionResponse {
  id: number;
  date: Date; // Change to Date type
  predictionRequest: PredictionRequest; // Assuming PredictionRequest is another class representing the related entity
  value: number;

  constructor(
    id: number,
    date: Date,
    predictionRequest: PredictionRequest,
    value: number
  ) {
    this.id = id;
    this.date = date;
    this.predictionRequest = predictionRequest;
    this.value = value;
  }
}
