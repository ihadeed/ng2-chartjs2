[![npm](https://img.shields.io/npm/l/express.svg)](https://www.npmjs.com/package/ng2-chartjs2)

[![NPM](https://nodei.co/npm/ng2-chartjs2.png?stars&downloads)](https://nodei.co/npm/ng2-chartjs2/)

# Chart.js 2.0 Component for Angular 2
This is an Angular 2 component to display charts. This component uses Chart.js 2.0. It works well with responsive sites, so it should work properly with all Angular2 apps, as well as Ionic 2 apps.

Note: This is work in progress, watch this repo to stay up to date.
 
## Installation
You must manually include Chart.js library into your build or index.html

```
npm i --save-dev ng2-chartjs2
```

## Example Usage
You can either pass `options` attribute with your own custom options (see [Chart.js Docs](http://www.chartjs.org/docs/)) or pass individual options like `labels`, `data`, and `type`.

```typescript
import {ChartComponent, Chart} from 'ng2-chartjs2';

@Component({
  selector: 'my-app',
  template: '<chart [labels]="labels" [data]="data" type="bar"></chart>',
  directives: [ChartComponent]
})
export class AppComponent {
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
}
```

## Reference
This repo will only document things related to the Angular 2 Component. To understand how Chart.js works you need to visit [their docs](http://www.chartjs.org/docs/)

| Chart.js Doc Section  | Represented by interface |
|---|---|
| Data|---|
| [Options](http://www.chartjs.org/docs/#chart-configuration-creating-a-chart-with-options) / Common Chart Configuration (http://www.chartjs.org/docs/#chart-configuration-common-chart-configuration) |Chart.Options |
| [Title Configuration](http://www.chartjs.org/docs/#chart-configuration-title-configuration) |Chart.TitleConfiguration|
| [Legend Configuration](http://www.chartjs.org/docs/#chart-configuration-legend-configuration) |Chart.LegendConfiguration|
| [Legend Item Interface](http://www.chartjs.org/docs/#chart-configuration-legend-configuration) |Chart.LegendItem|
| [Tooltip Configuration](http://www.chartjs.org/docs/#chart-configuration-tooltip-configuration) |Chart.TooltipConfiguration|
| Tooltip Callbacks | Chart.TooltipCallbacks |
| Tooltip Item Interface | Chart.TooltipItem |
| [Hover Configuration](http://www.chartjs.org/docs/#chart-configuration-hover-configuration) | Chart.HoverConfiguration |
| [Animation Configuration](http://www.chartjs.org/docs/#chart-configuration-animation-configuration) | Chart.AnimationConfiguration |
| Animation Interface | Chart.Animation |
| Element Configuration | |
| [Data Point](http://www.chartjs.org/docs/#line-chart-data-points) (for any type) | Chart.Dataset |
| | |
| | |


## TODO
- [x] Get the charts working
- [ ] Define interfaces and enums
  - [x] Main options (missing a few)
  - [x] Chart types
  - [x] Title Configuration
  - [x] Legend Configuration
  - [x] Legend Label Configuration
  - [x] Tooltip Configuration
  - [x] Hover Configuration
  - [x] Animation Configuration
  - [x] Element Configuration
  - [x] Line Configuration
  - [x] Rectangle Configuration
  - [x] Animation
- [ ] Provide more options and control via component inputs
  - [x] Labels
  - [x] Data
  - [x] Type
- [ ] Route chart events through component outputs