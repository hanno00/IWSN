import { tempData, energyData } from './../../models/data';
import { ApiService } from './../../api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  ready: boolean = false;
  latestTemp?: tempData;
  latestEnergy?: energyData;
  lastHourEnergy?: energyData[];
  hourlyPowerUsed: number = 0;
  hourlySent: number = 0;
  hourlyNettoCosts: number = 0;


  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getLatestData();
  }

  getLatestData() {
    this.api.getLatestEnergyData().subscribe(data =>  {
      this.latestEnergy = data[0];
      this.api.getLatestTempData().subscribe(data =>  {
        this.latestTemp = data[0];
        this.ready = true;
        this.api.getRecentEnergyData().subscribe((data: energyData[]) => {
          this.lastHourEnergy = data;
          this.calculatePrice();
        });
      });
    });
  }

  calculatePrice(){
    this.lastHourEnergy.map(data => {
      this.hourlyPowerUsed += parseFloat(data.Actual_electricity_power_delivered_plus.slice(0,6));
      this.hourlySent += parseFloat(data.Actual_electricity_power_received_min.slice(0,6));
    });
    this.hourlyPowerUsed = this.hourlyPowerUsed / this.lastHourEnergy.length;
    this.hourlySent = this.hourlySent / this.lastHourEnergy.length;
    let priceIn = 0.22;
    let priceOut = 0.07;

    this.hourlyNettoCosts = -this.hourlyPowerUsed * 0.22 + this.hourlySent * 0.07;


  }
}
