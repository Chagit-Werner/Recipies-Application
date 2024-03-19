import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Recipe } from '../../../recipe.model';
import { RecipeService } from '../../../services/recipe.service';
import { Category } from '../../../category.model';
import { UserService } from '../../../services/user.service';



@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.scss'
})
export class AddRecipeComponent {
  recipeForm !: FormGroup;
  countUsers!: number
  countRecipies!: number

  constructor(private _recipeServie: RecipeService, private _userService:UserService, private formBuilder: FormBuilder,
     private router: Router) { }

  ingredientsFormArray!: FormArray;
  instructionsFormArray!: FormArray;
  code!:number
  categories: Category[] = [];
  ngOnInit(): void {
    this._recipeServie.getCategories().subscribe({
      next: (res) => {
        this.categories = res;
      },
      error: (error) => {
        console.error(error);
      }
    });
    this._userService.getUsers().subscribe((users)=>this.countUsers=users.length);
    this._recipeServie.getRecipes().subscribe((recipies)=>this.countRecipies=recipies.length);

    this.recipeForm = this.formBuilder.group({
      nameRecipe: ['', Validators.required],
      codeCategory: ['', Validators.required],
      duration: ['', Validators.required],
      degree: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      date: ['', Validators.required],
      image: ['', Validators.required],
      products: this.formBuilder.array([]),
      instructions: this.formBuilder.array([])
    });
    this.ingredientsFormArray = this.recipeForm.get('products') as FormArray;
    this.instructionsFormArray = this.recipeForm.get('instructions') as FormArray;
  }


  removeIngredient(index: number) {
    this.ingredientsFormArray.removeAt(index);
  }


  addIngredient() {
    this.ingredientsFormArray.push(this.formBuilder.control(''));
  }


  addInstruction() {
    this.instructionsFormArray.push(this.formBuilder.control(''));

  }
  removeInstruction(index: number) {
    this.instructionsFormArray.removeAt(index);
  }
  resetForm() {
    this.recipeForm.reset();
  }

  get ingredients() {
    return this.recipeForm.get('products') as FormArray;
  }

  get instructions() {
    return this.recipeForm.get('instructions') as FormArray;
  }
  clearFormArrays() {
    while (this.ingredientsFormArray.length !== 0) {
      this.ingredientsFormArray.removeAt(0);
    }

    while (this.instructionsFormArray.length !== 0) {
      this.instructionsFormArray.removeAt(0);
    }
  }


  getInstructionFormControl(index: number): FormControl {
    return this.instructionsFormArray.at(index) as FormControl;
  }
  getIngredientFormControl(index: number): FormControl {
    return this.ingredientsFormArray.at(index) as FormControl;
  }

  submit() {

  const userData = sessionStorage.getItem('userInfo');
    if (userData) {
      this.code = JSON.parse(userData).userId;
    }
    if (this.instructionsFormArray.length === 0) {
      this.addInstruction();
    }
    const { nameRecipe, codeCategory, duration, degree, image, date } = this.recipeForm.value;
    //חילוץ קוד המשתמש מ-sessionStorage
    const userInfoString = sessionStorage.getItem('userInfo');
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      const userCode = userInfo.userId;
     
    }
    const r: Recipe = {
      codeRecipe: this.countRecipies+1,
      nameRecipe: nameRecipe,
      codeCategory: codeCategory,
      duration: duration,
      degree: degree,
      date: date,
      products: this.recipeForm.value.products.filter((ingredient: string) => ingredient.trim() !== ''),
      instructions: this.recipeForm.value.instructions.filter((ingredient: string) => ingredient.trim() !== ''),
      codeUser: this.code,
      image: image
    }
   
    this._recipeServie.addRecipe(r).subscribe(
      (recipe) => {
        this.resetForm();
        this.clearFormArrays();
        Swal.fire({
          title: ' The recipe was successfully added',
          icon: 'success',
          confirmButtonText: 'Confirm'
        })
          .then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/recipies/all-recipies']);
            }
          });
      },
      (error) => {
        console.error("Error adding recipe:", error);
        Swal.fire({
          title: 'ERROR!!!!!!',
          text: 'Error in adding recipe, Try later',
          icon: 'error',
          confirmButtonText: 'Confirm'
        });
        this.clearFormArrays();
      }
    );
    this.recipeForm.reset();

  }
}

