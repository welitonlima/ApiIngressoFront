import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-confirmacao',
  templateUrl: './modal-confirmacao.component.html'
})
export class ModalConfirmacaoComponent implements OnInit {

  @Input() msg = ""
  @Input() name = "modalConfirmar"
  @Output() sendResultado = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  Confirmar(x:boolean){
    this.sendResultado.emit(x)
  }

}
