import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatziGetallComponent } from './platzi-getall.component';

describe('PlatziGetallComponent', () => {
  let component: PlatziGetallComponent;
  let fixture: ComponentFixture<PlatziGetallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatziGetallComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlatziGetallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
