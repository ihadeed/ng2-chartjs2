import { Component, OnInit } from '@angular/core';
import { ChartComponent, Chart } from './index';
@Component({
  selector: 'my-app',
  template: '<chart [labels]="labels" [data]="data" type="bar" (click)="onClick($event)" (resize)="onResize($event)" (hover)="onHover($event)"></chart>'
})
export class AppComponent implements OnInit {
  labels: string[] = ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"];
  data: Chart.Dataset[] = [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }
  ];

  ngOnInit(): void {
    setTimeout(() => {
      console.log('Updating data');
      this.data[0].data = [26, 15, 2, 36, 18, 7];
    }, 3000);
  }

  onClick(e) {
    console.log('Clicked', e);
  }

  onResize(e) {
    console.log('Resized', e);
  }

  onHover(e) {
    console.log('Hover', e);
  }
}


import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [
    AppComponent,
    ChartComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);