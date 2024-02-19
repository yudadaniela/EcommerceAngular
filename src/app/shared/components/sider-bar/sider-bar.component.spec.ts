import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiderBarComponent } from './sider-bar.component';

describe('SiderBarComponent', () => {
  let component: SiderBarComponent;
  let fixture: ComponentFixture<SiderBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiderBarComponent]
    });
    fixture = TestBed.createComponent(SiderBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
