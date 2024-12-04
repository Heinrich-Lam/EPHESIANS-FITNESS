import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popup-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup-message.component.html',
  styleUrl: './popup-message.component.scss'
})
export class PopupMessageComponent {
//#region "Global Variables."
@Input() message: string = '';
isVisible: boolean = false;
//#endregion

//Display the Message.
show(msg: string) {
  this.message = msg;
  this.isVisible = true;
}

//Close the message.
close() {
  this.isVisible = false;
}
}
