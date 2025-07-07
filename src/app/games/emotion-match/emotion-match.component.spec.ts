import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmotionMatchComponent } from './emotion-match.component';

describe('EmotionMatchComponent', () => {
  let component: EmotionMatchComponent;
  let fixture: ComponentFixture<EmotionMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmotionMatchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmotionMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
