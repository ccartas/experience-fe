import { Component, OnInit, ViewChild, ElementRef, Renderer2, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @ViewChild('firstView') firstView: ElementRef;
  @ViewChild('secondView') secondView: ElementRef;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private renderer: Renderer2) { }

  ngOnInit(): void {
  }
  switchToFirstView(event) {
    this.renderer.setStyle(this.firstView.nativeElement, 'right', '0');
    this.renderer.setStyle(this.secondView.nativeElement, 'right', '-100%');
  }
  switchToSecondView(event) {
    this.renderer.setStyle(this.firstView.nativeElement, 'right', '-100%');
    this.renderer.setStyle(this.secondView.nativeElement, 'right', '0');
  }
  hideModal(){
    this.closeModal.emit(false);
  }
  handleUserLoggedIn(event) {
    console.log(event);
  }
}
