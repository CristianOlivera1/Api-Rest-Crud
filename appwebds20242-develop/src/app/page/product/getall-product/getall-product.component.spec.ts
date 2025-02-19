import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetallProductComponent } from './getall-product.component';

describe('GetallProductComponent', () => {
  let component: GetallProductComponent;
  let fixture: ComponentFixture<GetallProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetallProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetallProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
