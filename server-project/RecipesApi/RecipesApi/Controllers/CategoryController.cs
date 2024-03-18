using Microsoft.AspNetCore.Mvc;
using RecipesApi.Entities;

namespace RecipesApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController: ControllerBase
    {
        public static List<Category> categories = new List<Category>()
        {

            new Category(1,"cakes", "path"),
            new Category(2,"cookies", "path"),
            new Category(3,"sweet pies", "path") ,
            new Category(4,"petit fours", "path"),
            new Category(5,"ice creams", "path"),

        };
        [HttpGet]
        public IEnumerable<Category> Get()
        {
            return categories;
        }
    }
}
