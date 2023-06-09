import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { Observable, map, take } from 'rxjs';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
  providers: [MessageService]
})
export class RecipeCardComponent implements OnInit, OnDestroy {

  @Input() pag: string;
  @Output() messaggio = new EventEmitter();

  // recipes: Recipe[];
  ricetteTotali: number;
  page = 1;
  ricettePerPagina = 4;
  ricette: Recipe[];
  ruolo: any;
  ricercato: string;


  recipes$ = this.recipeService.getRecipes().pipe(
    map(response => {
      if(this.pag === 'ricerca') {
        this.ricercaRicette();
      } else {
        this.ricette = response;
        if(response) {
          this.messageService.add({severity: 'success', summary:'Completato', detail: 'Ricette caricate correttamente', life: 3000})
        }
      }
    }),
  );

  constructor(
    private recipeService: RecipeService,
    private messageService: MessageService,
    private userService: UserService,
    public authService: AuthService,
    private router: Router,
  ) {}

  ngOnDestroy(): void {
    console.log('utente uscito dal componente')
  }

  inviaTitolo(titolo: string) {
    this.messaggio.emit(titolo);
  }

  paginate(event) {
    event.page = event.page + 1;
    this.page = event.page;
  }

  ngOnInit(): void {
    if(JSON.parse(localStorage.getItem('user')) != null) {
      this.userService.userRole.subscribe({
        next: (res) => {
          this.ruolo = res;
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  ricercaRicette() {
    this.recipeService.testoCercato.subscribe({
      next: (res: string) => {
        this.ricercato = res;
        if(this.ricercato) {
          this.recipeService.findRecipes(this.ricercato).subscribe({
            next: (res) => {
              this.ricette = res;
              if(res) {
                this.messageService.add({severity: 'success', summary:'Completato', detail: 'Ricette cercate correttamente.', life: 3000})
              }
            },
            error: (err) => {
              this.messageService.add({severity: 'error', summary:'Fallito!', detail: 'Ricette non trovate.', life: 6000})
            }
          })
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  // prendiRicette() {
  //   this.recipeService.getRecipes().pipe(take(1)).subscribe({
  //     next: (res) => {
  //       this.recipes = res;
  //       this.ricetteTotali = res.length;
  //       if(this.pag) {
  //         this.recipes = this.recipes.sort((a, b) => b._id - a._id).slice(0, 4);
  //       }
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     }
  //   })
  // }


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
