import {Component, OnInit} from '@angular/core';
import {CookiesNoticeService} from '../../../services/cookies-notice/cookies-notice.service';
import {LoadingService} from '../../../services/loading/loading.service';
import {OrganizationService} from '../../../services/organization/organization.service';
import {OrganizationSnippetDto} from '../../../dtos/organization/OrganizationSnippetDto';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  queryParams = '';
  searchResults: OrganizationSnippetDto[] = [];
  isLoadingMap = new Map<string, boolean>();
  readonly landingPageSearchResultsLoadingKey = 'landing-page-search-results-loading';
  isEmptySearchResults = false;
  readonly allCategories: string = 'All Categories';
  readonly restaurants: string = 'Restaurants';
  currentSearchCategory = this.allCategories;

  constructor(private cookiesNoticeService: CookiesNoticeService,
              private loadingService: LoadingService,
              private organizationService: OrganizationService) {
    this.loadingService.isLoadingMapObservable()
        .subscribe((isLoadingMap) => {
          this.isLoadingMap = isLoadingMap;
        });
  }


  ngOnInit() {
    this.cookiesNoticeService.triggerIfNotAccepted();
  }

  search(queryParams: string) {
    this.loadingService.onLoadingStart(this.landingPageSearchResultsLoadingKey);
    this.isEmptySearchResults = false;
    this.organizationService.searchOrganizations(queryParams, this.landingPageSearchResultsLoadingKey)
        .subscribe((organizationSearchResults) => {
          setTimeout(() => {
            this.searchResults = organizationSearchResults;
            if (this.searchResults.length === 0) {
              this.isEmptySearchResults = true;
            }
            this.loadingService.onLoadingFinished(this.landingPageSearchResultsLoadingKey);
          }, 1000);
        });
  }

  setSearchCategory(searchCategory: string) {
    this.currentSearchCategory = searchCategory;
  }
}
