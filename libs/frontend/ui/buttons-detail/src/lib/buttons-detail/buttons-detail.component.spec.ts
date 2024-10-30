import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonsDetailComponent } from './buttons-detail.component';

describe('ButtonsDetailComponent', () => {
  let component: ButtonsDetailComponent;
  let fixture: ComponentFixture<ButtonsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonsDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
