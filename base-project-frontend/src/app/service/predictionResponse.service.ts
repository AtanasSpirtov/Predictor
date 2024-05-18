import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Message} from "../model/Message";
import {PredictionRequest} from "../model/PredictionRequest";
import {environment} from "../../environments/environment";
import {PredictionResponse} from "../model/PredictionResponse";

@Injectable({
  providedIn: 'root'
})
export class PredictionResponseService {

  constructor(private http: HttpClient) {}

  viewResponse(id: number): Observable<PredictionResponse[]> {
    return this.http.get<PredictionResponse[]>(`${environment.apiUrl}/responses/view/${id}`)
  }
}
