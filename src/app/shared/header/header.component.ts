import { Component } from '@angular/core';
import { faAddressCard, faHotel, faReceipt, faUserLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  faAddressCard = faAddressCard;
  faReceipt = faReceipt;
  faHotel = faHotel;
  faUserLock = faUserLock;

}
