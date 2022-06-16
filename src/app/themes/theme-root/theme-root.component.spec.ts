import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeRootComponent } from './theme-root.component';

describe('ThemeRootComponent', () => {
  let component: ThemeRootComponent;
  let fixture: ComponentFixture<ThemeRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemeRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
