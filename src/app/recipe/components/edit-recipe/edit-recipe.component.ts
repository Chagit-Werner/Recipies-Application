import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { RecipeService } from '../../../services/recipe.service';
import { Category } from '../../../category.model';
import { Recipe } from '../../../recipe.model';

@Component({
  selector: 'app-edit-recipe',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-recipe.component.html',
  styleUrl: './edit-recipe.component.scss'
})
export class EditRecipeComponent implements OnInit {
  public recipe!: Recipe
  public itemId!: number
  categories: Category[] = [];
  recipeForm!: FormGroup;
  constructor(private route: ActivatedRoute, private router: Router, private _recipeServie: RecipeService, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.itemId = param['id'];
     
      this._recipeServie.getRecipeById(this.itemId).subscribe({
        next: (res) => {
          this.recipe = res;
          this.initForm();
        },
      });
    });
    this.loadCategories();
  }
  initForm(): void {
    this.recipeForm = this.formBuilder.group({
      nameRecipe: [this.recipe.nameRecipe, Validators.required],
      codeCategory: [this.recipe.codeCategory],
      duration: [this.recipe.duration, Validators.required],
      degree: [this.recipe.degree, [Validators.required, Validators.min(1), Validators.max(5)]],
      date: [this.recipe.date, Validators.required],
      image: [this.recipe.image, Validators.required],
      products: [this.recipe.products.join('\n'), Validators.required],
      instructions: [this.recipe.instructions.join('\n'), Validators.required]
    });
  }
  saveChanges(): void {
      if(this.recipeForm.valid){
      this._recipeServie.editRecipe(this.recipe)
      .subscribe(() => {
        Swal.fire({
          title: 'The recipe was updated successfully',
          text: '',
          icon: 'success',
          timer: 2000,
          timerProgressBar: true,
          background: '#FFFFFF',
          iconColor: '#FF69B4'
        }).then(() => {
                this.router.navigate(['recipies/recipe-details', this.itemId]);
        });
      });
    }
  }
  cancel(): void {
    this.router.navigate(['recipies/recipe-details', this.itemId]);
  }
  loadCategories(): void {
    this._recipeServie.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }
}


