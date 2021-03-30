import { Chart } from 'node_modules/chart.js';
import { Component, OnInit } from '@angular/core';
import { tempData } from '../../models/data';
import { ApiService } from '../../api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css'],
})
export class LinechartComponent implements OnInit {
  tempData: tempData[] = [];
  amountOfDataPoints: number = 0;
  maxAmountOfDataPoints = 150;
  totalAmountOfDataPoints: number = 0;

  constructor(private api: ApiService) {}

  pipe = new DatePipe('en-US');

  ngOnInit(): void {
    this.showData();
  }

  showData() {
    this.api.getAllTempData().subscribe((data: tempData[]) => {
      this.tempData = data;
      this.totalAmountOfDataPoints = data.length;
      if (this.tempData.length > this.maxAmountOfDataPoints) {
        this.tempData = this.tempData.filter((data, index) => {
          if (index % Math.floor(this.tempData.length / this.maxAmountOfDataPoints) == 0) {
            return data;
          }
        });
      }
      this.amountOfDataPoints = this.tempData.length;
      var myChart = new Chart('myEnergyChart', {
        type: 'line',
        data: {
          labels: this.tempData.map((data) => {
            var date = data.date as Date;
            return this.pipe.transform(date, 'short');
          }),
          datasets: [
            {
              label: 'Temperature (°C)',
              data: this.tempData.map((data) => data.temp),
              backgroundColor: [
                'rgba(255, 255, 255, 0.2)'
              ],
              borderColor: [
                'rgba(0, 0, 132, 1)'
              ],
              borderWidth: 1,
            },
            {
              label: 'Humidity (%)',
              data: this.tempData.map((data) => data.hum),
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
