import { Component, OnInit } from '@angular/core';
import { filter, map, Observable, Subscription, take } from 'rxjs';
import { HeaderButtonEnum } from 'src/app/models/header-button.enum';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';
import { SharedHeadlineButtonDataService } from 'src/app/services/shared-headline-button-data.service';
import { SharedUserDataService } from 'src/app/services/shared-user-data.service';
import { DonationService } from 'src/app/services/donation.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})

export class MainPageComponent implements OnInit {

  currentAddress!: string;
  searchInput!: string;
  posts$: Observable<Post[]> = this.getAllPosts();
  helpedCauses$!: Observable<Post[]>;
  currentUserPosts$: Observable<Post[]> = this.getCurrentUserPosts();

  activeButton$: Observable<HeaderButtonEnum> = this.sharedHeadlineButtonDataService.getActiveButton();

  subscription$!: Subscription;

  readonly ALL_POSTS_BUTTON = HeaderButtonEnum.ALL_POSTS
  readonly WISHLIST_POSTS_BUTTON = HeaderButtonEnum.WISHLIST_POSTS
  readonly CURRENT_USER_POSTS_BUTTON = HeaderButtonEnum.CURRENT_USER_POSTS

  constructor(private postService: PostService,
              private sharedUserDataService: SharedUserDataService,
              private sharedHeadlineButtonDataService: SharedHeadlineButtonDataService,
              private transferService: DonationService) {}

  ngOnInit(): void {
    this.sharedUserDataService.getCurrentAddress().pipe(take(1)).subscribe(address => this.currentAddress = address)  
    this.setHelpedCauses();
  }

  getAllPosts(): Observable<Post[]> {        
    return this.postService.getAllPosts()
      .pipe(
        map(posts => {
          return posts.filter(post => post.deleted == false)
                      .slice().reverse();
        })
      )  
  }
  
  setHelpedCauses(): void {
    this.subscription$ = this.transferService.getLiveDonations().subscribe(donations => {
      this.helpedCauses$ = this.posts$.
        pipe(
          map(posts => {
            return posts.filter(post => {
                return (donations.filter(donation => this.currentAddress == donation.accountSender && post.id == donation.postId)
                                  .length) > 0;                     
              })
          })
        )
      })
  }

  getCurrentUserPosts(): Observable<Post[]> {
    return this.posts$
      .pipe(
        map(posts => {
          return posts.filter(post => post.charityOrganizationAddress === this.currentAddress)
        })
      );
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}

