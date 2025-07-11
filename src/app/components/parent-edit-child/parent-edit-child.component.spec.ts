import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentEditChildComponent } from './parent-edit-child.component';

describe('ParentEditChildComponent', () => {
  let component: ParentEditChildComponent;
  let fixture: ComponentFixture<ParentEditChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParentEditChildComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentEditChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
