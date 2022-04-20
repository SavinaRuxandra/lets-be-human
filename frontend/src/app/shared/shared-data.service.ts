import { HostListener, Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { HeaderButtonEnum } from './constants/header-button.enum';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  @HostListener('window:unload', [ '$event' ])
  unloadHandler() {
    this.changeActiveButton(HeaderButtonEnum.ALL_POSTS)
  }

  private buttonSource = new BehaviorSubject<HeaderButtonEnum>(HeaderButtonEnum.ALL_POSTS);
  activeButton = this.buttonSource.asObservable();  
  
  mapStringToEnum = new Map([
    [HeaderButtonEnum.ALL_POSTS.toString(), HeaderButtonEnum.ALL_POSTS],
    [HeaderButtonEnum.WISHLIST_POSTS.toString(), HeaderButtonEnum.WISHLIST_POSTS],
    [HeaderButtonEnum.CURRENT_USER_POSTS.toString(), HeaderButtonEnum.CURRENT_USER_POSTS],
 ]);
    
  constructor() { 
    if(localStorage.getItem('activeButton')) {
      this.changeActiveButton(this.mapStringToEnum.get(localStorage.getItem('activeButton')!)!);
    }

      
  }    
    
  changeActiveButton(button: HeaderButtonEnum) {
    this.buttonSource.next(button)
    localStorage.setItem('activeButton', button.toString())
  }   
}
