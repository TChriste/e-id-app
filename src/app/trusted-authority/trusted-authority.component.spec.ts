import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustedAuthorityComponent } from './trusted-authority.component';

describe('TrustedAuthorityComponent', () => {
  let component: TrustedAuthorityComponent;
  let fixture: ComponentFixture<TrustedAuthorityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrustedAuthorityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrustedAuthorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
