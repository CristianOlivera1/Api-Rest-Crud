import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateActividadComponent } from './update-actividad.component';

describe('UpdateActividadComponent', () => {
  let component: UpdateActividadComponent;
  let fixture: ComponentFixture<UpdateActividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateActividadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
