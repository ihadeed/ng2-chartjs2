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
  /**
   * Will store the chart object
   * This is accessible to provide more control over charts for advanced usage
   */
  chart: any;
  /**
   * The canvas element
   */
  private canvas: HTMLCanvasElement;
  /**
   * The context
   */
  private ctx: CanvasRenderingContext2D;
  /**
   * Labels to display on chart
   */
  @Input() labels: string [] = [];
  @Input() data: ChartDataset[] = [];
  @Input() type: string;

  @Input() options: ChartOptions;

  constructor (private element: ElementRef) {}

  ngOnInit(): void {
    this.canvas = this.element.nativeElement.children[0];
    this.ctx = this.canvas.getContext("2d");

    // if the options param is provided, we will not use the other inputs
    // this allows maximum customization and control
    if(!this.options){
      this.options = {
        type: 'bar',
        data: {
          labels: this.labels,
          datasets: this.data
        }
      }
    }
    this.chart = new Chart(this.ctx, this.options);
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
