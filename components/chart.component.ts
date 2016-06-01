import {Component, ElementRef, Input, Output, EventEmitter} from '@angular/core';

declare var Chart: any;

@Component({
    selector: 'chart',
    template: `
    <canvas width="400" height="400"></canvas>
    `
})
export class ChartComponent {

    private chart: any;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    @Input() private options: ChartOptions;

    constructor (element: ElementRef) {
        this.canvas = element.nativeElement.children[0];
        this.ctx = this.canvas.getContext("2d");
        this.chart = new Chart(this.ctx, this.options);
    }

}

export const enum ChartType {
    'bar',
    'line',
    'radar',
    'polarArea',
    'doughnut'
}

export interface ChartOptions {
    type: ChartType;
    data: {
        labels: Array<string>;
        datasets: Array<{
            label: string;
            data: Array<number>;
            backgroundColor?: Array<string>;
            borderColor?: Array<string>;
            borderWidth?: number;
        }>;
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