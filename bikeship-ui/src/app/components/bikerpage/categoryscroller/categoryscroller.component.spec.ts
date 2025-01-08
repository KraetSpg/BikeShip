import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryscrollerComponent } from './categoryscroller.component';

describe('CategoryscrollerComponent', () => {
  let component: CategoryscrollerComponent;
  let fixture: ComponentFixture<CategoryscrollerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryscrollerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryscrollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
