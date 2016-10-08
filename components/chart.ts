import {
  Component, ElementRef, Input, OnInit, OnDestroy, Output, EventEmitter, DoCheck
} from '@angular/core';
declare var Chart: any;

@Component({
  selector: 'chart',
  template: `<canvas></canvas>`,
  styles: [':host {display: block;}']
})
export class ChartComponent implements OnInit, OnDestroy, DoCheck {
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
  @Input() type: Chart.Type = 'bar';
  @Input() options: Chart.Options;

  private _labels: string[] = [];
  private _data: Chart.Dataset[] = [];
  private _options: Chart.Options;

  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() onResize: EventEmitter<any> = new EventEmitter<any>();
  @Output() onHover: EventEmitter<any> = new EventEmitter<any>();

  constructor (private element: ElementRef) {}

  ngOnInit(): void {
    // verify that the library exists
    if (typeof Chart === 'undefined') {
      console.error('You must include Chart.js 2.0 Library in your index.html in order for ng2-chartjs2 to work.');
      return;
    }

    this.canvas = this.element.nativeElement.children[0];
    this.ctx = this.canvas.getContext("2d");

    // if the options param is provided, we will not use the other inputs
    // this allows maximum customization and control
    if (!this.options) {
      this.options = {
        type: this.type,
        data: {
          labels: this.labels,
          datasets: this.data
        }
      }
    }
    // create new chart
    this.chart = new Chart(this.ctx, this.options);
    // bind the event emitters to the options
    if (!this.options.options) this.options.options = {};
    if (!this.options.options.hover) this.options.options.hover = {};
    if (!this.options.options.onClick) this.options.options.onClick = this.onClick.emit.bind(this.onClick);
    if (!this.options.options.onResize) this.options.options.onResize = this.onResize.emit.bind(this.onResize);
    if (!this.options.options.hover.onHover) this.options.options.hover.onHover = this.onHover.emit.bind(this.onHover);
  }

  ngOnDestroy(): void {
    // destroy the chart object
    this.destroy();
  }
  
  ngDoCheck(): void {
    if(
      this.data !== this._data
      || this._labels !== this.labels
      || this._options !== this.options
    ) {
      this._data = this.data;
      this._labels = this.labels;
      this._options = this.options;
      this.update();
    }
  }

  /**
   * Use this to destroy any chart instances that are created. This will clean up any references stored to the chart object within Chart.js, along with any associated event listeners attached by Chart.js. This must be called before the canvas is reused for a new chart.
   */
  destroy(): void {
    if(typeof this.chart !== 'undefined' && typeof this.chart.destroy === 'function') this.chart.destroy();
  }

  /**
   * Triggers an update of the chart. This can be safely called after replacing the entire data object. This will update all scales, legends, and then re-render the chart.
   * @param duration {number} the time for the animation of the redraw in miliseconds
   * @param lazy {boolean} if true, the animation can be interupted by other animations
   */
  update(duration?: number, lazy?: boolean): void {
    if(this.chart) this.chart.update(duration, lazy);
  }

  /**
   * Triggers a redraw of all chart elements. Note, this does not update elements for new data. Use .update() in that case.
   * @param duration {number} the time for the animation of the redraw in miliseconds
   * @param lazy {boolean} if true, the animation can be interupted by other animations
   */
  render(duration?: number, lazy?: boolean): void {
    if(this.chart) this.chart.render(duration, lazy);
  }

  /**
   * Use this to stop any current animation loop. This will pause the chart during any current animation frame. Call .render() to re-animate.
   */
  stop(): void {
    if(this.chart) this.chart.stop();
  }

  /**
   * Use this to manually onResize the canvas element. This is run each time the canvas container is resized, but you can call this method manually if you change the size of the canvas nodes container element.
   */
  resize(): void {
    if(this.chart) this.chart.onResize();
  }

  /**
   * Will clear the chart canvas. Used extensively internally between animation frames, but you might find it useful.
   */
  clear(): void {
    if(this.chart) this.chart.clear();
  }

  /**
   * This returns a base 64 encoded string of the chart in it's current state.
   * @returns {string} base64 encoded string of the chart
   */
  toBase64Image(): string {
    if(this.chart) return this.chart.toBase64Image();
  }

  /**
   * Returns an HTML string of a legend for that chart. The legend is generated from the legendCallback in the options.
   * @returns {string}
   */
  generateLegend(): string {
    if(this.chart) return this.chart.generateLegend();
  }

  /**
   * Calling getElementAtEvent(event) on your Chart instance passing an argument of an event, or jQuery event, will return the single element at the event position. If there are multiple items within range, only the first is returned
   * @param event
   * @returns {HTMLElement}
   */
  getElementAtEvent(event): HTMLElement {
    if(this.chart) return this.chart.getElementAtEvent(event);
  }

