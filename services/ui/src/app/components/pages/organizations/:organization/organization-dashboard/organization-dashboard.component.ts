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
  isLoading: boolean = true;

  constructor(private activatedRoute: ActivatedRoute, private organizationService: OrganizationService) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.organizationService.getOrganizationById(params['organizationId'])
          .subscribe((organization) => {
            setTimeout(() => {
              this.organization = organization;
              this.isLoading = false;
            }, 2000);
          });
    });
  }

  doAddAdministratorToMembers(administratorEmail: string) {
    this.isLoading = true;
    this.organizationService.addAdministratorAsMember(this.organization.id, administratorEmail)
        .subscribe((organization) => {
          this.organization = organization;
          this.isLoading = false;
        });
  }

  doAddMemberToAdministrators(memberEmail: string) {
    this.isLoading = true;
    this.organizationService.addMemberAsAdministrator(this.organization.id, memberEmail)
        .subscribe((organization) => {
          this.organization = organization;
          this.isLoading = false;
        });
  }

  doRemoveOrganizationAdministrator(administratorEmail: string) {
    this.isLoading = true;
    this.organizationService.removeOrganizationAdministrator(this.organization.id, administratorEmail)
        .subscribe((organization) => {
          this.organization = organization;
          this.isLoading = false;
        });
  }

  doRemoveOrganizationMember(memberEmail: string) {
    this.isLoading = true;
    this.organizationService.removeOrganizationMember(this.organization.id, memberEmail)
        .subscribe((organization) => {
          this.organization = organization;
          this.isLoading = false;
        });
  }
}
