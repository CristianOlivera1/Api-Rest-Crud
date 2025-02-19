import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductsFkComponent } from './create-products-fk.component';

describe('CreateProductsFkComponent', () => {
  let component: CreateProductsFkComponent;
  let fixture: ComponentFixture<CreateProductsFkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateProductsFkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProductsFkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
