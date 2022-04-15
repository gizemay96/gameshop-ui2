import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SketlonComponent } from './sketlon.component';

describe('SketlonComponent', () => {
  let component: SketlonComponent;
  let fixture: ComponentFixture<SketlonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SketlonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SketlonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
