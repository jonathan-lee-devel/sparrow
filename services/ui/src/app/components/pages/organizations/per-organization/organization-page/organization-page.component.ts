import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OrganizationService} from '../../../../../services/organization/organization.service';
import {LoadingService} from '../../../../../services/loading/loading.service';
import {OrganizationSnippetDto} from '../../../../../dtos/organization/OrganizationSnippetDto';

@Component({
  selector: 'app-organization-page',
  templateUrl: './organization-page.component.html',
  styleUrls: ['./organization-page.component.css'],
})
export class OrganizationPageComponent implements OnInit {
  organization: OrganizationSnippetDto = {
    id: 'Loading...',
    name: 'Loading...',
  };
  isLoading = true;

  constructor(private activatedRoute: ActivatedRoute,
              private organizationService: OrganizationService,
              private loadingService: LoadingService) {
    this.loadingService.isLoadingObservable()
        .subscribe((isLoading) => {
          this.isLoading = isLoading;
        });
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.organizationService.getOrganizationSnippetById(params['organizationId'])
          .subscribe((organization) => {
            this.organization = organization;
            this.loadingService.onLoadingFinished();
          });
    });
  }
}