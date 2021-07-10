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
        public static Guid lenda1 = new Guid();
        public static Guid lenda2 = new Guid();
        public static Guid lenda3 = new Guid();


        public static async Task SeedData(DataContext context, UserManager<AppAdmin> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppAdmin>{
                    new AppAdmin{DisplayName = "Bob",UserName="bob",Email="bob@test.com"},
                    new AppAdmin{DisplayName = "Jerry",UserName="Jerry",Email="Jerry@test.com"},
                    new AppAdmin{DisplayName = "Test",UserName="Test",Email="Test@test.com"}

                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

            if (context.Postimet.Any()) return;

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
        public static async Task SeedDataProf(DataContext context, UserManager<Profesori> userManager)
        {

            if (!userManager.Users.Any())
            {
                var prinderit = new List<Profesori>
                {
                    new Profesori{Name = "prof", UserName="p1", Email = "prof@test.com",Lenda = new Lenda
                    {
                        LendaId = lenda2,
                        EmriLendes = "Lenda Seed 1",
                        Pershkrimi = "Pershkrimi Seed lenda 1",
                        Syllabusi = new Syllabusi{
                            SyllabusiId = new Guid(),
                            EmriSyllabusit = "Syllabusi 1",
                            LinkuISyllabusit = "www.google.com",
                            DataEKrijimit = DateTime.Now
                        }

                    }},
                    new Profesori{Name = "prof2", UserName="p2", Email = "prof2@test.com",Lenda = new Lenda
                    {
                        LendaId = lenda1,
                        EmriLendes = "Lenda Seed 2",
                        Pershkrimi = "Pershkrimi Seed lenda 2",
                        Syllabusi = new Syllabusi{
                            SyllabusiId = new Guid(),
                            EmriSyllabusit = "Syllabusi 2",
                            LinkuISyllabusit = "www.google.com",
                            DataEKrijimit = DateTime.Now
                        }

                    }},
                    new Profesori{Name = "prof3", UserName="p3", Email = "prind3@test.com",Lenda = new Lenda
                    {
                        LendaId = lenda1,
                        EmriLendes = "Lenda Seed 3",
                        Pershkrimi = "Pershkrimi Seed lenda 3",
                        Syllabusi = new Syllabusi{
                            SyllabusiId = new Guid(),
                            EmriSyllabusit = "Syllabusi 3",
                            LinkuISyllabusit = "www.google.com",
                            DataEKrijimit = DateTime.Now
                        }

                    }}
                };

                foreach (var prindi in prinderit)
                {
                    await userManager.CreateAsync(prindi, "Pa$$w0rd");
                }
            }

        }

        public static async Task SeedDataPrind(DataContext context, UserManager<Prindi> userManager)
        {
            if (!userManager.Users.Any())
            {
                var prinderit = new List<Prindi>
                {
                    new Prindi{DisplayName = "prind1", UserName="p1", Email = "prind1@gmail.com"},
                    new Prindi{DisplayName = "prind2", UserName="p2", Email = "prind2@gmail.com"},
                    new Prindi{DisplayName = "prind3", UserName="p3", Email = "prind3@gmail.com"}
                };

                foreach (var prindi in prinderit)
                {
                    await userManager.CreateAsync(prindi, "Pa$$w0rd");
                }
            }
        }
        //seed for Nxenesi
        public static async Task SeedDataNxenesit(DataContext context, UserManager<Nxenesi> userManager)
        {
            if (!userManager.Users.Any())
            {
                var nxenesit = new List<Nxenesi>
                {
                    new Nxenesi{DisplayName = "Erin Lekiqi", FullName = "Erin Lekiqi", ParentName = "Naim", DateOfBirth = new DateTime(2003, 12, 31), Class = "X/1", PhoneNumber = "044-555-660", YearOfRegistration = 2018, UserName= "erinlekiqi", Email= "erinlekiqi@student.edu"},
                    new Nxenesi{DisplayName = "Mal Haziri", FullName = "Mal Haziri", ParentName = "Armend", DateOfBirth = new DateTime(2002, 10, 28), Class = "XI/2", PhoneNumber = "044-550-660", YearOfRegistration = 2019, UserName= "malhaziri", Email= "malhaziri@student.edu"},
                    new Nxenesi{DisplayName = "Erona Lekiqi", FullName = "Erona Lekiqi", ParentName = "Naim", DateOfBirth = new DateTime(2004, 10, 10), Class = "XII/1", PhoneNumber = "044-021-660", YearOfRegistration = 2018, UserName= "eronalekiqi", Email= "eronalekiqi@student.edu"}

                };

                foreach (var nxenesi in nxenesit)
                {
                    await userManager.CreateAsync(nxenesi, "Pa$$w0rd");
                }
            }

        }
        //    
        // public static async Task SeedDataPrinderitNxenesit(DataContext context)
        // {
        //     if (context.Nxenesit.Any()) return;
        //     var nxenesit = new List<Nxenesi>
        //     {
        //         new PrindiNxenesi
        //         {
        //             PrindiId = "7cb47c32-acde-4f26-b684-e85c1e33b199",
        //             NxenesiId = "66F2C262-1B35-414D-9E9F-E807D0F3A520"
        //         }

        //     };

        //     await context.Nxenesit.AddRangeAsync(nxenesit);
        //     await context.SaveChangesAsync();
        // }
        // public static async Task SeedDataKlasa(DataContext context)
        // {
        //     if (context.Klasat.Any()) return;
        //     var klasat = new List<Klasa>
        //     {
        //         new Klasa
        //         {
        //             Viti = 10,
        //             ParaleljaId = 1,
        //             EmriSalles = "A01"
        //         },
        //         new Klasa
        //         {
        //             Viti = 10,
        //             ParaleljaId = 2,
        //             EmriSalles = "A02"
        //         },
        //         new Klasa
        //         {
        //             Viti = 10,
        //             ParaleljaId = 3,
        //             EmriSalles = "A03"
        //         },
        //         new Klasa
        //         {
        //             Viti = 11,
        //             ParaleljaId = 1,
        //             EmriSalles = "A11"
        //         },
        //         new Klasa
        //         {
        //             Viti = 11,
        //             ParaleljaId = 2,
        //             EmriSalles = "A12"
        //         },
        //         new Klasa
        //         {
        //             Viti = 12,
        //             ParaleljaId = 1,
        //             EmriSalles = "A13"
        //         },
        //     };

        //     await context.Klasat.AddRangeAsync(klasat);
        //     await context.SaveChangesAsync();
        // }
    }

}

