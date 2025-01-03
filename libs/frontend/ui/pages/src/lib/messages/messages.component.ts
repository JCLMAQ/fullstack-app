import { NgClass } from "@angular/common";
import { Component, inject } from "@angular/core";

import { MatButtonModule } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MessagesService } from "./messages.service";

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss'],
    imports: [
    NgClass,
      MatButtonModule,
      MatIcon
]
})
export class MessagesComponent {

  messagesService = inject(MessagesService);

  message = this.messagesService.message;

  onClose() {
    this.messagesService.clear();
  }
}
