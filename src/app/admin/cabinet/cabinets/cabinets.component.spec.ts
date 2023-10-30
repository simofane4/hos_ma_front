import { ComponentFixture, TestBed , waitForAsync} from '@angular/core/testing';

import { CabinetsComponent } from './cabinets.component';

describe('CabinetsComponent', () => {
  let component: CabinetsComponent;
  let fixture: ComponentFixture<CabinetsComponent>;

  beforeEach( waitForAsync( () => {
     TestBed.configureTestingModule({
      declarations: [ CabinetsComponent ]
    })
    .compileComponents();
  })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CabinetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
