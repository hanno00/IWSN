import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortEnergychartComponent } from './shortenergychart.component';

describe('EnergychartComponent', () => {
  let component: ShortEnergychartComponent;
  let fixture: ComponentFixture<ShortEnergychartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShortEnergychartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortEnergychartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
