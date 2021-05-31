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

            var postimet = new List<Postimi>
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
        
        public static async Task SeedDataProf(DataContext context)
        {
            if (context.Prinderit.Any()) return;

            var profesoret = new List<Prindi>
            {
                new Prindi
                {
                    Emri= "Prindi1",
                    Mbiemri="Test1",
                    Email = "Prindi1@test.com",
                    Fjalkalimi="1234",
                    nrTel=123456
                },
                  new Prindi
                {
                    Emri= "Prindi2",
                    Mbiemri="Test2",
                    Email = "Prindi2@test.com",
                    Fjalkalimi="1234",
                    nrTel=123456
                },
                  new Prindi
                {
                    Emri= "Prindi3",
                    Mbiemri="Test3",
                    Email = "Prindi3@test.com",
                    Fjalkalimi="1234",
                    nrTel=123456
                }
            };

            await context.Prinderit.AddRangeAsync(profesoret);
            await context.SaveChangesAsync();
        }

    }
} 