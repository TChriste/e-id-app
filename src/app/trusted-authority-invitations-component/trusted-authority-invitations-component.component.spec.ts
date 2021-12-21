import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustedAuthorityInvitationsComponentComponent } from './trusted-authority-invitations-component.component';

describe('TrustedAuthorityInvitationsComponentComponent', () => {
  let component: TrustedAuthorityInvitationsComponentComponent;
  let fixture: ComponentFixture<TrustedAuthorityInvitationsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrustedAuthorityInvitationsComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrustedAuthorityInvitationsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
