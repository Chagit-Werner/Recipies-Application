import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AllRecipesComponent } from './components/all-recipes/all-recipes.component';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { EditRecipeComponent } from './components/edit-recipe/edit-recipe.component';
import { viewRecipeGuard } from '../view-recipe.guard';


const reciprRoutes: Routes = [
  { path: '', redirectTo: 'allRecipies', pathMatch: 'full' },
  { path: 'all-recipies', component: AllRecipesComponent },
  { path: 'add-recipe', component: AddRecipeComponent },
  { path: 'recipe-details/:id', component:RecipeDetailsComponent, canActivate:[viewRecipeGuard] },
  { path: 'edit-recipe/:id', component:EditRecipeComponent },
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
     RouterModule.forChild(reciprRoutes)
  ],  
  exports: [RouterModule]

})
export class RecipeRoutingModule { }
