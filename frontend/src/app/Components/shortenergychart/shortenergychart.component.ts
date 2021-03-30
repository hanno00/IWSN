import { energyData } from '../../models/data';
import { Chart } from 'node_modules/chart.js';
import { Component, OnInit } from '@angular/core';
import { tempData } from '../../models/data';
import { ApiService } from '../../api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-shortenergychart',
  templateUrl: './shortenergychart.component.html',
  styleUrls: ['./shortenergychart.component.css']
})
export class ShortEnergychartComponent implements OnInit {
  energyData: energyData[] = [];
  numberDelivered: number[] = [];
  numberReceived: number[] = [];
  amountOfDataPoints: number = 0;
  maxAmountOfDataPoints = 60;
  totalAmountOfDataPoints: number = 0;
  constructor(private api: ApiService) {}

  pipe = new DatePipe('en-US');

  ngOnInit(): void {
    this.showData();
  }

  showData() {
    this.api.getRecentEnergyData().subscribe((data: energyData[]) => {
      this.totalAmountOfDataPoints = data.length;
      this.energyData = data;
      if (this.energyData.length > this.maxAmountOfDataPoints) {
        this.energyData = this.energyData.filter((data, index) => {
          if (index % Math.floor(this.energyData.length / this.maxAmountOfDataPoints) == 0) {
            return data;
          }
        });
      }
      this.energyData.reverse();

      this.energyData.map(data => {
        this.numberDelivered.push(parseFloat(data.Actual_electricity_power_delivered_plus.slice(0,6)));
        this.numberReceived.push(parseFloat(data.Actual_electricity_power_received_min.slice(0,6)));
      })

      this.numberDelivered = this.numberDelivered.reverse();
      this.numberDelivered = this.numberDelivered.reverse();

      this.amountOfDataPoints = this.energyData.length;
      var myChart = new Chart('myShortEnergyChart', {
        type: 'line',
        data: {
          labels: this.energyData.map((data) => {
            var date = data.date as Date;
            return this.pipe.transform(date, 'short');
          }),
          datasets: [
            {
              label: 'Electricity delivered from net (kW)',
              data: this.numberDelivered,
              backgroundColor: [
                'rgba(255, 255, 255, 0.2)'
              ],
              borderColor: [
                'rgba(0, 0, 132, 1)'
              ],
              borderWidth: 1,
            },
            {
              label: 'Electricity send to net (kW)',
              data: this.numberReceived,
              backgroundColor: [
                'rgba(255, 255, 255, 0.2)'
              ],
              borderColor: [
                'rgba(130, 0, 0, 1)'
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });
    });
  }
}

