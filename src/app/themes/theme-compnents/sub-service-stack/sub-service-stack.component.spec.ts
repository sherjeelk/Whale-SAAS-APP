import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubServiceStackComponent } from './sub-service-stack.component';

describe('SubServiceStackComponent', () => {
  let component: SubServiceStackComponent;
  let fixture: ComponentFixture<SubServiceStackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubServiceStackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubServiceStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
