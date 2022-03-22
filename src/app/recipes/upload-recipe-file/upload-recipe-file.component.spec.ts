import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadRecipeFileComponent } from './upload-recipe-file.component';

describe('UploadRecipeFileComponent', () => {
  let component: UploadRecipeFileComponent;
  let fixture: ComponentFixture<UploadRecipeFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadRecipeFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadRecipeFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
