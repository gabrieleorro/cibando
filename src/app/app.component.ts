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

  images = [
    {
      id: 1,
      label: 'Spaghetti al sugo di gamberi'
    },
    {
      id: 2,
      label: 'Tagliata di manzo'
    },
    {
      id: 3,
      label: 'Tiramisù alle fragole'
    },
  ];

  percorso = "../assets/images/carousel-";

  colore = "green";
}
