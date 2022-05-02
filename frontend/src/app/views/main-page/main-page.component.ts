import { Component, OnInit } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { HeaderButtonEnum } from 'src/app/models/header-button.enum';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';
import { SharedHeadlineButtonDataService } from 'src/app/services/shared-headline-button-data.service';
import { SharedUserDataService } from 'src/app/services/shared-user-data.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})

export class MainPageComponent implements OnInit {

  currentAddress: Observable<string> = this.sharedUserDataService.getCurrentAddress();
  searchInput!: string;
  posts$!: Observable<Post[]>;
  currentUserPosts$!: Observable<Post[]>;
  activeButton$!: Observable<HeaderButtonEnum>;

  readonly ALL_POSTS_BUTTON = HeaderButtonEnum.ALL_POSTS
  readonly WISHLIST_POSTS_BUTTON = HeaderButtonEnum.WISHLIST_POSTS
  readonly CURRENT_USER_POSTS_BUTTON = HeaderButtonEnum.CURRENT_USER_POSTS

  constructor(private postService: PostService,
              private sharedUserDataService: SharedUserDataService,
              private sharedHeadlineButtonDataService: SharedHeadlineButtonDataService) {}

  ngOnInit(): void {

    this.posts$ = this.postService.getAllPosts().pipe(map(posts => {
        return posts.slice().reverse();
      }))      

    this.currentUserPosts$ = this.posts$
      .pipe(
        map((posts) => 
          {
          var currentAddress: string;
          this.currentAddress.pipe(take(1)).subscribe(address => currentAddress = address)
          return posts.filter(post => post.charityOrganizationAddress === currentAddress)
        })
      );

    this.activeButton$ = this.sharedHeadlineButtonDataService.activeButton;
  }
}
