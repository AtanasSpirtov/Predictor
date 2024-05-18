import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'line-chart-skeleton-loader',
  templateUrl: './line-chart-skeleton-loader.component.html',
  styleUrls: ['./line-chart-skeleton-loader.component.scss']
})
export class LineChartSkeletonLoaderComponent implements OnInit {

  @Input() showData: boolean;
  @Input() lgWide: boolean;
  @Input() lgHeight?: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
