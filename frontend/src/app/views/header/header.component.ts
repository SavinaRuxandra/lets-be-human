import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { HeaderButtonEnum } from 'src/app/shared/constants/header-button.enum';
import { CharityOrganization } from 'src/app/models/charity-organization.model';
import { Donor } from 'src/app/models/donor.model';
import { UserService } from 'src/app/services/user.service';
import { LoginComponent } from '../login/login.component';
import { RegisterCharityOrganizationComponent } from '../register/register-charity-organization/register-charity-organization.component';
import { SharedDataService } from 'src/app/shared/shared-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  currentUser!: CharityOrganization | Donor | null;
  subscription$!: Subscription

  readonly ALL_POSTS_BUTTON = HeaderButtonEnum.ALL_POSTS
  readonly WISHLIST_POSTS_BUTTON = HeaderButtonEnum.WISHLIST_POSTS
  readonly CURRENT_USER_POSTS_BUTTON = HeaderButtonEnum.CURRENT_USER_POSTS

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(_event: any) {
    if (window.pageYOffset > 0) {
      let element = document.getElementById('navbar');
      element!.classList.add('sticky');
    } else {
     let element = document.getElementById('navbar');
       element!.classList.remove('sticky'); 
    }
  }

  constructor(private userService: UserService,
              private sharedDataService: SharedDataService,
              private dialog: MatDialog,
              private router: Router) { }

  ngOnInit(): void {
    this.subscription$ = this.userService.user.subscribe(user => this.currentUser = user);
  }

  isOnHomePage(): boolean {    
    return this.router.url === "/home";
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

  changeMainPageView(button: HeaderButtonEnum): void {
    this.sharedDataService.changeActiveButton(button);
  }

  getActiveButton(): Observable<HeaderButtonEnum> {
    return this.sharedDataService.activeButton;
  }

  goToMainPage(): void {
    if(this.router.url != "/home")
      if(this.router.url == "/main-page") {
        this.sharedDataService.changeActiveButton(HeaderButtonEnum.ALL_POSTS);
      }
      else 
        this.router.navigate(['/main-page'])
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
