import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelDataComponent } from './panel-data.component';

describe('PanelDataComponent', () => {
  let component: PanelDataComponent;
  let fixture: ComponentFixture<PanelDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PanelDataComponent]
    });
    fixture = TestBed.createComponent(PanelDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
