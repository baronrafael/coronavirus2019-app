import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapInfoLayerComponent } from './map-info-layer.component';

describe('MapInfoLayerComponent', () => {
  let component: MapInfoLayerComponent;
  let fixture: ComponentFixture<MapInfoLayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MapInfoLayerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapInfoLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
