[![npm](https://img.shields.io/npm/l/express.svg)](https://www.npmjs.com/package/ng2-chartjs2)

[![NPM](https://nodei.co/npm/ng2-chartjs2.png?stars&downloads)](https://nodei.co/npm/ng2-chartjs2/)

# Charts 2.0 Directives for Angular 2

 Note: This is work in progress, watch this repo to stay up to date.
 
## Installation
```
npm i --save-dev ng2-chartjs2
```

## Usage
```typescript
import {ChartComponent, ChartOptions} from 'ng2-chartjs2';

@Component({
  template: `<chart [options]="options"></chart>`, // place this markup in your template
  directives: [ChartComponent] // add directive to component
})
export class MyComponent {

    // define options for our charts
    // these options are derived from the official documentation of the plugin
    options: ChartOptions = {
       type: 'bar',
       data: {
         labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
         datasets: [{
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
         }]
       },
       options: {
         scales: {
           yAxes: [{
             ticks: {
               beginAtZero:true
             }
           }]
         }
       }
    };
}
```
