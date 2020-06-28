import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  ApexChart,
  ApexStroke,
  ApexTitleSubtitle,
  ApexXAxis,
  ChartComponent,
} from 'ng-apexcharts';
import { addDays, format, formatDistance, parse } from 'date-fns';

import { CountryHistory } from '@core/models';
import { NovelcovidService } from '@core/services';
import { LAYER_COLORS } from '@shared/config';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, skip, switchMap } from 'rxjs/operators';

interface ChartOptions {
  chart: ApexChart;
  title: ApexTitleSubtitle;
  stroke: ApexStroke;
  xaxis: ApexXAxis;
  series: { name: string; data: { x: number; y: number }[] }[];
  colors: string[];
}

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit {
  @ViewChild('chart', { static: false }) chart: ChartComponent;

  private activeData: Array<keyof CountryHistory['timeline']> = [
    'deaths',
    'cases',
    'recovered',
  ];
  private seriesColors: Record<keyof CountryHistory['timeline'], string> = {
    deaths: LAYER_COLORS.Deaths,
    recovered: LAYER_COLORS.Recoveries,
    cases: LAYER_COLORS.Infected,
  };

  daysAgo = new BehaviorSubject(30);
  countryHistoricalData: CountryHistory;
  chartOptions: ChartOptions = {
    chart: {
      type: 'area',
      stacked: true,
      width: '98%',
    },
    title: {
      text: 'Loading...',
    },
    stroke: {},
    xaxis: {
      type: 'datetime',
    },
    series: [],
    colors: Object.values(this.seriesColors),
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
    this.chartOptions.series = this.formatSeries();

    this.daysAgo
      .pipe(
        skip(1),
        debounceTime(250),
        switchMap((newDaysAgo) =>
          this.novelcovidService.getHistoryForCountry(
            this.countryHistoricalData.country,
            newDaysAgo,
          ),
        ),
      )
      .subscribe((newData) => {
        this.countryHistoricalData = newData;
        this.chartOptions.series = this.formatSeries();
        //this.chartOptions.colors = this.setColors();
        this.chart.updateOptions(this.chartOptions, true, true, true);
      });
  }

  get formatDaysAgoDistance() {
    const firstDate = addDays(new Date(), this.daysAgo.getValue() * -1);

    return `${formatDistance(firstDate, new Date(), {
      addSuffix: true,
    })} (from the ${format(firstDate, 'M/d/yy')}, to be precise).`;
  }

  private formatSeries() {
    return this.activeData.map((data) => ({
      name: data.replace(data[0], data[0].toUpperCase()), // So stupid that JS doesn't have a method to capitalize words...
      data: Object.entries(this.countryHistoricalData.timeline[data]).map(
        ([date, amount]) => ({
          x: parse(date, 'M/d/yy', new Date()).getTime(),
          y: amount,
        }),
      ),
    }));
  }

  private setColors() {
    return this.chartOptions.series.map(({ name }) => this.seriesColors[name]);
  }
}
