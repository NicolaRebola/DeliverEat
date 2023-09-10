import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDePedidosComponent } from './tipo-de-pedidos.component';

describe('TipoDePedidosComponent', () => {
  let component: TipoDePedidosComponent;
  let fixture: ComponentFixture<TipoDePedidosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoDePedidosComponent]
    });
    fixture = TestBed.createComponent(TipoDePedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
