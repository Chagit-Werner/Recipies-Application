using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RecipesApi.Entities
{
    
    public class Recipe
    {
        static int index = 1;
        public int codeRecipe { get; set; }
        public string nameRecipe { get; set; }
        public int? codeCategory { get; set; }
        public int duration { get; set; }
        public int degree { get; set; }
        public DateTime date { get; set; }
        public List<string> products { get; set; }
        public List<string> Instructions { get; set; }

        public int? codeUser { get; set; }

       
        public string image { get; set; }
        public Recipe()
        {

        }
        public Recipe(string name, int categoryId, int preparationTime, int difficultyLevel, DateTime dateAdded, List<string> ingredientsOfRecipe, List<string> preparationRecipe, int? userId, string image)
        {
            codeRecipe = index++;
            nameRecipe = name;
            codeCategory = categoryId;
            duration = preparationTime;
            degree = difficultyLevel;
            date = dateAdded;
            products = ingredientsOfRecipe;
            Instructions = preparationRecipe;
            codeUser = userId;
            this.image = image;
        }
    }
}
