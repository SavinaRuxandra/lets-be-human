import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderButtonEnum } from 'src/app/models/header-button.enum';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';
import { SharedHeadlineButtonDataService } from 'src/app/services/shared-headline-button-data.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent {
  post!: Post;
  private subscription!: Subscription;

  constructor(private postService: PostService,
              private route: ActivatedRoute,
              private sharedHeadlineButtonDataService: SharedHeadlineButtonDataService,
              private router: Router) { 
    let id = +this.route.snapshot.paramMap.get('id')!;
    this.subscription = this.postService.getPostById(id).subscribe(post => 
      this.post = post
    )    
  }

  goBack(): void {
    this.sharedHeadlineButtonDataService.setActiveButton(HeaderButtonEnum.ALL_POSTS);
    this.router.navigate(['/main-page']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
