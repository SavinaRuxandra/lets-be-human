import { Component, OnInit } from '@angular/core';
import { map, Observable, of, Subscription } from 'rxjs';
import { HeaderButtonEnum } from 'src/app/shared/constants/header-button.enum';
import { CharityOrganization } from 'src/app/models/charity-organization.model';
import { Donor } from 'src/app/models/donor.model';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { SharedDataService } from 'src/app/shared/shared-data.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})

export class MainPageComponent implements OnInit {

  currentUser!: CharityOrganization | Donor | null;
  searchInput!: string;
  posts$!: Observable<Post[]>;
  currentUserPosts$!: Observable<Post[]>;
  activeButton$!: Observable<HeaderButtonEnum>;
  subscription$!: Subscription

  readonly ALL_POSTS_BUTTON = HeaderButtonEnum.ALL_POSTS
  readonly WISHLIST_POSTS_BUTTON = HeaderButtonEnum.WISHLIST_POSTS
  readonly CURRENT_USER_POSTS_BUTTON = HeaderButtonEnum.CURRENT_USER_POSTS

  constructor(private postService: PostService,
              private userService: UserService,
              private sharedDataService: SharedDataService) { }

  ngOnInit(): void {
    this.subscription$ = this.userService.user.subscribe(user => this.currentUser = user);

    this.posts$ = this.postService.getAllPosts().pipe(map(posts => {
        return posts.slice().reverse();
      }))      

    this.currentUserPosts$ = this.posts$
      .pipe(map((posts) => 
          posts.filter(post => post.charityOrganizationId === this.currentUser?.id)
      ));

    this.activeButton$ = this.sharedDataService.activeButton;
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
