import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YourprofileComponent } from './yourprofile.component';

describe('YourprofileComponent', () => {
  let component: YourprofileComponent;
  let fixture: ComponentFixture<YourprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YourprofileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(YourprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
