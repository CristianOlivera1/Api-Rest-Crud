import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatziInsertComponent } from './platzi-insert.component';

describe('PlatziInsertComponent', () => {
  let component: PlatziInsertComponent;
  let fixture: ComponentFixture<PlatziInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatziInsertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlatziInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