  /**
   * Looks for the element under the event point, then returns all elements at the same data index. This is used internally for 'label' mode highlighting.
   * @param event
   * @returns {HTMLElement[]}
   */
  getElementsAtEvent(event): HTMLElement[] {
    if(this.chart) return this.chart.getElementsAtEvent(event);
  }

  /**
   * Looks for the element under the event point, then returns all elements from that dataset. This is used internally for 'dataset' mode highlighting
   * @param event
   * @returns {Chart.Dataset}
   */
  getDatasetAtEvent(event): Chart.Dataset {
    if(this.chart) return this.chart.getDatasetAtEvent(event);
  }

  /**
   * Looks for the dataset that matches the current index and returns that metadata. This returned data has all of the metadata that is used to construct the chart.
   * The data property of the metadata will contain information about each point, rectangle, etc. depending on the chart type.
   * @param index
   * @returns {any}
   */
  getDatasetMeta(index): any {
    if(this.chart) return this.chart.getDatasetMeta(index);
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
      tooltips?: {
        custom?: Function;
      };
      legend?: LegendConfiguration;
      scales?: {
        yAxes?: Array<{ticks?: {beginAtZero: boolean}}>
      };
      /**
       * Resizes when the canvas container does.
       * Defaults to true
       */
      responsive?: boolean;
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
       * Called if the event is of type 'mouseup' or 'click'. Called in the context of the chart and passed an array of active elements.
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
      hover?: HoverConfiguration;
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
    xLabel?: string;
    // Y value of the tooltip as a string
    yLabel?: string;
    // Index of the dataset the item comes from
    datasetIndex?: number;
    // Index of this data item in the dataset
    index?: number;
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
    /**
     * The label for the dataset which appears in the legend and tooltips
     */
    label: string;
    /**
     * The data to plot in a line
     */
    data: number[];
    /**
     * The ID of the x axis to plot this dataset on
     */
    xAxisID?: string;
    /**
     * The ID of the y axis to plot this dataset on
     */
    yAxisID?: string;
    /**
     * If true, fill the area under the line
     */
    fill?:boolean;
    /**
     * Bezier curve tension of the line. Set to 0 to draw straightlines. Note This was renamed from 'tension' but the old name still works.
     */
    lineTension?: number;
    /**
     * The fill color under the line. See Colors
     */
    backgroundColor?: string[];
    /**
     * The width of the line in pixels
     */
    borderWidth?: number;
    /**
     * The color of the line.
     */
    borderColor?: string|string[];
    /**
     * Cap style of the line.
     */
    borderCapStyle?: string;
    /**
     * 	Length and spacing of dashes.
     */
    borderDash?: number[];
    /**
     * 	Offset for line dashes.
     */
    borderDashOffset?: number[];
    /**
     * Line joint style.
     */
    borderJoinStyle?: string;
    /**
     * The border color for points.
     */
    pointBorderColor?: string|string[];
    /**
     * The fill color for points
     */
    pointBackgroundColor?: string|string[];
    /**
     * The width of the point border in pixels
     */
    pointBorderWidth?: number|number[];
    /**
     * The radius of the point shape. If set to 0, nothing is rendered.
     */
    pointRadius?: number|number[];
    /**
     * The radius of the point when hovered
     */
    pointHoverRadius?: number|number[];
    /**
     * The pixel size of the non-displayed point that reacts to mouse events
     */
    pointHitRadius?: number|number[];
    /**
     * Point background color when hovered
     */
    pointHoverBackgroundColor?: string|string[];
    /**
     * Point border color when hovered
     */
    pointHoverBorderColor?: string|string[];
    /**
     * Border width of point when hovered
     */
    pointHoverBorderWidth?: number|number[];
    /**
     * The style of point. Options are 'circle', 'triangle', 'rect', 'rectRot', 'cross', 'crossRot', 'star', 'line', and 'dash'. If the option is an image, that image is drawn on the canvas using drawImage.
     */
    pointStyle?: string|string[];
    /**
     * If false, the line is not drawn for this dataset
     */
    showLine?: boolean;
    /**
     * If true, lines will be drawn between points with no or null data
     */
    spanGaps?: boolean;
    /**
     * If true, the line is shown as a steeped line and 'lineTension' will be ignored
     */
    steppedLine?: boolean;
    borderSkipped?: string|string[];
    hoverBackgroundColor?: string|string[];
    hoverBorderColor?: string|string[];
    hoverBorderWidth?: number|number[];
  }
}
