import {ChartDataset, ChartOptions} from "chart.js";

export class LineChartContext {
  chartLabels: (Date | string | number)[];
  chartDataSets: ChartDataset[];
  options: ChartOptions;
  predictedDatasetAvailable: boolean = false

  constructor(currentData?: BarChartData, predictedData?: BarChartData, additionalDatasets?: BarChartData[], valuePipe?: any, isMonthlyChart?: boolean, dateFormat?: string) {
    this.options = {
      responsive: true,
      animation: false,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: {
            color: '#EEEEEE',
            display: false
          },
          ticks: {
            autoSkip: true,
            maxTicksLimit: 5,
            color: '#bbbbbb'
          }
        },
        y: {
          ticks: {
            autoSkip: true,
            maxTicksLimit: 10,
            stepSize: 1,
            color: '#bbbbbb',
            callback: function(value): string {
              return  valuePipe ? valuePipe.transform(Number(value)) : Number(value)
            }
          },
          beginAtZero: true,
          grid: {
            color: '#EEEEEE',
          }
        }
      },
      interaction: {
        mode: 'nearest', // Change this to 'nearest' or 'point'
        intersect: false
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          mode: 'index', // Change this to 'nearest' or 'point'
          intersect: false,
          callbacks: {
            label(tooltipItem: any): string | string[] {
              if (valuePipe && tooltipItem.raw != null) {
                return tooltipItem.dataset.label + ': ' + valuePipe.transform(tooltipItem.raw)
              } else if(tooltipItem.raw != null) {
                return tooltipItem.formattedValue
              }

              return '';
            }
          }
        }
      }
    };

    if(!currentData){
      this.chartDataSets = []
    }
    else {
      this.initChart(currentData, predictedData, additionalDatasets, isMonthlyChart)
    }
  }

  initChart(currentSpend: BarChartData, predictedSpend?: BarChartData, additionalDatasets?: BarChartData[], isMonthlyChart?: boolean) {
    this.chartLabels = currentSpend.data.map(it => it.label);
    let currentData = currentSpend.data.map(it => it.value)

    let dataset: any =
      {
        label: currentSpend.label,
        data: currentData,
        borderColor: currentSpend.color,
        pointBackgroundColor: '#FFFFFF',
        pointBorderColor: '#ff4081',
        backgroundColor: '#ff408105',
        fill: true,
        pointRadius: 0,
        tension: 0.1,
        borderWidth: 3.5
      }

    let predictedDataSet
    if (predictedSpend) {
      this.predictedDatasetAvailable = true;
      const predictedData = predictedSpend.data.map(it => it.value)
      this.chartLabels = this.chartLabels.concat(predictedSpend.data.map(it => it.label))
      predictedDataSet = {
        label: predictedSpend.label,
        data: new Array(currentSpend.data.length - 1).fill(NaN).concat(currentSpend.data[currentSpend.data.length - 1].value).concat(predictedData),
        borderColor: predictedSpend.color,
        pointBackgroundColor: '#FFFFFF',
        pointBorderColor: '#ff4081',
        backgroundColor: '#ff408105',
        fill: true,
        pointRadius: 0,
        tension: 0.1,
        borderWidth: 3.5
      }
    }

    let additional: ChartDataset[] = []

    additional.push(dataset)
    if(predictedDataSet){
      additional.push(predictedDataSet)
    }
    this.chartDataSets = additional
  }
}
export class ChartDot {
  label: Date | string | number
  value: number

  constructor(label: Date | string | number, value: number) {
    this.label = label
    this.value = value
  }
}
export class BarChartData {
  data: ChartDot[]
  color: string
  label: string
  type: 'BAR' | 'LINE' | 'DASHED-LINE'
  stack?: string

  constructor(data: ChartDot[], color: string, label: string, type: 'BAR' | 'LINE' | 'DASHED-LINE' = 'BAR', stack?: string) {
    this.data = data
    this.color = color
    this.label = label
    this.type = type
    this.stack = stack
  }
}
