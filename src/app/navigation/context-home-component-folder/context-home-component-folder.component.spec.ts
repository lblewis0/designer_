import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextHomeComponentFolderComponent } from './context-home-component-folder.component';

describe('ContextHomeComponentFolderComponent', () => {
  let component: ContextHomeComponentFolderComponent;
  let fixture: ComponentFixture<ContextHomeComponentFolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContextHomeComponentFolderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContextHomeComponentFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
