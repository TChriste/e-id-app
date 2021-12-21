import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustedAuthorityConnexionsComponent } from './trusted-authority-connexions.component';

describe('TrustedAuthorityComponent', () => {
  let component: TrustedAuthorityConnexionsComponent;
  let fixture: ComponentFixture<TrustedAuthorityConnexionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrustedAuthorityConnexionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrustedAuthorityConnexionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
