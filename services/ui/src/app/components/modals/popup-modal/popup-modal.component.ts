import {Component, OnInit} from '@angular/core';
import {ModalService} from '../../../services/modal/modal.service';
import {initModals} from 'flowbite';

@Component({
  selector: 'app-popup-modal',
  templateUrl: './popup-modal.component.html',
  styleUrls: ['./popup-modal.component.css'],
})
export class PopupModalComponent implements OnInit {
  modalPrompt: string = 'Prompt';
  modalConfirmButtonText: string = 'Confirm';
  modalCancelButtonText: string = 'Cancel';

  constructor(private modalService: ModalService) {
    this.modalService.getPopupModalAttributes().subscribe((popupModalAttributes) => {
      this.modalPrompt = popupModalAttributes.modalPrompt;
      this.modalConfirmButtonText = popupModalAttributes.modalConfirmButtonText;
      this.modalCancelButtonText = popupModalAttributes.modalCancelButtonText;
    });
    this.modalService.getPopupModalConfirmCallback().subscribe((confirmCallback) => {
      this.currentConfirmCallback = confirmCallback;
    });
    this.modalService.getPopupModalCancelCallback().subscribe((cancelCallback) => {
      this.currentCancelCallback = cancelCallback;
    });
  }

  currentConfirmCallback: Function = () => {
    return;
  };

  currentCancelCallback: Function = () => {
    return;
  };

  ngOnInit() {
    initModals();
  }

  closePrompt() {
    this.modalService.hidePopupModal();
  }

  onConfirm() {
    this.modalService.hidePopupModal();
    this.currentConfirmCallback();
  }

  onCancel() {
    this.modalService.hidePopupModal();
    this.currentCancelCallback();
  }
}
