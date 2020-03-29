import { Component, Input, OnInit } from '@angular/core';
import { CountryInfo } from '@core/models';

@Component({
  selector: 'app-country-card',
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.scss'],
})
export class CountryCardComponent implements OnInit {
  @Input() country: Readonly<CountryInfo>;

  constructor() {}

  ngOnInit(): void {}
}
