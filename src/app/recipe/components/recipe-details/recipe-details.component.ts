import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { RecipeService } from '../../../services/recipe.service';
import { Recipe } from '../../../recipe.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.scss'
})
export class RecipeDetailsComponent {
  public recipe!: Recipe
  public itemId!: number
  stars: number[] = [];
  code!: number;
  constructor(private route: ActivatedRoute, private _recipeServie: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.itemId = param['id']
      this._recipeServie.getRecipeById(this.itemId).subscribe({
        next: (res) => {
          this.recipe = res;
        },
      })
    })
    this.stars = Array(this.recipe.degree).fill(0);
  }
  isCurrentUserRecipeOwner(): boolean {
    const userData = sessionStorage.getItem('userInfo');
    if (userData) {
      this.code = JSON.parse(userData).userId;
    }
    return this.code == this.recipe.codeUser
  }

  deleteRecipe(): void {
    this._recipeServie.deleteRecipe(this.recipe.codeRecipe)
      .subscribe({
        next: () => {
          Swal.fire(
            'Deleted!!!!!!',
            'The recipe was deleted successfully',
            'success'
          );
          this.router.navigate(['/recipies/all-recipies']);
        },
        error: (err) => {
          console.log(err);
          Swal.fire(
            'ERROR!',
            'An Error occured... Sorry!',
            'error'
          );
        }
      });
  }
  editRecipe() {
    this.router.navigate(['recipies/edit-recipe', this.recipe.codeRecipe])
  }
}

