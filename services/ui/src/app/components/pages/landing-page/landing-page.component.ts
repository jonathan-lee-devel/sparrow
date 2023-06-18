import {Component, OnInit} from '@angular/core';
import {SearchResultDto} from '../../../dtos/SearchResultDto';
import {CookiesNoticeService} from '../../../services/cookies-notice/cookies-notice.service';
import {ModalService} from '../../../services/modal/modal.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  queryParams: string = '';
  searchResults: SearchResultDto[] = [];
  isLoading: boolean = false;

  constructor(private cookiesNoticeService: CookiesNoticeService, private modalService: ModalService) {
  }


  ngOnInit() {
    this.cookiesNoticeService.triggerIfNotAccepted();
    this.modalService.showPopupModal('This is a test, you like?',
        'Confirm',
        'Cancel',
        () => window.alert('Confirmed'),
        () => window.alert('Canceled'),
    );
  }

  search(queryParams: string) {
    this.isLoading = true;
    setTimeout(() => {
      this.searchResults.push({
        title: queryParams,
      });
      this.isLoading = false;
    }, 1000);
  }
}
