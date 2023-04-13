import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipesComponent } from './recipes.component';
import { DetailComponent } from './detail/detail.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { RecipeCardComponent } from 'src/app/shared/recipe-card/recipe-card.component';
import { ResultComponent } from './result/result.component';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeCardComponent,
    RecipesListComponent,
    DetailComponent,
    NewRecipeComponent,
    ResultComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    PaginatorModule,
    ToastModule,
    CKEditorModule,
    RecipesRoutingModule,
    HttpClientModule,
  ],
  exports: [RecipeCardComponent]
})

export class RecipesModule {}
