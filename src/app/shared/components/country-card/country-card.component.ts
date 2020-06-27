import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CountryInfo } from '@core/models';

@Component({
  selector: 'app-country-card',
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.scss'],
})
export class CountryCardComponent implements OnInit {
  @Input() country: Readonly<CountryInfo>;
  @Input() noBoxShadow = false;
  @Output() countrySelected = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}
}
