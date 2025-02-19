import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetallActividadComponent } from './getall-actividad.component';

describe('GetallActividadComponent', () => {
  let component: GetallActividadComponent;
  let fixture: ComponentFixture<GetallActividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetallActividadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetallActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
