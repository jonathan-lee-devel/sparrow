import {Component, OnInit} from '@angular/core';
import {SearchResultDto} from '../../../dtos/SearchResultDto';
import {CookiesNoticeService} from '../../../services/cookies-notice/cookies-notice.service';
import {LoadingService} from '../../../services/loading/loading.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  queryParams: string = '';
  searchResults: SearchResultDto[] = [];
  isLoading: boolean = false;

  constructor(private cookiesNoticeService: CookiesNoticeService, private loadingService: LoadingService) {
    this.loadingService.isLoadingObservable()
        .subscribe((isLoading) => {
          this.isLoading = isLoading;
        });
  }


  ngOnInit() {
    this.cookiesNoticeService.triggerIfNotAccepted();
  }

  search(queryParams: string) {
    this.loadingService.onLoadingStart();
    setTimeout(() => {
      this.searchResults.push({
        title: queryParams,
      });
      this.loadingService.onLoadingFinished();
    }, 1000);
  }
}
