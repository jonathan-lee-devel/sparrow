import {EventEmitter, Injectable, Output} from '@angular/core';
import {Modal, ModalInterface, ModalOptions} from 'flowbite';
import {Observable} from 'rxjs';
import {ModalAttributesDto} from '../../dtos/modals/ModalAttributesDto';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  @Output() modalAttributes: EventEmitter<ModalAttributesDto> = new EventEmitter<ModalAttributesDto>();

  private $cookiesNoticeModal: HTMLElement | undefined;
  private cookiesNoticeModal: ModalInterface | undefined;
  private readonly cookiesNoticeModalOptions: ModalOptions = {placement: 'top-center', backdrop: 'dynamic', closable: false};

  private $defaultModal: HTMLElement | undefined;
  private defaultModal: ModalInterface | undefined;
  private readonly defaultModalOptions: ModalOptions = {placement: 'top-center', backdrop: 'dynamic', closable: true};

  constructor() {
  }

  public showCookiesNoticeModal() {
    if (!this.cookiesNoticeModal) {
      this.initCookiesNoticeModal();
    }
    this.cookiesNoticeModal?.show();
  }

  public showDefaultModal(modalHeading: string, modalText: string) {
    if (!this.defaultModal) {
      this.initDefaultModal();
    }
    this.modalAttributes.next({
      heading: modalHeading,
      text: modalText,
    });
    this.defaultModal?.show();
  }

  getModalAttributes(): Observable<ModalAttributesDto> {
    return this.modalAttributes;
  }

  private initCookiesNoticeModal(): void {
    const cookiesNoticeModalElement = document.getElementById('cookiesNoticeModal');
    if (cookiesNoticeModalElement === null) {
      this.promptRefreshOnError();
      return;
    }
    this.$cookiesNoticeModal = cookiesNoticeModalElement;
    this.cookiesNoticeModal = new Modal(this.$cookiesNoticeModal, this.cookiesNoticeModalOptions);
  }

  private initDefaultModal(): void {
    const defaultModalElement = document.getElementById('defaultModal');
    if (defaultModalElement === null) {
      this.promptRefreshOnError();
      return;
    }
    this.$defaultModal = defaultModalElement;
    this.defaultModal = new Modal(this.$defaultModal, this.defaultModalOptions);
  }

  private promptRefreshOnError(): void {
    window.alert('An error has occurred, please try refreshing the page');
  }
}
