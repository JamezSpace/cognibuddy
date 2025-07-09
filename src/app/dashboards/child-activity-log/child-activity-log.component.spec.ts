import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildActivityLogComponent } from './child-activity-log.component';

describe('ChildActivityLogComponent', () => {
  let component: ChildActivityLogComponent;
  let fixture: ComponentFixture<ChildActivityLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildActivityLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildActivityLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
