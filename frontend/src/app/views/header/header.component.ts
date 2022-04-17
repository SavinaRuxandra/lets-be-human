import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { loggedRole } from 'src/app/constants/constants';
import { CharityOrganization } from 'src/app/models/charity-organization.model';
import { Donor } from 'src/app/models/donor.model';
import { UserService } from 'src/app/services/user.service';
import { LoginComponent } from '../login/login.component';
import { RegisterCharityOrganizationComponent } from '../register/register-charity-organization/register-charity-organization.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  currentUser!: CharityOrganization | Donor | null;

  constructor(public userService: UserService,
              public dialog: MatDialog,
              public router: Router) { }

  ngOnInit(): void {
    this.userService.user.subscribe(user => this.currentUser = user);
  }

  isOnHomePage(): boolean {
    return this.currentUser == null;
  }

  login(): void {
    this.dialog.open(LoginComponent);
  }

  logOut(): void {
    this.userService.logOut();
    this.router.navigate(['home']);

  }

  registerCharityOrganization(): void {
    this.dialog.open(RegisterCharityOrganizationComponent, { disableClose: true });
  }
}
