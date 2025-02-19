import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeGetComponent } from './poke-get.component';

describe('PokeGetComponent', () => {
  let component: PokeGetComponent;
  let fixture: ComponentFixture<PokeGetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokeGetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokeGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
