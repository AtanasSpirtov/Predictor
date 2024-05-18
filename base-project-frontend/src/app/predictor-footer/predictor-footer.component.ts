import { Component, OnInit } from '@angular/core';
import {StoreService} from "../service/store.service";
import {User} from "../model/User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-predictor-footer',
  templateUrl: './predictor-footer.component.html',
  styleUrls: ['./predictor-footer.component.css']
})
export class PredictorFooterComponent implements OnInit {

  userInfo: User
  constructor(private store: StoreService, private router: Router) { }

  ngOnInit(): void {
    this.store.getCurrentUser().subscribe(user => this.userInfo = user)
  }

  goToHomeScreen() {
    this.router.navigate(["home"])
  }

  logout() {
    this.store.changeUser(new User());
    this.router.navigate([''])
  }
}
