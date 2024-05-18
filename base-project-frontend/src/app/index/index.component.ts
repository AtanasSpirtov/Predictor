import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../service/authentication.service";
import {StoreService} from "../service/store.service";
import {Router} from "@angular/router";
import {User} from "../model/User";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authenticationService: AuthenticationService, private store: StoreService, private router: Router) { }

  ngOnInit(): void {
  }

  submit() {
    if (this.form.valid) {
      this.authenticationService.login(this.form.value).subscribe({
        next: (response: User) => {
          this.store.enhanceUserWithDetails(response);
          this.router.navigate(['home']).then();
        },
        error: () => {
          this.form.reset()
        }
      })
    }
  }

}
