import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { faReceipt } from '@fortawesome/free-solid-svg-icons';
import { faHotel } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cibando';

  faAddressCard = faAddressCard;
  faReceipt = faReceipt;
  faHotel = faHotel;

  colore = "green";

  coloreScelto = '';
  cambiaBG(){
    this.colore = this.coloreScelto;
  }

  evidenziato = false;
  onEvidenziazione(){
    this.evidenziato = !this.evidenziato;
  }

}
