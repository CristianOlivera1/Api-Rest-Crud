import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllProductsFkComponent } from './get-all-products-fk.component';

describe('GetAllProductsFkComponent', () => {
  let component: GetAllProductsFkComponent;
  let fixture: ComponentFixture<GetAllProductsFkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllProductsFkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllProductsFkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
