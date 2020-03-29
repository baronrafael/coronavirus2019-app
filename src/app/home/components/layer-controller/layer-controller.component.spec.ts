import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerControllerComponent } from './layer-controller.component';

describe('LayerControllerComponent', () => {
  let component: LayerControllerComponent;
  let fixture: ComponentFixture<LayerControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LayerControllerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
