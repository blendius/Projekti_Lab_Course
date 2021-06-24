using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence

{
    public class Seed
    {
        public static async Task SeedData(DataContext context,UserManager<AppAdmin> userManager)
        {
            if(!userManager.Users.Any()){
                var users = new List<AppAdmin>{
                    new AppAdmin{DisplayName = "Bob",UserName="bob",Email="bob@test.com"},
                    new AppAdmin{DisplayName = "Jerry",UserName="Jerry",Email="Jerry@test.com"},
                    new AppAdmin{DisplayName = "Test",UserName="Test",Email="Test@test.com"}
                    
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user,"Pa$$w0rd");
                }
            }
            if (context.Postimet.Any() && context.Lendet.Any()) return;
            

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
        //seed data for Professor
        public static async Task SeedDataProf(DataContext context)
        {
            if (context.Profesoret.Any()) return;

            var profesoret = new List<Profesori>
            {
                new Profesori
                {
                    Name= "Prof 1",
                    Email = "prof1@test.com",
                    GradaAkademike="Prof.",
                    Fjalkalimi="123",
                    DataRegjistrimit = DateTime.Now.AddMinutes(-2000),
                    Lenda= "TestLenda",
                    Roli=1
                },
                new Profesori
                {
                    Name= "Prof 2",
                    Email = "prof2@test.com",
                    GradaAkademike="Prof.",
                    Fjalkalimi="123",
                    DataRegjistrimit = DateTime.Now.AddMinutes(-2000),
                    Lenda= "TestLenda2",
                    Roli=1
                }
            };

            await context.Profesoret.AddRangeAsync(profesoret);
            await context.SaveChangesAsync();

            var lendet = new List<Lenda>
            {
                new Lenda
                {
                    EmriLendes= "Postimi 1",
                    DataEShtimit = DateTime.Now.AddMinutes(-1000),
                    Pershkrimi = "Ky eshte nje postim testues 1",
                    Syllabusi = "Ky eshte nje postim testues 1"
                },
                new Lenda
                {
                    EmriLendes= "lenda 2",
                    DataEShtimit = DateTime.Now.AddMinutes(-1000),
                    Pershkrimi = "Ky eshte nje postim testues 1",
                    Syllabusi = "Ky eshte nje postim testues 1"
                },
                new Lenda
                {
                    EmriLendes= "lenda 3",
                    DataEShtimit = DateTime.Now.AddMinutes(-1000),
                    Pershkrimi = "Ky eshte nje postim testues 1",
                    Syllabusi = "Ky eshte nje postim testues 1"
                }
            };
            await context.Lendet.AddRangeAsync(lendet);
            await context.SaveChangesAsync();
            // var Profesoret = new List<Profesori>
            // {
            //     new Profesori
            //     {
            //         Name= "Postimi 1",
            //         Data = DateTime.Now.AddMinutes(-1000),
            //         Email = "Ky eshte nje postim testues 1",
            //         Fjalkalimi = "Ky eshte nje postim testues 1",
            //         GradaAkademike = "Ky eshte nje postim testues 1",
            //     },
            //     new Profesori
            //     {
            //         Titulli= "Postimi 2",
            //         Data = DateTime.Now.AddMinutes(-2000),
            //         Permbajtja = "Ky eshte nje postim testues 2",
            //     },
            //     new Profesori
            //     {
            //         Titulli= "Postimi 3",
            //         Data = DateTime.Now.AddMinutes(-3000),
            //         Permbajtja = "Ky eshte nje postim testues 3",
            //     }
            // };
            // await context.Postimet.AddRangeAsync(postimet);
            // await context.SaveChangesAsync();
        }
        
        public static async Task SeedDataPrind(DataContext context)
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
        //seed for Nxenesi
        public static async Task SeedDataNxenesit(DataContext context)
        {
            if (context.Nxenesit.Any()) return;
            var nxenesit = new List<Nxenesi>
            {
                new Nxenesi
                {
                    FullName = "Mal Haziri",
                    ParentName = "Armend",
                    Email = "malhaziri@student.edu",
                    Password = "Mali123.",
                    DateOfBirth = DateTime.Now.AddMonths(-120),
                    YearOfRegistration = 2020,
                    Class = "X1",
                    PhoneNumber = "044-458-885"
                },
                  new Nxenesi
                {
                    FullName = "Erin Lekiqi",
                    ParentName = "Naim",
                    Email = "erinlekiqi@student.edu",
                    Password = "Erini123.",
                    DateOfBirth = DateTime.Now.AddMonths(-125),
                    YearOfRegistration = 2020,
                    Class = "X1",
                    PhoneNumber = "044-458-885"
                }

            };

            await context.Nxenesit.AddRangeAsync(nxenesit);
            await context.SaveChangesAsync();
            }

        public static async Task SeedDataKlubi(DataContext context)
        {
            if (context.Klubet.Any()) return;

            var klubet = new List<Klubi>
            {
                new Klubi
                {
                    Lloji= "Klubi1",
                    Name="Klubi1",
                    Pershkrimi = "Klubi1@test.com",
                    NrIAnetareve=123,
                    Udheheqesi="Test"
                },
                  new Klubi
                {
                    Lloji= "Klubi2",
                    Name="Klubi2",
                    Pershkrimi = "Klubi1@test.com",
                    NrIAnetareve=123,
                    Udheheqesi="Test"
                },
                  new Klubi
                {
                    Lloji= "Klubi3",
                    Name="Klubi3",
                    Pershkrimi = "Klubi1@test.com",
                    NrIAnetareve=123,
                    Udheheqesi="Test"
                }
            };

            await context.Klubet.AddRangeAsync(klubet);
            await context.SaveChangesAsync();

        }
    }
}
