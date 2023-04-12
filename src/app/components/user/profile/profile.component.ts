import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import * as moment from 'moment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: any;
  data: any;
  update: any;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    if(JSON.parse(localStorage.getItem('user')) !== null) {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.onGetUser();
    }
  }

  onGetUser(): void {
    this.userService.getUser(this.user.email).pipe(take(1)).subscribe({
      next: (res) => {
        this.user = res;
        this.data = moment(this.user.createdAt).locale('it').format('dddd DD MMMM YYYY');
        this.update = moment(this.user.updatedAt).locale('it').format('dddd DD MMMM YYYY');
      },
      error: (err) => console.log(err)
    })
  }


}
