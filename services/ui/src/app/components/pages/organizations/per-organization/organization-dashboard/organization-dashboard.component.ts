import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OrganizationService} from '../../../../../services/organization/organization.service';
import {OrganizationDto} from '../../../../../dtos/organization/OrganizationDto';
import {LoadingService} from '../../../../../services/loading/loading.service';

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
  isLoadingMap = new Map<string, boolean>();
  readonly organizationDashboardInitialOrganizationLoading = 'organization-dashboard-initial-organization-loading';
  readonly doAddAdministratorToMembersLoading = 'do-add-administrator-to-members-loading';
  readonly doAddMemberToAdministratorsLoading = 'do-add-member-to-administrators-loading';
  readonly doRemoveOrganizationAdministratorLoading = 'do-remove-organization-administrator-loading';
  readonly doRemoveOrganizationMemberLoading = 'do-remove-organization-member-loading';
  readonly doDeleteOrganizationLoading = 'do-delete-organization-loading';

  constructor(
    private activatedRoute: ActivatedRoute,
    private organizationService: OrganizationService,
    private loadingService: LoadingService,
  ) {
    this.loadingService.isLoadingMapObservable()
        .subscribe((isLoadingMap) => {
          this.isLoadingMap = isLoadingMap;
        });
  }

  ngOnInit() {
    this.loadingService.onLoadingStart(this.organizationDashboardInitialOrganizationLoading);
    this.activatedRoute.params.subscribe((params) => {
      this.organizationService.getOrganizationById(params['organizationId'])
          .subscribe((organization) => {
            this.organization = organization;
            this.loadingService.onLoadingFinished(this.organizationDashboardInitialOrganizationLoading);
          });
    });
  }

  doAddAdministratorToMembers(administratorEmail: string) {
    this.loadingService.onLoadingStart(this.doAddAdministratorToMembersLoading);
    this.organizationService.addAdministratorAsMember(this.organization.id, administratorEmail)
        .subscribe((organizationMembershipStatus) => {
          if (organizationMembershipStatus.status === 'SUCCESS') {
            this.organization.memberEmails.push(administratorEmail);
          }
          this.loadingService.onLoadingFinished(this.doAddAdministratorToMembersLoading);
        });
  }

  doAddMemberToAdministrators(memberEmail: string) {
    this.loadingService.onLoadingStart(this.doAddMemberToAdministratorsLoading);
    this.organizationService.addMemberAsAdministrator(this.organization.id, memberEmail)
        .subscribe((organization) => {
          this.organization = organization;
          this.loadingService.onLoadingFinished(this.doAddMemberToAdministratorsLoading);
        });
  }

  doRemoveOrganizationAdministrator(administratorEmail: string) {
    this.loadingService.onLoadingStart(this.doRemoveOrganizationAdministratorLoading);
    this.organizationService.removeOrganizationAdministrator(this.organization.id, administratorEmail)
        .subscribe((organization) => {
          this.organization = organization;
          this.loadingService.onLoadingFinished(this.doRemoveOrganizationAdministratorLoading);
        });
  }

  doRemoveOrganizationMember(memberEmail: string) {
    this.loadingService.onLoadingStart(this.doRemoveOrganizationMemberLoading);
    this.organizationService.removeOrganizationMember(this.organization.id, memberEmail)
        .subscribe((organization) => {
          this.organization = organization;
          this.loadingService.onLoadingFinished(this.doRemoveOrganizationMemberLoading);
        });
  }

  doDeleteOrganization(organization: OrganizationDto) {
    this.organizationService.deleteOrganization(organization.id, this.doDeleteOrganizationLoading);
  }
}
