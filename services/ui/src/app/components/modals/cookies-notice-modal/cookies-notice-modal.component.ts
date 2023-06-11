import {Component, OnInit} from '@angular/core';
import {initModals} from 'flowbite';
import {CookiesNoticeService} from '../../../services/cookies-notice/cookies-notice.service';

@Component({
  selector: 'app-cookies-notice-modal',
  templateUrl: './cookies-notice-modal.component.html',
  styleUrls: ['./cookies-notice-modal.component.css'],
})
export class CookiesNoticeModalComponent implements OnInit {
  constructor(private cookiesNoticeService: CookiesNoticeService) {
  }


  ngOnInit() {
    initModals();
  }

  doAccept() {
    this.cookiesNoticeService.doAccept();
  }
}
