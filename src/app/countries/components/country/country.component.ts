import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  ApexChart,
  ApexStroke,
  ApexTitleSubtitle,
  ApexXAxis,
} from 'ng-apexcharts';
import { parse } from 'date-fns';

import { CountryHistory } from '@core/models';
import { NovelcovidService } from '@core/services';

interface ChartOptions {
  chart: ApexChart;
  title: ApexTitleSubtitle;
  stroke: ApexStroke;
  xaxis: ApexXAxis;
  series: { name: string; data: { x: number; y: number }[] }[];
}

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit {
  countryHistoricalData: CountryHistory;
  private activeData: Array<keyof CountryHistory['timeline']> = [
    'deaths',
    'cases',
    'recovered',
  ];

  chartOptions: ChartOptions = {
    chart: {
      type: 'area',
      stacked: true,
      width: '98%',
    },
    title: {},
    stroke: {},
    xaxis: {
      type: 'datetime',
    },
    series: [],
  };

  constructor(
    private novelcovidService: NovelcovidService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.countryHistoricalData = this.route.snapshot.data[0] as CountryHistory;
    this.chartOptions.title = {
      text: this.countryHistoricalData.country,
    };
    this.chartOptions.stroke = {
      curve: 'smooth',
    };

    this.formatSeries();
  }

  private formatSeries() {
    this.chartOptions.series = this.activeData.map((data) => ({
      name: data.replace(data[0], data[0].toUpperCase()), // So stupid that JS doesn't have a method to capitalize words...
      data: Object.entries(this.countryHistoricalData.timeline[data]).map(
        ([date, amount]) => ({
          x: parse(date, 'M/d/yy', new Date()).getTime(),
          y: amount,
        }),
      ),
    }));
  }
}
