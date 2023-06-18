import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingPageComponent} from './components/pages/landing-page/landing-page.component';
import {DashboardComponent} from './components/pages/dashboard/dashboard.component';
import {AuthGuard} from './guards/auth.guard';
import {
  CreateOrganizationComponent,
} from './components/pages/organizations/create-organization/create-organization.component';
import {
  ManageOrganizationsComponent,
} from './components/pages/organizations/manage-organizations/manage-organizations.component';
import {LoginComponent} from './components/pages/login/login.component';
import {ResetPasswordComponent} from './components/pages/reset-password/reset-password.component';
import {RegisterComponent} from './components/pages/register/register.component';
import {RegisterConfirmComponent} from './components/pages/register-confirm/register-confirm.component';
import {
  ResetPasswordConfirmComponent,
} from './components/pages/reset-password-confirm/reset-password-confirm.component';
import {
  OrganizationDashboardComponent,
} from './components/pages/organizations/:organization/organization-dashboard/organization-dashboard.component';
import {GoogleLoginSuccessComponent} from './components/pages/google-login-success/google-login-success.component';
import {ServerErrorComponent} from './components/pages/error/server-error/server-error.component';

const routes: Routes = [
  /* ANONYMOUS ROUTES */
  {path: '', component: LandingPageComponent},
  {path: 'home', component: LandingPageComponent},
  {path: 'welcome', component: LandingPageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'register/confirm/:tokenValue', component: RegisterConfirmComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'reset-password/confirm/:tokenValue', component: ResetPasswordConfirmComponent},
  /* ERROR ROUTES */
  {path: 'error/server-error', component: ServerErrorComponent},
  /* GOOGLE LOGIN ROUTES */
  {path: 'google-login-success', component: GoogleLoginSuccessComponent},
  /* ORGANIZATION ROUTES */
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'organizations/create', component: CreateOrganizationComponent, canActivate: [AuthGuard]},
  {path: 'organizations/manage', component: ManageOrganizationsComponent, canActivate: [AuthGuard]},
  {path: 'organizations/dashboard/:organizationId', component: OrganizationDashboardComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
/**
 * Default generated app routing module.
 */
export class AppRoutingModule { }
