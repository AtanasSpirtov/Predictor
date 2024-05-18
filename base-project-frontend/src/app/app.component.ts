import { Component } from '@angular/core';
import {User} from "./model/User";
import {StoreService} from "./service/store.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'base-project-frontend';

  userInfo: User
  constructor(private store: StoreService, private router: Router) {
    this.store.getCurrentUser().subscribe(userInfo => {
      this.userInfo = userInfo
    }
    )
  }

  logout() {
    this.store.changeUser(new User());
    this.router.navigate([''])
  }
}
