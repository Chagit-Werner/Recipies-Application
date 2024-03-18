using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RecipesApi.Entities
{
  
    public class Category
    {
       
        public int codeCategory { get; set; }
       
        public string name { get; set; }
        public string Icon { get; set; }

        public Category(int id, string name, string path)
        {
            codeCategory = id;
            this.name = name;
            Icon = path;
        }
    }
}
