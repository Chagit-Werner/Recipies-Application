using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RecipesApi.Entities
{
    
    public class User
    {
        
        public int id { get; set; }
        public string? name { get; set; }
        public string? Address { get; set; }

        public string? Email { get; set; }
        public string? password { get; set; }
        public static int index=0;

        public User(int id, string? name, string? address, string? email, string? password)
        {
            this.id = id;
            this.name = name;
            Address = address;
            Email = email;
            this.password = password;
        }

        public override bool Equals(object? obj)
        {
            return obj is User user &&
                   id == user.id &&
                   name == user.name &&
                   Address == user.Address &&
                   Email == user.Email &&
                   password == user.password;
        }
    }
}
