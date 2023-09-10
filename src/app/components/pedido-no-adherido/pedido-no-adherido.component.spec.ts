import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoNoAdheridoComponent } from './pedido-no-adherido.component';

describe('PedidoNoAdheridoComponent', () => {
  let component: PedidoNoAdheridoComponent;
  let fixture: ComponentFixture<PedidoNoAdheridoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidoNoAdheridoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidoNoAdheridoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
