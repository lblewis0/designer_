import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextHomeComponentFileComponent } from './context-home-component-file.component';

describe('ContextHomeComponentFileComponent', () => {
  let component: ContextHomeComponentFileComponent;
  let fixture: ComponentFixture<ContextHomeComponentFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContextHomeComponentFileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContextHomeComponentFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
