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
    /**
     * Resizes when the canvas container does.
     * Defaults to true
     */
    responsive?: boolean,
    /**
     * Duration in milliseconds it takes to animate to new size after a resize event.
     * Defaults to 0
     */
    responsiveAnimationDuration?: number;
    /**
     * Maintain the original canvas aspect ratio (width / height) when resizing
     * Defaults to true
     */
    maintainAspectRation?: boolean;
    /**
     * Events that the chart should listen to for tooltips and hovering
     * Defaults to ["mousemove", "mouseout", "click", "touchstart", "touchmove", "touchend"]
     */
    events?: string[];
    /**
     * Called if the event is of type 'mouseup' or 'click'. Called in the context of the chart and passed an array of active elements
     */
    onClick?: Function;
    /**
     * Function to generate a legend. Receives the chart object to generate a legend from. Default implementation returns an HTML string.
     */
    legendCallback?: Function;
    /**
     * Called when a resize occurs. Gets passed two arguments: the chart instance and the new size.
     */
    onResize?: Function;
    title?: ChartTitleConfiguration;
    hover?: {
      mode?: string;
    }
  };
}

export interface ChartTitleConfiguration {
  /**
   * Display the title block
   * Defaults to false
   */
  display?: boolean;
  /**
   * Position of the title. Only 'top' or 'bottom' are currently allowed
   * Defaults to 'top'
   */
  position?: string;
  /**
   * Marks that this box should take the full width of the canvas (pushing down other boxes)
   * Defaults to true
   */
  fullWidth?: boolean;
  /**
   * Font size inherited from global configuration
   * Defaults to 12
   */
  fontSize?: number;
  /**
   * Font family inherited from global configuration
   * Defaults to 	"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
   */
  fontFamily?: string;
  /**
   * Font color inherited from global configuration
   * Defaults to #666
   */
  fontColor?: string;
  /**
   * Font styling of the title.
   * Defaults to 'bold'
   */
  fontStyle?: string;
  /**
   * Number of pixels to add above and below the title text
   * Defaults to 10
   */
  padding?: number;
  /**
   * Title text
   * Defaults to ''
   */
  text?: string;
}

export interface ChartLegendConfiguration {
  display?: boolean;
  position?: string;
  fullWidth?: boolean;
  onClick?: Function;
  labels?: ChartLegendItemConfiguration
}

export interface ChartLegendItemConfiguration {
  boxWidth?: number;
  fontSize?: number;
  fontStyle?: string;
  fontColor?: string;
  fontFamily?: string;
  padding?: number;
  generateLabels?: Function;
  usePointStyle?: boolean;
}

export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor?: string[];
  borderColor?: string[];
  borderWidth?: number;
}
