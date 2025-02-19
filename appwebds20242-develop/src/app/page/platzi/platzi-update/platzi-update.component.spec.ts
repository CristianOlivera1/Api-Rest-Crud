import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatziUpdateComponent } from './platzi-update.component';

describe('PlatziUpdateComponent', () => {
  let component: PlatziUpdateComponent;
  let fixture: ComponentFixture<PlatziUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatziUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlatziUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
