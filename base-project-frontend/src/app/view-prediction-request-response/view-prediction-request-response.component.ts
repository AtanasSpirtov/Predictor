import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PredictionResponse} from "../model/PredictionResponse";
import {BarChartData, ChartDot, LineChartContext} from "../line-chart-wrapper/LineChartContext";
import {User} from "../model/User";
import {StoreService} from "../service/store.service";

@Component({
  selector: 'app-view-prediction-request-response',
  templateUrl: './view-prediction-request-response.component.html',
  styleUrls: ['./view-prediction-request-response.component.css']
})
export class ViewPredictionRequestResponseComponent implements OnInit {

  predictionResponseForRequest: PredictionResponse[]

  lineChartContext: LineChartContext = new LineChartContext();

  constructor(private route: ActivatedRoute, private router: Router, private store: StoreService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const encodedResponse = params['response'];
      this.predictionResponseForRequest = JSON.parse(decodeURIComponent(encodedResponse));
      console.log(this.predictionResponseForRequest)
    });
    this.lineChartContext = this.initializeDateValueChart(this.predictionResponseForRequest)
  }
  private initializeDateValueChart(totalPerDay: PredictionResponse[]): LineChartContext {

    if (totalPerDay) {
      const chartDataDots = totalPerDay.map(it => new ChartDot(it.date,it.value))

      const chartData = new BarChartData(
        chartDataDots,
        '#ff4081',
        ''
      )
      return new LineChartContext(chartData)
    }

    return new LineChartContext()
  }

  logout() {
    this.store.changeUser(new User());
    this.router.navigate([''])
  }

  getAverageValue() {
    return this.predictionResponseForRequest
      .map(predictionResponses => predictionResponses.value)
      .reduce((acc, supl) => acc += supl) / this.predictionResponseForRequest.length
  }

  goToListRequests() {
    this.router.navigate(['home'])
  }
}
