import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderToolsComponent } from './builder-tools.component';

describe('BuilderToolsComponent', () => {
  let component: BuilderToolsComponent;
  let fixture: ComponentFixture<BuilderToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuilderToolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuilderToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
