import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundedSquareComponent } from './rounded-square.component';

describe('RoundedSquareComponent', () => {
  let component: RoundedSquareComponent;
  let fixture: ComponentFixture<RoundedSquareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoundedSquareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoundedSquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
