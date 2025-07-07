import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberTrailComponent } from './number-trail.component';

describe('NumberTrailComponent', () => {
  let component: NumberTrailComponent;
  let fixture: ComponentFixture<NumberTrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberTrailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumberTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
