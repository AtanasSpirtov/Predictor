import {AfterViewInit, Component, Input, OnChanges, ViewChild} from '@angular/core';
import {BaseChartDirective} from "ng2-charts";
import {LineChartContext} from "./LineChartContext";

@Component({
  selector: 'ui-line-chart-wrapper',
  templateUrl: './line-chart-wrapper.component.html',
  styleUrls: ['./line-chart-wrapper.component.scss']
})
export class LineChartWrapperComponent implements AfterViewInit, OnChanges {

  @Input() chartData: LineChartContext

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  shadowInterval: any

  ngAfterViewInit() {
    this.shadowInterval = setInterval(() => {
      if (this.chart && this.chartData && this.chartData.chartDataSets) {
        this.updateChartBackground(this.chart, this.chartData)
        clearInterval(this.shadowInterval)
      }
    }, 50)
  }

  ngOnChanges() {
    if (this.chart && this.chartData && this.chartData.chartDataSets) {
      this.updateChartBackground(this.chart, this.chartData)
    }
  }

  updateChartBackground(chart: BaseChartDirective, chartContext: LineChartContext) {
    const ctx = chart.chart!.ctx;

    const metaStart = chart.chart!.getDatasetMeta(0)
    const metaEnd = chartContext.predictedDatasetAvailable ? chart.chart!.getDatasetMeta(1) : chart.chart!.getDatasetMeta(0)
    const pointStart = (metaStart.data[0] as any).getCenterPoint()
    const pointEnd = (metaEnd.data[metaEnd.data.length - 1] as any).getCenterPoint()

    // Calculate differences
    const dx = pointEnd.x - pointStart.x;
    const dy = pointEnd.y - pointStart.y;

    // Perpendicular vector (rotate 90 degrees)
    const perpVector = {x: -dy, y: dx};

    // Decide on the length of the gradient effect
    const length = Math.sqrt(perpVector.x ** 2 + perpVector.y ** 2);
    const gradientFactor = chart.chart!.ctx!.canvas.height / 2

    // Create gradient
    const gradientGrey = ctx!.createLinearGradient(
      pointStart.x - (perpVector.x / length) * gradientFactor,
      pointStart.y - (perpVector.y / length) * gradientFactor,
      pointStart.x + (perpVector.x / length) * gradientFactor,
      pointStart.y + (perpVector.y / length) * gradientFactor
    );

    const gradientBlue = ctx!.createLinearGradient(
      pointStart.x - (perpVector.x / length) * gradientFactor,
      pointStart.y - (perpVector.y / length) * gradientFactor,
      pointStart.x + (perpVector.x / length) * gradientFactor,
      pointStart.y + (perpVector.y / length) * gradientFactor
    );

    gradientGrey.addColorStop(1, '#B8BFC900');
    gradientGrey.addColorStop(0, '#ff408140');

    gradientBlue.addColorStop(0, '#ff4081');
    gradientBlue.addColorStop(1, '#ff408140');

    chartContext.chartDataSets[0].backgroundColor = gradientBlue
    if (chartContext.predictedDatasetAvailable) {
      chartContext.chartDataSets[1].backgroundColor = gradientGrey
    }
    chart.chart!.update();
  }

}
