using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using RecipesApi.Entities;
using System.IO.Pipelines;

namespace RecipesApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        public static List<Recipe> recipes = new List<Recipe>()
        {
            new Recipe  ( "Cheese Pie",
                3,
                40,
                3,
               new DateTime(2020,05,1),
                new List<string>()
            {
                "cheese", "eggs", "pie crust", "herbs"
            },
        new List<string>()
            {
                "Prepare pie crust", "Mix cheese and eggs", "Pour mixture into crust", "Bake in oven"
            },

                1,
                "../../../../assets/images/food/pie1.jpg"
        ),
             new Recipe("Petti Foue",
        4,
        30,
        2,
          new DateTime(2018,05,1),

        new List<string>()
        {
            "flour", "sugar", "eggs", "milk", "butter"
        },
        new List<string>()
        {
            "Mix flour, sugar, and eggs", "Add milk and melted butter", "Bake in the oven"
        },
        1,
        "../../assets/images/food/pett.jpg"
    ),
       new Recipe("Chocolate Ice Cream",
        5,
        240,
        2,
         new DateTime(2023,05,1),

        new List<string>()
        {
            "milk", "sugar", "cocoa powder", "heavy cream"
        },
        new List<string>()
        {
            "Mix milk, sugar, and cocoa powder", "Whip heavy cream separately", "Combine and freeze"
        },
        2,
        "../../assets/images/food/chocolate-icecream.jpg"
    ),
       new Recipe("Strawberry Shake",
        5,
        10,
        1,
        DateTime.Now,
        new List<string>()
        {
            "strawberries", "milk", "vanilla ice cream", "sugar"
        },
        new List<string>()
        {
            "Blend strawberries, milk, and vanilla ice cream", "Add sugar to taste", "Serve chilled"
        },
        null,
        "../../assets/images/food/shake.jpg"
    ),
    new Recipe("Strawberry Pie",
        3,
        60,
        2,
        DateTime.Now,
        new List<string>()
        {
            "strawberries", "pie crust", "sugar", "cornstarch"
        },
        new List<string>()
        {
            "Prepare pie crust", "Mix strawberries, sugar, and cornstarch", "Pour mixture into crust", "Bake in oven"
        },
        1,
        "../../assets/images/food/pie2.jpg"
    ),
    new Recipe("Pancakes",
        1,
        20,
        1,
        DateTime.Now,
        new List<string>()
        {
            "flour", "milk", "eggs", "baking powder", "sugar", "butter"
        },
        new List<string>()
        {
            "Mix flour, milk, eggs, baking powder, and sugar", "Cook on a hot griddle with butter"
        },
        3,
        "../../assets/images/food/pancakes.jpg"
    ),
    new Recipe("Macaron Cookies",
        2,
        90,
        3,
        DateTime.Now,
        new List<string>()
        {
            "almond flour", "powdered sugar", "egg whites", "sugar", "food coloring"
        },
        new List<string>()
        {
            "Sift almond flour and powdered sugar", "Whip egg whites with sugar to stiff peaks", "Fold dry ingredients into egg whites", "Pipe onto baking sheets", "Bake in oven"
        },
        4,
        "../../assets/images/food/Macaroncookies.jpg"
    ),
    new Recipe("Cake",
    1,
    60,
    2,
    DateTime.Now,
    new List<string>()
    {
        "flour", "sugar", "eggs", "butter", "baking powder", "vanilla extract", "milk"
    },
    new List<string>()
    {
        "Preheat oven to 350°F (175°C)",
        "Grease and flour a cake pan",
        "In a large mixing bowl, cream together butter and sugar until light and fluffy",
        "Add eggs one at a time, beating well after each addition",
        "Stir in vanilla extract",
        "Combine flour and baking powder; add to creamed mixture alternately with milk, beginning and ending with flour mixture",
        "Pour batter into prepared pan",
        "Bake in preheated oven for 30-35 minutes or until a toothpick inserted into the center comes out clean",
        "Allow to cool in pan for 10 minutes, then remove from pan and cool completely on a wire rack",
        "Frost or decorate as desired"
    },
    5,
     "../../assets/images/food/cake1.jpg" ),
        };
        [HttpGet]
        public IEnumerable<Recipe> Get()
        {
            return recipes;
        }
        [HttpGet("{id}")]
        public Recipe Get(int id)
        {
            var r = recipes.Find(x => x.codeRecipe == id);
            if (r != null)
            {
                return r;
            }
            return null;
        }
        [HttpPost]
        public bool Post([FromBody] Recipe r)
        {
            recipes.Add(r);
            return true;
        }
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Recipe value)
        {
            var recipe = recipes.Find(x => x.codeRecipe == id);
            Console.WriteLine(value.codeRecipe);
            if (recipe != null)
            {
                recipe.codeRecipe = value.codeRecipe;
                recipe.image = value.image;
                recipe.nameRecipe = value.nameRecipe;
                recipe.products = value.products;
                recipe.duration = value.duration;
                recipe.codeCategory = value.codeCategory;
                recipe.date = value.date;
                recipe.degree = value.degree;
                recipe.codeUser = value.codeUser;
            }
        }

        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
            var course = recipes.Find(x => x.codeUser == id);
            if (course != null)
            {
                recipes.Remove(course);
                return true;
            }
            return false;
        }
    }

}

