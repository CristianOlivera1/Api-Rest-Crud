import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertActividadComponent } from './insert-actividad.component';

describe('InsertActividadComponent', () => {
  let component: InsertActividadComponent;
  let fixture: ComponentFixture<InsertActividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertActividadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
