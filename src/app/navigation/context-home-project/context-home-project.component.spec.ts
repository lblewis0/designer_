import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextHomeProjectComponent } from './context-home-project.component';

describe('ContextHomeProjectComponent', () => {
  let component: ContextHomeProjectComponent;
  let fixture: ComponentFixture<ContextHomeProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContextHomeProjectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContextHomeProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
