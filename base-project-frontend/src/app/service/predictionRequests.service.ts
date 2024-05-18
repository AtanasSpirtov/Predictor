import { Injectable } from '@angular/core';
import { Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Message} from "../model/Message";
import {PredictionRequest, Status} from "../model/PredictionRequest";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PredictionRequestService {

  constructor(private http: HttpClient) {}


  savePredictionRequests(predictionRequest: PredictionRequest): Observable<Message> {
    return this.http.put<Message>(`${environment.apiUrl}/requests/save`, predictionRequest)
  }

  getAllPredictionRequests(): Observable<PredictionRequest[]> {
    return this.http.get<PredictionRequest[]>(`${environment.apiUrl}/requests/list`);
  }

  deleteRequest(id: number): Observable<String> {
    return this.http.delete<String>(`${environment.apiUrl}/requests/delete/${id}`);
  }

  editRequest(element: PredictionRequest) {
    return this.http.post<String>(`${environment.apiUrl}/requests/edit`, element);
  }

  editStatus(id: number, status: Status): Observable<any> {
    return this.http.post<String>(`${environment.apiUrl}/requests/edit/status/${id}`, status);
  }
}
