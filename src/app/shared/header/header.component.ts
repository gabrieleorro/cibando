import { Component, DoCheck } from '@angular/core';
import { faAddressCard, faHotel, faReceipt, faUserLock, faPlus } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements DoCheck {

  faAddressCard = faAddressCard;
  faReceipt = faReceipt;
  faHotel = faHotel;
  faUserLock = faUserLock;
  faPlus = faPlus;
  user: any;

  constructor(
    private router: Router,
    public authService: AuthService,
  ) {}

  ngDoCheck(): void {
    if (JSON.parse(localStorage.getItem('user')) !== null) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


}
