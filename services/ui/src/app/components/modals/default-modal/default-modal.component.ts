import {Component, OnInit} from '@angular/core';
import {initModals} from 'flowbite';
import {ModalService} from '../../../services/modal/modal.service';

@Component({
  selector: 'app-default-modal',
  templateUrl: './default-modal.component.html',
  styleUrls: ['./default-modal.component.css'],
})
export class DefaultModalComponent implements OnInit {
  modalHeading: string = 'Request Error';
  modalText: string = 'There was an error with the request';

  constructor(private modalService: ModalService) {
    this.modalService.getModalAttributes().subscribe((modalAttributes) => {
      this.modalHeading = modalAttributes.heading;
      this.modalText = modalAttributes.text;
    });
  }

  ngOnInit() {
    initModals();
  }
}
