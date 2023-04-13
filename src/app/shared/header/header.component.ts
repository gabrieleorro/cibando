import { Component, DoCheck } from '@angular/core';
import { faAddressCard, faHotel, faReceipt, faUserLock, faPlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';

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
  cerca = faMagnifyingGlass;
  user: any;
  ricerca: string = '';

  constructor(
    private router: Router,
    public authService: AuthService,
    private recipeService: RecipeService,
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

  risultato() {
    const currentRoute = this.router.url;
    if(currentRoute !== `/ricette/cerca/${this.ricerca}` ) {
      this.recipeService.testoCercato.next(this.ricerca);
      this.router.navigate([`/ricette/cerca/${this.ricerca}`]);
      this.ricerca = '';
    } else {
      this.recipeService.testoCercato.next(this.ricerca);
      this.router.navigate([`/ricette/cerca/${this.ricerca}`]);
      this.ricerca = '';
    }
  }
}
