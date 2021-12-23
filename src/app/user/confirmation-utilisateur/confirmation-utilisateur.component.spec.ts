import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationUtilisateurComponent } from './confirmation-utilisateur.component';

describe('ConfirmationUtilisateurComponent', () => {
  let component: ConfirmationUtilisateurComponent;
  let fixture: ComponentFixture<ConfirmationUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationUtilisateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
