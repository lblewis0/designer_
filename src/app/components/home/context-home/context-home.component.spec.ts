import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextHomeComponent } from './context-home.component';

describe('ContextHomeComponent', () => {
  let component: ContextHomeComponent;
  let fixture: ComponentFixture<ContextHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContextHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContextHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
