import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HeaderButtonEnum } from 'src/app/models/header-button.enum';;
import { AuthentificationService } from 'src/app/services/authentification.service';
import { SharedHeadlineButtonDataService } from 'src/app/services/shared-headline-button-data.service';
import { UserRole } from 'src/app/models/user-role.model';
import { SharedUserDataService } from 'src/app/services/shared-user-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  currentUserRole: Observable<UserRole> = this.sharedUserDataService.getCurrentUserRole();

  readonly ALL_POSTS_BUTTON = HeaderButtonEnum.ALL_POSTS
  readonly WISHLIST_POSTS_BUTTON = HeaderButtonEnum.WISHLIST_POSTS
  readonly CURRENT_USER_POSTS_BUTTON = HeaderButtonEnum.CURRENT_USER_POSTS

  readonly DONOR = UserRole.DONOR
  readonly CHARITY_ORGANIZATION = UserRole.CHARITY_ORGANIZATION
  readonly LOGGED_OUT = UserRole.LOGGED_OUT

  constructor(private sharedUserDataService: SharedUserDataService,
              private sharedHeadlineButtonDataService: SharedHeadlineButtonDataService,
              private authentificationService: AuthentificationService,
              private router: Router) { }

  isOnHomePage(): boolean {    
    return this.router.url === "/home";
  }

  logOut(): void {
    this.authentificationService.logOut();
  }

  changeMainPageView(button: HeaderButtonEnum): void {
    this.sharedHeadlineButtonDataService.changeActiveButton(button);
  }

  getActiveButton(): Observable<HeaderButtonEnum> {
    return this.sharedHeadlineButtonDataService.activeButton;
  }

  goToMainPage(): void {
    if(this.router.url != "/home")
      if(this.router.url == "/main-page") {
        this.sharedHeadlineButtonDataService.changeActiveButton(HeaderButtonEnum.ALL_POSTS);
      }
      else 
        this.router.navigate(['/main-page'])
  }
}
