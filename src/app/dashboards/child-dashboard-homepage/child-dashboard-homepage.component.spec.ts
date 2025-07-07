import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildDashboardHomepageComponent } from './child-dashboard-homepage.component';

describe('ChildDashboardHomepageComponent', () => {
  let component: ChildDashboardHomepageComponent;
  let fixture: ComponentFixture<ChildDashboardHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildDashboardHomepageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildDashboardHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
