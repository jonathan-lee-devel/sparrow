import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {OrganizationDto} from '../../dtos/organization/OrganizationDto';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  constructor(private httpClient: HttpClient) { }

  createOrganization(name: string): Observable<OrganizationDto> {
    return this.httpClient.post<OrganizationDto>(`${environment.MAIN_API_URL}/organizations`, {name});
  }

  getOrganizationById(organizationId: string): Observable<OrganizationDto> {
    return this.httpClient.get<OrganizationDto>(`${environment.MAIN_API_URL}/organizations/${organizationId}`);
  }

  addAdministratorAsMember(organizationId: string, administratorEmail: string): Observable<OrganizationDto> {
    return this.httpClient.patch<OrganizationDto>(`${environment.MAIN_API_URL}/organizations/update-admin-join-as-member/${organizationId}`, {email: administratorEmail});
  }

  addMemberAsAdministrator(organizationId: string, memberEmail: string): Observable<OrganizationDto> {
    return this.httpClient.patch<OrganizationDto>(`${environment.MAIN_API_URL}/organizations/update-member-join-as-admin/${organizationId}`, {email: memberEmail});
  }

  removeOrganizationAdministrator(organizationId: string, administratorEmail: string): Observable<OrganizationDto> {
    return this.httpClient.patch<OrganizationDto>(`${environment.MAIN_API_URL}/organizations/${organizationId}/administrators/remove`, {administratorEmailToRemove: administratorEmail});
  }

  removeOrganizationMember(organizationId: string, memberEmail: string): Observable<OrganizationDto> {
    return this.httpClient.patch<OrganizationDto>(`${environment.MAIN_API_URL}/organizations/${organizationId}/members/remove`, {memberEmailToRemove: memberEmail});
  }
}
