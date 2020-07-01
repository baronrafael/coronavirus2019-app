import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, skip, switchMap } from 'rxjs/operators';

import { addDays, format, formatDistance, parse } from 'date-fns';
import { Chart, ChartConfiguration as ChartOptions, ChartData } from 'chart.js';

import { CountryHistory } from '@core/models';
import { NovelcovidService } from '@core/services';
import { LAYER_COLORS } from '@shared/config';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit, AfterViewInit {
  @ViewChild('chart', { static: false }) chartContainer: ElementRef<
    HTMLCanvasElement
  >;

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
  private chart: Chart;

  daysAgo = new BehaviorSubject(30);
  countryHistoricalData: CountryHistory;
  chartOptions: ChartOptions & { label: string } = {
    type: 'line',
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        xAxes: [
          {
            type: 'time',
            time: {
              unit: 'day',
            },
          },
        ],
      },
    },
    label: '',
  };

  constructor(
    private novelcovidService: NovelcovidService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.countryHistoricalData = this.route.snapshot.data[0] as CountryHistory;
    this.chartOptions.label = this.countryHistoricalData.country;
    this.chartOptions.data = this.formatSeries();

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
        this.chartOptions.data = this.formatSeries();
        this.chart.update();
      });
  }

  ngAfterViewInit(): void {
    this.chart = new Chart(
      this.chartContainer.nativeElement.getContext('2d'),
      this.chartOptions,
    );
  }

  get formatDaysAgoDistance() {
    const firstDate = addDays(new Date(), this.daysAgo.getValue() * -1);

    return `${formatDistance(firstDate, new Date(), {
      addSuffix: true,
    })} (from the ${format(firstDate, 'M/d/yy')}, to be precise).`;
  }

  isOptionChecked(optionName: string) {
    return this.chartOptions.data.datasets
      .map(({ label }) => (label as string).toLowerCase())
      .includes(optionName);
  }

  toggleOption(name: string) {
    if (this.activeData.includes(name as keyof CountryHistory['timeline'])) {
      this.activeData = this.activeData.filter((data) => data !== name);
      this.chartOptions.data.datasets = [
        ...this.chartOptions.data.datasets.filter(
          ({ label }) => (label as string).toLowerCase() !== name,
        ),
      ];
    } else {
      this.activeData = [
        ...this.activeData,
        name as keyof CountryHistory['timeline'],
      ];
      this.chartOptions.data = this.formatSeries();
    }
    this.chart.update();
  }

  private formatSeries(): ChartData {
    return {
      datasets: this.activeData.map((data) => ({
        label: data.replace(data[0], data[0].toUpperCase()), // So stupid that JS doesn't have a method to capitalize words...
        backgroundColor: this.seriesColors[data],
        data: Object.entries(this.countryHistoricalData.timeline[data]).map(
          ([date, amount]) => ({
            x: parse(date, 'M/d/yy', new Date()),
            y: amount,
          }),
        ),
      })),
    };
  }
}
