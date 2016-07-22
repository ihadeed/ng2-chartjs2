import {Component, ElementRef, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges} from '@angular/core';

declare var Chart: any;

@Component({
  selector: 'chart',
  template: `
    <canvas></canvas>
    `,
  styles: [':host {display: block;}']
})
export class ChartComponent implements OnInit, OnDestroy, OnChanges {

  private chart: any;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;


  @Input() private options: ChartOptions;

  constructor (private element: ElementRef) {}

  ngOnInit(): void {
    console.log(this.element);
    this.canvas = this.element.nativeElement.children[0];
    this.ctx = this.canvas.getContext("2d");
    this.chart = new Chart(this.ctx, this.options);
    console.log(this.chart);
    window['c'] = this.chart;
  }

  ngOnDestroy(): void {

  }

  ngOnChanges(): void {

  }

}
export type ChartType = 'line' | 'bar' | 'radar' | 'polarArea' | 'doughnut' | 'pie';

export interface ChartOptions {
  type: ChartType;
  data: {
    labels: string[];
    datasets: ChartDataset[];
  };
  options?: {
    scales?: {
      yAxes?: Array<{ticks?: {beginAtZero: boolean}}>
    },
    responsive?: boolean,
    hover?: {
      mode?: string;
    }
  };
}

export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor?: string[];
  borderColor?: string[];
  borderWidth?: number;
}
