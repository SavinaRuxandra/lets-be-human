import { HostListener, Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { HeaderButtonEnum } from '../models/header-button.enum';

@Injectable({
  providedIn: 'root'
})
export class SharedHeadlineButtonDataService {

  private buttonSource = new BehaviorSubject<HeaderButtonEnum>(HeaderButtonEnum.ALL_POSTS);
  
  mapStringToEnum = new Map([
    [HeaderButtonEnum.ALL_POSTS.toString(), HeaderButtonEnum.ALL_POSTS],
    [HeaderButtonEnum.WISHLIST_POSTS.toString(), HeaderButtonEnum.WISHLIST_POSTS],
    [HeaderButtonEnum.CURRENT_USER_POSTS.toString(), HeaderButtonEnum.CURRENT_USER_POSTS],
    [HeaderButtonEnum.CREATE_POST.toString(), HeaderButtonEnum.CREATE_POST],
    [HeaderButtonEnum.NONE.toString(), HeaderButtonEnum.NONE]
 ]);
    
  constructor() { 
    if(sessionStorage.getItem('activeButton')) {
      this.setActiveButton(this.mapStringToEnum.get(sessionStorage.getItem('activeButton')!)!);
    }
  }    
    
  setActiveButton(button: HeaderButtonEnum) {
    this.buttonSource.next(button)
    sessionStorage.setItem('activeButton', button.toString())
  }   

  getActiveButton() {
    return this.buttonSource.asObservable();
  }
}
