import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInformationDetailsComponent } from './user-information-details.component';

describe('UserInformationDetailsComponent', () => {
  let component: UserInformationDetailsComponent;
  let fixture: ComponentFixture<UserInformationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInformationDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInformationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
