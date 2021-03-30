
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LinechartComponent } from './Components/linechart/linechart.component';
import { ShortEnergychartComponent } from './Components/shortenergychart/shortenergychart.component';
import { InfoComponent } from './Components/info/info.component';
import { EnergychartComponent } from './Components/energychart/energychart.component';

@NgModule({
  declarations: [
    AppComponent,
    LinechartComponent,
    EnergychartComponent,
    ShortEnergychartComponent,
    InfoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
