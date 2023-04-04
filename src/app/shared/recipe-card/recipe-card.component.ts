import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit, OnDestroy {

  @Input() pag: string;
  @Output() messaggio = new EventEmitter();

  recipes: Recipe[];
  ricetteTotali: number;
  page = 1;
  ricettePerPagina = 4;

  constructor(private recipeService: RecipeService) {}

  ngOnDestroy(): void {
    console.log('utente uscito dal componente')
  }

  ngOnInit(): void {
    this.prendiRicette();
  }

  prendiRicette() {
    this.recipeService.getRecipes().pipe(take(1)).subscribe({
      next: (res) => {
        this.recipes = res;
        this.ricetteTotali = res.length;
        if(this.pag) {
          this.recipes = this.recipes.sort((a, b) => b._id - a._id).slice(0, 4);
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  inviaTitolo(titolo: string) {
    this.messaggio.emit(titolo);
  }

  paginate(event) {
    event.page = event.page + 1;
    this.page = event.page;
  }

  // controlloRoute() {
  //   const currentRoute = this.router.url;
  //   if (currentRoute === '/home') {
  //     this.prendiRicetteHome();
  //   } else {
  //     this.prendiRicette();
  //   }
  // }

  // prendiRicetteHome() {
  //   this.recipeService.getRecipes().subscribe({
  //     next: (response) => {
  //       this.recipes = response;
  //       this.recipes = this.recipes.sort((a, b) => b._id - a._id).slice(0, 4);
  //       this.ricetteTotali = response.length;
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     }
  //   })
  // }

}
