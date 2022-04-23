import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { CharityOrganization } from 'src/app/models/charity-organization.model';
import { Donor } from 'src/app/models/donor.model';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  createPostForm!: FormGroup;
  photos: string[] = [];
  photosFile: File[] = [];
  currentUser!: CharityOrganization | Donor | null;
  subscription$!: Subscription

  constructor(private postService: PostService,
              private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router,
              private snack: MatSnackBar
              ) { }

  ngOnInit(): void {
    this.subscription$ = this.userService.user.subscribe(user => this.currentUser = user);
    this.createFormGroup();
  }

  createFormGroup(): void {
    this.createPostForm = this.formBuilder.group({
      headline: ['', [Validators.required]],
      description: ['', [Validators.required]],
      readMoreUrl: ['']
    })
  }

  onFileChanges(event: any): void {
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
        this.photos.push(reader.result as string);
        this.photosFile.push(file);
      };
    }
  }

  onSubmit(): void {
    this.addPost();
    this.goBack();
  }

  async addPost() {
    const postToAdd: Post = <Post> {
      charityOrganizationId: this.currentUser!.id,
      headline: this.createPostForm.controls['headline'].value,
      description: this.createPostForm.controls['description'].value,
      readMoreUrl: this.createPostForm.controls['readMoreUrl'].value,
    };

    const formData = new FormData();
    formData.append('post', new Blob([JSON.stringify(postToAdd)], { type: 'application/json' }))

    for (let i = 0; i < this.photosFile.length; i++) {
      formData.append('photos', this.photosFile[i]);
    }

    this.postService.addPost(formData)
        .pipe(take(1))
        .subscribe(() => {
          this.snack.open("Post successfully added", "x", {duration: 4000});
        },
        err => {
          this.snack.open("Post could not be added", "x", {duration: 4000})
        })
  }

  cancel(): void {
    this.goBack();
  }

  goBack(): void {
    this.router.navigate(['/main-page']);
    window.location.reload;
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}