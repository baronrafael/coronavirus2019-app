import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryPopupComponent } from './country-popup.component';

describe('CountryPopupComponent', () => {
  let component: CountryPopupComponent;
  let fixture: ComponentFixture<CountryPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CountryPopupComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
