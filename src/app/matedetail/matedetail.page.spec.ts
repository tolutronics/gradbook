import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MatedetailPage } from './matedetail.page';

describe('MatedetailPage', () => {
  let component: MatedetailPage;
  let fixture: ComponentFixture<MatedetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatedetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MatedetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
