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
  @Input() data: Chart.Dataset[] = [];
  @Input() type: string;

  @Input() options: Chart.Options;

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
    console.log(this.chart);
  }

  ngOnDestroy(): void {
    if(this.chart) this.chart.destroy();
  }

  ngOnChanges(): void {

  }


}
export namespace Chart {
  export type Type = 'line' | 'bar' | 'radar' | 'polarArea' | 'doughnut' | 'pie';
  export interface Options {
    type: Type;
    data: {
      labels: string[];
      datasets: Dataset[];
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
      title?: TitleConfiguration;
      hover?: HoverConfiguration
    };
  }
  export interface TitleConfiguration {
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
  export interface LegendConfiguration {
    display?: boolean;
    position?: string;
    fullWidth?: boolean;
    onClick?: Function;
    labels?: LegendItemConfiguration
  }
  export interface LegendItemConfiguration {
    boxWidth?: number;
    fontSize?: number;
    fontStyle?: string;
    fontColor?: string;
    fontFamily?: string;
    padding?: number;
    generateLabels?: Function;
    usePointStyle?: boolean;
  }
  export interface LegendItem {
    // Label that will be displayed
    text?: string;
    // Fill style of the legend box
    fillStyle?: string;
    // If true; this item represents a hidden dataset. Label will be rendered with a strike-through effect
    hidden?: boolean;
    // For box border. See https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineCap
    lineCap?: string;
    // For box border. See https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash
    lineDash?: number[];
    // For box border. See https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset
    lineDashOffset?: number;
    // For box border. See https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin
    lineJoin?: string;
    // Width of box border
    lineWidth?: number;
    // Stroke style of the legend box
    strokeStyle?: string;
    // Point style of the legend box (only used if usePointStyle is true)
    pointStyle?: string;
  }
  export interface TooltipConfiguration {
    enabled?: boolean;
    custom?: Function;
    mode?: string;
    itemSort?: Function;
    backgroundColor?: string;
    titleFontFamily?: string;
    titleFontSize?: number;
    titleFontStyle?: string;
    titleFontColor?: string;
    titleSpacing?: number;
    titleMarginBottom?: number;
    bodyFontFamily?: string;
    bodyFontSize?: number;
    bodyFontStyle?: string;
    bodyFontColor?: string;
    bodySpacing?: string;
    footerFontFamily?: string;
    footerFontSize?: number;
    footerFontStyle?: string;
    footerFontColor?: string;
    footerSpacing?: number;
    footerMarginTop?: number;
    xPadding?: number;
    yPadding?: number;
    caretSize?: number;
    cornerRadius?: number;
    multiKeyBackground?: string;
    callbacks?: TooltipCallbacks;
  }
  export interface TooltipCallbacks {
    beforeTitle?: (tooltipItems: TooltipItem[], data: any) => string|string[];
    title?: (tooltipItems: TooltipItem[], data: any) => string|string[];
    afterTitle?: (tooltipItems: TooltipItem[], data: any) => string|string[];
    beforeBody?: (tooltipItems: TooltipItem[], data: any) => string|string[];
    beforeLabel?: (tooltipItem: TooltipItem, data: any) => string|string[];
    label?: (tooltipItem: TooltipItem, data: any) => string|string[];
    labelColor?: (tooltipItem: TooltipItem, chartInstance: any) => string|string[];
    afterLabel?: (tooltipItem: TooltipItem, data: any) => string|string[];
    afterBody?: (tooltipItems: TooltipItem[], data: any) => string|string[];
    beforeFooter?: (tooltipItems: TooltipItem[], data: any) => string|string[];
    footer?: (tooltipItems: TooltipItem[], data: any) => string|string[];
    afterFooter?: (tooltipItems: TooltipItem[], data: any) => string|string[];
  }
  export interface TooltipItem {
    // X Value of the tooltip as a string
    xLabel?: string,
    // Y value of the tooltip as a string
    yLabel?: string,
    // Index of the dataset the item comes from
    datasetIndex?: number,
    // Index of this data item in the dataset
    index?: number
  }
  export interface HoverConfiguration {
    mode?: string;
    animationDuration?: number;
    onHover?: Function;
  }
  export interface AnimationConfiguration {
    duration?: number;
    easing?: string;
    onProgress?: Function;
    onComplete?: Function;
  }
  export interface Animation {
    currentStep?: number;
    numSteps?: number;
    easing?: string;
    render?: Function;
    onAnimationProgress?: Function;
    onAnimationComplete?: Function;
  }
  export interface ElementConfiguration {
    /**
     * Default fill color for arcs. Inherited from the global default
     */
    backgroundColor?: string;
    /**
     * Default stroke color for arcs
     */
    borderColor?: string;
    /**
     * Default stroke width for arcs
     */
    borderWidth?: number;
  }
  export interface LineConfiguration {
    /**
     * Default bezier curve tension. Set to 0 for no bezier curves.
     */
    tension?: number;
    /**
     * Default line fill color
     */
    backgroundColor?: string;
    /**
     * Default line stroke width
     */
    borderWidth?: number;
    /**
     * Default line stroke color
     */
    borderColor?: string;
    /**
     * 	Default line cap style
     */
    borderCapStyle?: string;
    /**
     * Default line dash.
     */
    borderDash?: string[];
    /**
     * Default line dash offset
     */
    borderDashOffset?: number;
    /**
     * 	Default line join style
     */
    borderJoinStyle?: string;
    /**
     * If true, bezier control points are kept inside the chart. If false, no restriction is enforced.
     */
    capBezierPoints?: boolean;
    /**
     * If true, the line is filled.
     */
    fill?: boolean;
    /**
     * If true, the line is shown as a steeped line and 'tension' will be ignored
     */
    stepped?: boolean;
  }
  export interface PointConfiguration {
    /**
     *
     */
    radius?: number;
    /**
     *
     */
    pointStyle?: string;
    backgroundColor?: string;
    borderWidth?: number;
    borderColor?: string;
    hitRadius?: number;
    hoverRadius?: number;
    hoverBorderWidth?: number;
  }
  export interface RectangleConfiguration {
    backgroundColor?: string;
    borderWidth?: number;
    borderColor?: string;
    borderSkipped?: string;
  }
  export interface Dataset {
    label: string;
    data: number[];
    xAxisID?: string;
    yAxisID?: string;
    fill?:boolean;
    lineTension?: number;
    backgroundColor?: string[];
    borderColor?: string|string[];
    borderCapStyle?: string;
    borderDash?: number[];
    borderDashOffset?: number[];
    borderJoinStyle?: string;
    pointBorderColor?: string|string[];
    pointBackgroundColor?: string|string[];
    pointBorderWidth?: number|number[];
    pointRadius?: number|number[];
    borderWidth?: number|number[];
    borderSkipped?: string|string[];
    hoverBackgroundColor?: string|string[];
    hoverBorderColor?: string|string[];
    hoverBorderWidth?: number|number[];
  }
}
