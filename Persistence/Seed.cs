using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence

{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if(context.Postimet.Any()) return;

            var postimet = new List<Postimi>//test
            {
                new Postimi
                {
                    Titulli= "Postimi 1",
                    Data = DateTime.Now.AddMinutes(-1000),
                    Permbajtja = "Ky eshte nje postim testues 1",
                },
                new Postimi
                {
                    Titulli= "Postimi 2",
                    Data = DateTime.Now.AddMinutes(-2000),
                    Permbajtja = "Ky eshte nje postim testues 2",
                },
                new Postimi
                {
                    Titulli= "Postimi 3",
                    Data = DateTime.Now.AddMinutes(-3000),
                    Permbajtja = "Ky eshte nje postim testues 3",
                }
            };
            await context.Postimet.AddRangeAsync(postimet);
            await context.SaveChangesAsync();
        }
        
    }
} 