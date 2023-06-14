import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OrganizationService} from '../../../../../services/organization/organization.service';
import {OrganizationDto} from '../../../../../dtos/organization/OrganizationDto';

@Component({
  selector: 'app-organization-dashboard',
  templateUrl: './organization-dashboard.component.html',
  styleUrls: ['./organization-dashboard.component.css'],
})
export class OrganizationDashboardComponent implements OnInit {
  organization: OrganizationDto = {
    id: 'Loading...',
    name: 'Loading...',
    administratorEmails: [],
    memberEmails: [],
  };

  constructor(private activatedRoute: ActivatedRoute, private organizationService: OrganizationService) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.organizationService.getOrganizationById(params['organizationId'])
          .subscribe((organization) => {
            this.organization = organization;
          });
    });
  }
}
