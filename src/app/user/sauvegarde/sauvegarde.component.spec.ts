import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SauvegardeComponent } from './sauvegarde.component';

describe('SauvegardeComponent', () => {
  let component: SauvegardeComponent;
  let fixture: ComponentFixture<SauvegardeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SauvegardeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SauvegardeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
