import { NgModule } from '@angular/core';
import { ChartComponent } from './components/chart';
export * from './components/chart';

@NgModule({
  declarations: [
    ChartComponent
  ],
  exports: [
    ChartComponent
  ]
})
export class ChartModule {}